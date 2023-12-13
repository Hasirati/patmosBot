const puppeteer = require('puppeteer')
const config = require('./config')

async function authorizeAndFetchData() {
	try {
		const browser = await puppeteer.launch({
			headless: false,
			args: ['--start-maximized'],
		})
		const page = await browser.newPage()

		await page.goto('https://lardi-trans.com/log/mygruztrans/gruz/published/')
		await page.waitForNavigation()
		await page.type(
			'input[class="passport-input__input"]',
			config.authorization.username
		)
		await page.type('input[type="password"]', config.authorization.password)
		await page.click('button[type="submit"]')

		await page.waitForNavigation()
		await page.waitForSelector('.proposal-table--column--contact')

		let data = []
		let hasNextPage = true

		while (hasNextPage) {
			const newData = await page.$$eval('.proposal-table--row', elements => {
				return elements.map(el => {
					const dateElement = el.querySelector(
						'.proposal-table--column--date span'
					)
					const transportElement = el.querySelector(
						'.proposal-table--column--vehicle b'
					)
					const weightElement = el.querySelector(
						'.proposal-table--column--details b'
					)
					const downloadElement = el.querySelector(
						'.search-table--column--vehicle__loading'
					)
					const cargoElement = el.querySelector(
						'.proposal-table--column--details span'
					)
					const personElement = el.querySelector(
						'.proposal-table--column--contact'
					)
					const cityGoElement = el.querySelector(
						'.proposal-table--column--waypoints__list'
					)
					const oblastElement = el.querySelector(
						'.proposal-table--column--waypoints__list div'
					)
					const cityUpElement = el.querySelector(
						'.proposal-table--column--waypoints--both__row:nth-child(2)'
					)

					const getTextContent = element =>
						element ? element.textContent.trim() : ''
					const oblastTextElement =
						getTextContent(oblastElement).match(/\(([^)]+)\)/)
					const oblastText = oblastTextElement ? oblastTextElement[1] : ''

					return {
						date: getTextContent(dateElement),
						transport: getTextContent(transportElement),
						weight: getTextContent(weightElement),
						download: getTextContent(downloadElement),
						cargo: getTextContent(cargoElement),
						person: getTextContent(personElement),
						cityGo: getTextContent(cityGoElement),
						oblast: oblastText,
						cityUp: getTextContent(cityUpElement),
					}
				})
			})
			data = data.concat(newData)

			const nextPageButton = await page.$('.lrd-db--pagination__forward a')
			hasNextPage =
				nextPageButton && !(await nextPageButton.isIntersectingViewport())

			if (hasNextPage) {
				await nextPageButton.click()
				await page.waitForTimeout(2000) // Додайте затримку, щоб сторінка успішно завантажилася
			}
		}

		await browser.close()

		return data.flat()
	} catch (error) {
		console.error('Помилка при отриманні даних:', error)
		throw new Error(error.message)
	}
}

module.exports = authorizeAndFetchData
