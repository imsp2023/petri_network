const editor = () => {
    return {
	oncreate(vnode) {
	    vnode.dom.append(aya.svg);
	},
	view: (vnode) => {
	    return m("#viewport",{
		onclick(){}
	    }, [
		vnode.attrs.config.node && m(config, { config: vnode.attrs.config})
	    ])
	}
    }
}

