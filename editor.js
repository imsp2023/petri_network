const editor = () => {
	return {
		oncreate(vnode) {
			vnode.dom.append(aya.svg);
		},
		view: () => {
			return m("#viewport",{
				onclick(){}
			}, [
				Component.config.node && m(config, { config: Component.config})
			])
		}
	}
}

