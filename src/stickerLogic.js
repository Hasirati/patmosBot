const kb = require('./keyboard-button')
const keyboard = require('./keyboard')

async function handleStickers(msg, bot, chatId) {
	let isCommand = false
	const randomNumber = Math.floor(Math.random() * 6)

	for (let key in kb) {
		let currentObj = kb[key]
		for (let subKey in currentObj) {
			if (currentObj[subKey] === msg.text) {
				isCommand = true
				break
			}
		}
		if (isCommand) break
	}

	if (['/start'].includes(msg.text.toLowerCase())) {
		bot.onText(/\/start/, async msg => {
			const text = `Вітаю, ${msg.from.first_name}, оберіть один із пунктів`

			await bot.sendSticker(
				chatId,
				'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/MemeS1ick3r/429759.160.gif'
			)

			await bot.sendMessage(chatId, text, {
				reply_markup: {
					keyboard: keyboard.home,
				},
			})
		})
	} else if (['блять', 'сука', 'бля'].includes(msg.text.toLowerCase())) {
		await bot.sendSticker(
			chatId,
			'https://media.stickers.wiki/memes1ick3r/429782.160.gif'
		)
	} else if (!isCommand) {
		switch (randomNumber) {
			case 0:
				await bot.sendSticker(
					chatId,
					'https://media.stickers.wiki/spiderverse/376357.160.webp'
				)
				break
			case 1:
				await bot.sendSticker(
					chatId,
					'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/SpiderVerse/376358.160.webp'
				)
				break
			case 2:
				await bot.sendSticker(
					chatId,
					'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/SpiderVerse/376339.160.webp'
				)
				break
			case 3:
				await bot.sendSticker(
					chatId,
					'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/SpiderVerse/376355.160.webp'
				)
				break
			case 4:
				await bot.sendSticker(
					chatId,
					'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/SpiderVerse/376345.160.webp'
				)
				break
			case 5:
				await bot.sendSticker(
					chatId,
					'https://stickerswiki.ams3.cdn.digitaloceanspaces.com/SpiderVerse/376348.160.webp'
				)
				break
		}
	}
}

module.exports = handleStickers
