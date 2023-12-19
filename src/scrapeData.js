const authorization = require('./authorization')

async function fetchData(city) {
	try {
		const browser = await authorization.launchBrowser()
		const page = await browser.newPage()

		await authorization.authorize(page)

		let data = []
		let hasNextPage = true

		while (hasNextPage) {
			const newData = await page.$$eval(
				'.proposal-table--row',
				async elements => {
					const newDataArray = []

					for (const el of elements) {
						const color = el.querySelector(
							'.proposal-table--column--checkbox__cell'
						).style.backgroundColor

						if (color === 'rgb(197, 227, 243)') {
							continue
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

						await el.click()
						const number = el.querySelector('.lrd-db--phone__link')
						await el.click('.lrd-db--header__title_back')

						const getTextContent = element =>
							element ? element.textContent.trim() : ''
						const oblastTextElement =
							getTextContent(oblastElement).match(/\(([^)]+)\)/)
						const oblastText = oblastTextElement ? oblastTextElement[1] : ''
						const priceText = priceElement
							? priceElement.textContent.trim()
							: '7-10 днів по оригіналах, ПДВ, або 3-тя група'

						newDataArray.push({
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
							number: number,
						})
					}

					return newDataArray
				},
				page
			)

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

		await authorization.closeBrowser(browser)

		return data.flat()
	} catch (error) {
		console.error('Помилка при отриманні даних:', error)
		throw new Error(error.message)
	}
}

module.exports = fetchData
