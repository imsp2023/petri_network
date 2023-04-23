try {
	var aya = new aya.Init(2000, 2000);
	aya.config.link.end_start = ' ';
	Component.initSvgEvents(aya.svg);
	layout.init(40, 80, 2000, 2000);
}
catch (e) {
	console.error(e);
}

function new_diag() {
	Register.forEach(comp => {
		if (comp.type != "edge")
			comp.addConnector('deletion');
	});

	Register.clear();
	var p = new Component("place", { type: 'start', x: 100, y: 350 });
}
function load_diag() {
	console.log("Call load_diag");
}
function save_as_svg() {
	const svg = document.getElementById("viewport").children[0];
	saveFile(svg.outerHTML,"diagram.svg","image/svg+xml")
}
function save_diag() {
	var data = { edges: [], places: [], transitions: [] };
	Register.forEach(comp => {
		data[comp.type + 's'].push(comp.save())
	}, data);
	saveFile(JSON.stringify(data), "diagram.aya", 'text/plain')
}

function saveFile(data, name, type) {
	let blob = new Blob([data], { type });
	if (typeof navigator.msSaveBlob == "function")
		return navigator.msSaveBlob(blob, file_name);

	var saver = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
	var blobURL = saver.href = URL.createObjectURL(blob),
		body = document.body;

	saver.download = name;

	body.appendChild(saver);
	saver.dispatchEvent(new MouseEvent("click"));
	body.removeChild(saver);
	URL.revokeObjectURL(blobURL);
}
m.mount(document.body, {
	oninit(vnode) {
		new_diag()
	},
	view: () => m("", [
		m(".border.flex.fixed.top-5.left-5.flex-col.rounded-lg.border-gray-400.bg-gray-100", [
			m("button.btn.p-2.border-b.border-gray-400.hover:bg-gray-200.active:bg-gray-400", { title: "New diagram", onclick: new_diag }, m(Icon.FilePlus)),
			m("button.btn.p-2.border-b.border-gray-400.hover:bg-gray-200.active:bg-gray-400", { title: "Load diagram", onclick: load_diag }, m(Icon.Folder)),
			m("button.btn.p-2.border-b.border-gray-400.hover:bg-gray-200.active:bg-gray-400", { title: "Save diagram", onclick: save_diag }, m(Icon.Download)),
			m("button.btn.p-2.border-b.border-gray-400.hover:bg-gray-200.active:bg-gray-400", { title: "Save as svg", onclick: save_as_svg }, m(Icon.Image)),
		]),
		m(editor)
	])
})
