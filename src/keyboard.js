const kb = require('./keyboard-button')

module.exports = {
	home: [[kb.home.onUkraine, kb.home.abroad], [kb.info.info]],
	ukraine: [
		[kb.ukraine.lviv, kb.ukraine.ternopil],
		[kb.ukraine.zakarpatya, kb.ukraine.frankivsk, kb.ukraine.chernivci],
		[kb.ukraine.lytsk, kb.ukraine.rivne],
		[kb.ukraine.vinnutsa, kb.ukraine.zytomyr, kb.ukraine.khmelnytsk],
		[kb.ukraine.kuiv, kb.ukraine.chernigiv],
		[kb.ukraine.cherkasy, kb.ukraine.poltava, kb.ukraine.symu],
		[kb.ukraine.kharkiv, kb.ukraine.kirovograd],
		[kb.ukraine.dnipro, kb.ukraine.zapirizia],
		[kb.ukraine.odesa, kb.ukraine.kherson],
		[kb.back.backs],
	],
	abroad: [
		[kb.abroad.poland, kb.abroad.germany],
		[kb.abroad.italia, kb.abroad.rymynia],
		[kb.abroad.lutva],
		[kb.back.backs],
	],
}
