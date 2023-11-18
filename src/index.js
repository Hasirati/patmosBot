const TelegramApi = require('node-telegram-bot-api')
const config = require('./config')
const kb = require('./keyboard-button')
const keyboard = require('./keyboard')
const handleStickers = require('./stickerLogic')
const authorizeAndFetchData = require('./authorization')
const bot = new TelegramApi(config.token, { polling: true })

bot.on('message', async msg => {
	const chatId = msg.chat.id

	handleStickers(msg, bot, chatId);

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
	}
})

// bot.onText(/\/myData/, async (msg) => {
//     try {
//         const myData = await authorizeAndFetchData();
//         bot.sendMessage(msg.chat.id, `Отримані дані: ${myData}`);
//     } catch (error) {
//         bot.sendMessage(msg.chat.id, `Виникла помилка при отриманні даних: ${error.message}`);
//     }
// })