const actions = {
	view: () => {
		return m(".border.border-2.w-full.flex.gap-2",[
			m("button.btn","New"),
			m("button.btn","Load"),
			m("button.btn","Save"),
			m("button.btn","?"),
		])
	}
} 
