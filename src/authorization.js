const puppeteer = require('puppeteer')
const config = require('./config')

async function authorizeAndFetchData(city) {
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

		// const cityInput = await page.$('.lrd-ui-select__input input');
		// await cityInput.type(city, { delay: 100 });
		// await page.click('.lrd-ui-select__menu div');
		// await page.keyboard.down('Enter');
		// await page.keyboard.up('Enter');

		// await page.waitForTimeout(2000)
		// await page.click('.lrd-db__button_yellow');

		let data = []
		let hasNextPage = true

		while (hasNextPage) {
			const newData = await page.$$eval('.proposal-table--row', elements => {
				return elements
					.map(el => {
						const color = el.querySelector(
							'.proposal-table--column--checkbox__cell'
						).style.backgroundColor

						if (color === 'rgb(197, 227, 243)') {
							return null
						}

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
							'.proposal-table--column--waypoints__list b'
						)
						const oblastElement = el.querySelector(
							'.proposal-table--column--waypoints__list div'
						)
						const cityUpElement = el.querySelector(
							'.proposal-table--column--waypoints--both__row:nth-child(2)'
						)
						const priceElement = el.querySelector(
							'.proposal-table--column--payment__payment'
						)

						const getTextContent = element =>
							element ? element.textContent.trim() : ''
						const oblastTextElement =
							getTextContent(oblastElement).match(/\(([^)]+)\)/)
						const oblastText = oblastTextElement ? oblastTextElement[1] : ''
						const priceText = priceElement
							? priceElement.textContent.trim()
							: '7-10 днів по оригіналах, ПДВ, або 3-тя група'

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
							price: priceText,
						}
					})
					.filter(item => item !== null)
			})
			data = data.concat(newData)

			const nextPageButton = await page.$('.lrd-db--pagination__forward a')
			hasNextPage =
				nextPageButton && !(await nextPageButton.isIntersectingViewport())

			if (hasNextPage) {
				await nextPageButton.click()
				await page.waitForTimeout(2000)
			}
		}

		await page.click('.lrd-ui-side-menu--user')
		await page.click('.lrd-ui-side-menu--user--context__item a')

		await browser.close()

		return data.flat()
	} catch (error) {
		console.error('Помилка при отриманні даних:', error)
		throw new Error(error.message)
	}
}

module.exports = authorizeAndFetchData
