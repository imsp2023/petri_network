try {
    var aya = new aya.Init(2000, 2000);
    aya.config.link.end_start = ' ';
    console.log(aya.config);
    //Component.initSvgEvents(aya.svg);
    aya.svg.addEventListener("mousemove", (e)=>{
	if(Event.state == 'linking'){
	    Event.line.dest_x = e.clientX;
	    Event.line.dest_y = e.clientY;
	    Event.line.redraw();
	}else if(Event.state == 'selection'){
	    Event.src.resize(e.clientX-Event.x, e.clientY-Event.y);
	    Event.x = e.clientX;
	    Event.y = e.clientY;
	}else if(Event.state == 'moving_lasso'){
	    Event.src.move(e.clientX-Event.x, e.clientY-Event.y);
	    Event.x = e.clientX;
	    Event.y = e.clientY;
	}
    });

    aya.svg.addEventListener("mouseup", (e)=>{
	console.log('mouseUP SVG state='+Event.state);
	if(Event.state == 'linking'){
	    Event.line.removeFromDOM();
	    Event.line = null;
	    Event.src = null;
	    Event.state = null;
	}else if(Event.state == 'selection'){
	    Event.src.lockComponent();
	    Event.src = null;
	    Event.state = null;
	}
    });

    aya.svg.addEventListener("mousedown", (e)=>{
	console.log('mouseDOWN SVG state='+Event.state);
	if(Event.state != null)
	    return;

	Event.state = 'selection';

	Event.x = e.clientX;
	Event.y = e.clientY;
	console.log('x='+ Event.x+' y='+Event.y);
	Event.src = ComponentFactory.getComponent('lasso', {x: Event.x, y: Event.y});
    });
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

    
    var cps = [];
    var p = ComponentFactory.getComponent("place", { type: 'start', x: 100, y: 350 });
    // var l = new Lasso({x: 0, y: 0, width: 150, height: 150});
    var t = ComponentFactory.getComponent('transition', {type: 'dummy', x: 100, y: 250});

    //cps.push(p.comp.shape.shape);
    // cps.push(p);
    // l.addSelectedComp(cps);
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
	    m(editor, {config: Event.config})
	])
})
