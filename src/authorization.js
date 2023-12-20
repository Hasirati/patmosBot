const puppeteer = require('puppeteer')
const config = require('./config')

async function launchBrowser() {
	return await puppeteer.launch({
		headless: false,
		args: ['--start-maximized'],
	})
}

async function authorize(page) {
	await page.goto('https://lardi-trans.com/log/mygruztrans/gruz/published/')
	await page.waitForNavigation()
	await page.type(
		'input[class="passport-input__input"]',
		config.authorization.username
	)
	await page.type('input[type="password"]', config.authorization.password)
	await page.click('button[type="submit"]')
	await page.waitForTimeout(2000)
	//const htmlContent = await page.content()

	const modalEl = await page.$('.lrd-db--modal__title')

	if (modalEl) {
		const modal = await modalEl.evaluate(el => el.textContent.trim())
		console.log(modal)
		await page.click('.lrd-ui-button_grey')
		await page.waitForNavigation()
		await page.waitForSelector('.proposal-table--column--contact')
	} else {
		console.log('Елемент не знайдено')
		await page.waitForNavigation()
		await page.waitForSelector('.proposal-table--column--contact')
	}
}

async function closeBrowser(browser) {
	await browser.close()
}

module.exports = {
	launchBrowser,
	authorize,
	closeBrowser,
}
