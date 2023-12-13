const authorizeAndFetchData = require('./authorization')

async function processMyData(city, chatId, bot) {
	try {
		const myData = await authorizeAndFetchData()
		console.log(myData.length, "\n\n")

		for (let i = 0; i < myData.length; i++) {
			if (myData[i].oblast === city) {
				// console.log(myData[i].oblast)
				const messageText = `
		  <b>Завантаження на: \t\t\t${myData[i].date}</b>
		  \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<b>${myData[i].cityGo} ➙ ${myData[i].cityUp}</b>
		  <b>Транспорт:</b> \t\t\t${myData[i].transport}
		  <b>Вага:</b> \t\t\t${myData[i].weight}
		  <b>Завантаження:</b> \t\t\t${myData[i].download}
		  <b>Вантаж:</b> \t\t\t${myData[i].cargo}
		  <b>Оплата:</b> \t\t\t7-10 днів по оригіналах, ПДВ, або 3-тя група
		  <b>Контакт:</b> \t\t\t<b>${myData[i].person}</b>
		  <b>Телефон</b> \t\t\t${myData[i].person}`
				await bot.sendMessage(chatId, messageText, { parse_mode: 'HTML' })
			}
		}
	} catch (error) {
		bot.sendMessage(
			chatId,
			`Виникла помилка при отриманні даних: ${error.message}`
		)
	}
}

module.exports = processMyData
