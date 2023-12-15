const TelegramApi = require('node-telegram-bot-api')
const config = require('./config')
const kb = require('./keyboard-button')
const keyboard = require('./keyboard')
const handleStickers = require('./stickerLogic')
const processMyData = require('./dataProcessor')
const bot = new TelegramApi(config.token, { polling: true })

bot.on('message', async msg => {
	const chatId = msg.chat.id

	handleStickers(msg, bot, chatId)

	switch (msg.text) {
		case kb.home.onUkraine:
			await bot.sendMessage(chatId, 'Виберіть місто', {
				reply_markup: { keyboard: keyboard.ukraine },
			})
			break
		case kb.home.abroad:
			await bot.sendMessage(chatId, 'Виберіть місто', {
				reply_markup: { keyboard: keyboard.abroad },
			})
			break
		case kb.back.backs:
			await bot.sendMessage(chatId, 'Отооож', {
				reply_markup: { keyboard: keyboard.home },
			})
			await bot.sendSticker(
				chatId,
				'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/MemeS1ick3r/429756.160.gif'
			)
			break
		case kb.info.info:
			await bot.sendMessage(
				chatId,
				'<b>ПП "ПАТМОС"- транспортно-експедиційна компанія\n\nТут будуть розміщуватись актуальні вантажі нашої компанії\n\nКерівник транспортно-експедиційного відділу</b>\nЗятик Марія: +380673609336\n\n<b>Відділ власного транспорту</b>\nВалерія: +380672557176\n\n<b>Бухгалтерія</b>\n<i>На перевірку документи відправляти:</i> patmos.ua@gmail.com\n<i>Для уточнення: +380673608993</i>\n\n<b>Оригінали документів відправляти за адресою:\n\nПОШТА:</b> 46003, м. Тернопіль, вул., Котляревського, 69 прим. 154\n<b>НОВА ПОШТА:</b>  м. Тернопіль, відділення №11 вул., Полковника Данила Нечая, 25а, +380673608993 ПП «ПАТМОС», ЄДРПОУ 40756025\n\nПрацюємо з перевізниками які є платники ПДВ або ФОП 3-ї групи.\nОплата за надані послуги відбувається по оригіналах документів 7-10 днів.', { parse_mode: 'HTML' }
			)
			break
	}
})

bot.on('message', async msg => {
	const chatId = msg.chat.id
	switch (msg.text) {
		case kb.ukraine.kuiv:
			processMyData('Київська обл.', chatId, bot)
			break
		case kb.ukraine.lviv:
			processMyData('Львівська обл.', chatId, bot)
			break
		case kb.ukraine.dnipro:
			processMyData('Дніпропетровська обл.', chatId, bot)
			break
		case kb.ukraine.ternopil:
			processMyData('Тернопільська обл.', chatId, bot)
			break
		case kb.ukraine.frankivsk:
			processMyData('Івано-Франківська обл.', chatId, bot)
			break
		case kb.ukraine.lytsk:
			processMyData('Волинська обл.', chatId, bot)
			break
		case kb.ukraine.rivne:
			processMyData('Рівненська обл.', chatId, bot)
			break
		case kb.ukraine.symu:
			processMyData('Сумська обл.', chatId, bot)
			break
		case kb.ukraine.vinnutsa:
			processMyData('Вінницька обл.', chatId, bot)
			break
		case kb.ukraine.khmelnytsk:
			processMyData('Хмельницька обл.', chatId, bot)
			break
		case kb.ukraine.poltava:
			processMyData('Полтавська обл.', chatId, bot)
			break
		case kb.ukraine.kharkiv:
			processMyData('Харківська обл.', chatId, bot)
			break
		case kb.ukraine.odesa:
			processMyData('Одеська обл.', chatId, bot)
			break
		case kb.ukraine.zakarpatya:
			processMyData('Закарпатська обл.', chatId, bot)
			break
		case kb.ukraine.zytomyr:
			processMyData('Житомирська обл.', chatId, bot)
			break
		case kb.ukraine.chernivci:
			processMyData('Чернівецька обл.', chatId, bot)
			break
		case kb.ukraine.cherkasy:
			processMyData('Черкаська обл.', chatId, bot)
			break
		case kb.ukraine.chernigiv:
			processMyData('Чернігівська обл.', chatId, bot)
			break
		case kb.ukraine.mykolaiv:
			processMyData('Миколаївська обл.', chatId, bot)
			break
		case kb.ukraine.zapirizia:
			processMyData('Запорізька обл.', chatId, bot)
			break
		case kb.abroad.poland:
		case kb.abroad.germany:
		case kb.abroad.italia:
		case kb.abroad.rymynia:
		case kb.abroad.lutva:
			processMyData(msg.text, chatId, bot)
			break
	}
})
