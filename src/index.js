const TelegramApi = require('node-telegram-bot-api')
const config = require('../config')
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
			await bot.sendMessage(chatId, 'Виберіть область', {
				reply_markup: { keyboard: keyboard.ukraine },
			})
			break
		case kb.home.abroad:
			await bot.sendMessage(chatId, 'Виберіть область', {
				reply_markup: { keyboard: keyboard.abroad },
			})
			break
		case kb.back.backs:
			await bot.sendMessage(chatId, 'Оберіть один із пунктів', {
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
				'<b>ПП "ПАТМОС"- транспортно-експедиційна компанія\n\nТут будуть розміщуватись актуальні вантажі нашої компанії\n\nКерівник транспортно-експедиційного відділу</b>\nЗятик Марія: +380673609336\n\n<b>Відділ власного транспорту</b>\nВалерія: +380672557176\n\n<b>Бухгалтерія</b>\n<i>На перевірку документи відправляти:</i> patmos.ua@gmail.com\n<i>Для уточнення: +380673608993</i>\n\n<b>Оригінали документів відправляти за адресою:\n\nПОШТА:</b> 46003, м. Тернопіль, вул., Котляревського, 69 прим. 154\n<b>НОВА ПОШТА:</b>  м. Тернопіль, відділення №11 вул., Полковника Данила Нечая, 25а, +380673608993 ПП «ПАТМОС», ЄДРПОУ 40756025\n\nПрацюємо з перевізниками які є платники ПДВ або ФОП 3-ї групи.\nОплата за надані послуги відбувається по оригіналах документів 7-10 днів.',
				{ parse_mode: 'HTML' }
			)
			break
	}
})

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

bot.on('message', async msg => {
	const chatId = msg.chat.id
	switch (msg.text) {
		case kb.ukraine.kuiv:
		case kb.ukraine.lviv:
		case kb.ukraine.dnipro:
		case kb.ukraine.ternopil:
		case kb.ukraine.frankivsk:
		case kb.ukraine.lytsk:
		case kb.ukraine.rivne:
		case kb.ukraine.symu:
		case kb.ukraine.vinnutsa:
		case kb.ukraine.khmelnytsk:
		case kb.ukraine.poltava:
		case kb.ukraine.kharkiv:
		case kb.ukraine.odesa:
		case kb.ukraine.zakarpatya:
		case kb.ukraine.zytomyr:
		case kb.ukraine.chernivci:
		case kb.ukraine.cherkasy:
		case kb.ukraine.chernigiv:
		case kb.ukraine.mykolaiv:
		case kb.ukraine.zapirizia:
			processMyData(msg.text, chatId, bot)
			await delay(1000)
			await bot.sendMessage(chatId, 'Зачекайте хвилинку...')
			await delay(10000)
			await bot.sendSticker(
				chatId,
				'https://media.stickerswiki.app/rayms/7267.512.webp'
			)
			await delay(10000)
			await bot.sendMessage(chatId, 'Підбираємо актуальні вантажі')
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
