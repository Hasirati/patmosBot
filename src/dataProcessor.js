const fetchData = require('./scrapeData')

async function processMyData(city, chatId, bot) {
	try {
		const myData = await fetchData(city)

		// for (let i = 0; i < myData.length; i++) {
		// 	if (myData[i].oblast === city) {
		// 		const messageText = `
		//   <b>Завантаження на: \t\t\t${myData[i].date}</b>
		//   \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<b>${myData[i].cityGo} ➙ ${myData[i].cityUp}</b>
		//   <b>Транспорт:</b> \t\t\t${myData[i].transport}
		//   <b>Вага:</b> \t\t\t${myData[i].weight}
		//   <b>Завантаження:</b> \t\t\t${myData[i].download}
		//   <b>Вантаж:</b> \t\t\t${myData[i].cargo}
		//   <b>Оплата:</b> \t\t\t${myData[i].price}
		//   <b>Контакт:</b> \t\t\t<b>${myData[i].person}</b>
		//   <b>Телефон:</b> \t\t\t${myData[i].person}`
		// 		await bot.sendMessage(chatId, messageText, { parse_mode: 'HTML' })
		// 	}
		// }
		const groupedData = {}
		for (let i = 0; i < myData.length; i++) {
			if (myData[i].oblast === city) {
				const person = myData[i].person

				if (!groupedData[person]) {
					groupedData[person] = []
				}

				groupedData[person].push(myData[i])
			}
		}
		const sortedPersons = Object.keys(groupedData).sort();

		for (const person of sortedPersons) {
			const personData = groupedData[person];
		
			const uniqueRoutes = Array.from(new Set(personData.map(data => `${data.cityGo} ➙ ${data.cityUp}`)));
			const sortedRoutes = uniqueRoutes.sort();
		
			let combinedMessage = `<b>Контакт:</b> ${person}\n<b>Телефон:</b> ${
				personData[0]?.number || ''
			}`;
		
			const messages = sortedRoutes.map(route => {
				return route;
			});
		
			combinedMessage += '\n\n' + messages.join('\n');
			await bot.sendMessage(chatId, combinedMessage, { parse_mode: 'HTML' });
		}
		
	} catch (error) {
		bot.sendMessage(
			chatId,
			`Виникла помилка при отриманні даних: ${error.message}`
		)
	}
}

module.exports = processMyData
