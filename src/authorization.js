// const config = require('./config')
// const puppeteer = require('puppeteer')
// const axios = require('axios');

// async function authorizeAndFetchData() {
// 	try {
// 		const response = await axios.get('https://lardi-trans.com/uk/accounts/login/', {
//             headers: {
//                 Authorization: `Bearer ${config.authToken}`,
//                 'Content-Type': 'application/json',
//             },
//         });

// 		const browser = await puppeteer.launch({ headless: "new" });
//         const page = await browser.newPage();
// 		const cookies = response.headers['set-cookie'];
// 		const puppeteerCookies = cookies.map(cookie => {
// 			const [name, value] = cookie.split(';')[0].split('=');
// 			return {
// 				name: name.trim(),
// 				value: value.trim(),
// 				domain: '.lardi-trans.com',
// 			};
// 		});
		
// 		await page.setCookie(...puppeteerCookies);

// 		await page.goto('https://lardi-trans.com/log/mygruztrans/gruz/published')

// 		const title = await page.$eval('.lrd-db--header__title', el =>
// 			el.textContent.trim()
// 		)

// 		console.log('Заголовок:', title)

// 		await browser.close()

// 		return title
// 	} catch (error) {
// 		console.error('Помилка при отриманні даних:', error)
// 		throw new Error(error.message)
// 	}
// }

// module.exports = authorizeAndFetchData
