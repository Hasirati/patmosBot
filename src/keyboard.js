const kb = require('./keyboard-button')

module.exports = {
	home: [[kb.home.onUkraine], [kb.home.abroad]],
	ukraine: [
		[kb.ukraine.kuiv, kb.ukraine.lviv, kb.ukraine.dnipro],
		[kb.ukraine.ternopil, kb.ukraine.frankivsk],
		[kb.ukraine.lytsk, kb.ukraine.rivne, kb.ukraine.symu],
		[kb.ukraine.vinnutsa, kb.ukraine.khmelnytsk],
		[kb.ukraine.poltava, kb.ukraine.kharkiv, kb.ukraine.odesa],
		[kb.ukraine.zakarpatya, kb.ukraine.zytomyr],
		[kb.ukraine.chernivci, kb.ukraine.cherkasy, kb.ukraine.chernigiv],
		[kb.ukraine.mykolaiv, kb.ukraine.zapirizia],
		[kb.back.backs],
	],
	abroad: [
		[kb.abroad.poland, kb.abroad.germany],
		[kb.abroad.italia, kb.abroad.rymynia],
		[kb.abroad.lutva],
		[kb.back.backs],
	],
}