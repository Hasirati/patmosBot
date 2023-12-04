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

		await browser.close()
		return 'title'
	} catch (error) {
		console.error('Помилка при отриманні даних:', error)
		throw new Error(error.message)
	}
}

module.exports = authorizeAndFetchData
