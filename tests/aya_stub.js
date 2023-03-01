class Aya{
    constructor(){
	this.ttype = null;
    }

    settype(type){
	 this.ttype = type;
    }

    _uuid(){
	return  Math.random().toString(36).substring(2, 15) +
	    Math.random().toString(36).substring(2, 15);
    }

    Component(type, props){
	var uuid =  Math.random().toString(36).substring(2, 15) +
	    Math.random().toString(36).substring(2, 15); 
	var Obj = {
	    uuid : uuid,
	    events: [],
	    type : this.ttype ? this.ttype : type,
	    form : {
		dest_x: props ? props.dest_x : null,
		dest_y: props ? props.dest_y : null,
		vertex: [
		    this.Point(uuid, 0, 0, 5),
		    this.Point(uuid, 0, 0, 5),
		    this.Point(uuid, 0, 0, 5),
		    this.Point(uuid, 0, 0, 5)
		],
		c_points: [
		    this.Point(uuid, 0, 0, 5),
		    this.Point(uuid, 0, 0, 5),
		    this.Point(uuid, 0, 0, 5),
		    this.Point(uuid, 0, 0, 5)
		],
		draw(){
		    Obj.form.c_points.map((pt) => {
			pt.draw();
		    });
		    Obj.form.vertex.map((vt) => {
			vt.draw();
		    });
		},
		redraw: ()=>{
		},
		svg: {
		    setAttribute: (tag, value) =>{
			Obj.form[tag] = value;
		    },
		    addEventListener: ()=>{},
		    removeEventListener: () => {}
		},
		children: [
		],
		removeBoxFromDOM(){},
		c_svg: {
		    setAttribute: (tag, value) =>{
			Obj.form[tag] = value;
		    },
		    addEventListener: (e, callback) => {
			var ev = {};
			ev[e] = callback;
			Obj.events.push(ev);
		    },
		},
		x: props ? props.x : null,
		y: props ? props.y : null,
		r: props ? props.r : null,
		width: props ? props.width : null,
		height: props ? props.height : null
	    },
	    setGate(gate){
		Obj['gate'] = gate;
	    },
	    addChild: (child, translate, rotate, drawing) => {
		if (translate){
		    child.offsetX = translate.x;
		    child.offsetY = translate.y;
		}
		if (rotate){
		    child.centerX = rotate.centerX;
		    child.centerY = rotate.centerY;
		    child.angle = rotate.angle;
		}
		Obj.form.children.push({child});
	    }
	}
	return Obj;
    }

    Link(src_point, dest_point, line){
	var Obj = {
	    source: src_point != undefined ? src_point : null,
	    destination: dest_point != undefined ? dest_point : null,
	    line: line != undefined ? line : null,
	    type: 'link',
	    redraw(){
	    }
	}
	return Obj;
    }

    Point(uuid, x, y, r){
	var Obj = {
	    x: x != undefined ? x : null,
	    y: y != undefined ? y : null,
	    r: r != undefined ? r : null,
	    ref: uuid ? uuid : null,
	    c_svg: {
		setAttribute(){
		}
	    },
	    events: {},
	    addEvent(event, callback){
		Obj.events[event] = callback;
	    },
	    deleteEvent(event){
		delete Obj.events[event];
	    },
	    removeFromDOM(){
	    },
	    draw(){
		Obj.addEvent("mousedown", ()=>{});
		Obj.addEvent("mouseover", ()=>{});
		Obj.addEvent("mouseleave", ()=>{});
	    }
	}
	return Obj;
    }

    Line(x, y, dest_x, dest_y){
	var Obj = {
	    x: x != undefined ? x : null,
	    y: y != undefined ? y : null,
	    dest_x: dest_x != undefined ? dest_x : null,
	    dest_y: dest_y != undefined ? dest_y : null,

	    draw(){
	    },

	    redraw(){
	    }
	}

	return Obj;
    }

    Rectangle(x, y, width, height){
	var Obj = {
	    events: [],
		x: x!=undefined ? x : null,
	    y: y!=undefined ? y : null,
	    width: width ? width : null,
	    height: height ? height : null,
	    type: "rectangle",
	    offsetX: "",
	    offsetY: "",
	    children : [
	    ],
	    form: {svg:{}},
	    c_svg: {
		setAttribute: (tag, value) =>{
		    Obj.form[tag] = value;
		},
		addEventListener: (e, callback) => {
		    var ev = {};
		    ev[e] = callback;
		    Obj.events.push(ev);
		},
	    },
	    removeFromDOM(){
		Obj.c_svg = "";
	    },
	    setOffsetX :  (x) => {
		Obj.offsetX = x;
	    },
	    setOffsetY :  (y) => {
		Obj.offsetY = y;
	    },

	    draw(){
	    }
	};

	return Obj;
    }

    Image(x, y, width, height, path){
	var Obj = {
	    x: x != undefined ? x : null,
	    y: y != undefined ? y : null,
	    width: width ? width : null,
	    height: height ? height : null,
	    path: path ? path : null,
	    type: "image",
	    events: [],
	    c_svg: {
		setAttribute: (tag, value) =>{
		    Obj.form[tag] = value;
		},
		addEventListener: (e, callback) => {
		    var ev = {};
		    ev[e] = callback;
		    Obj.events.push(ev);
		},
	    },
	    draw(){}
	};

	return Obj;
    }

    Text(x, y, text, size = 0){
	var Obj = {
	    type: 'text',
	    size: size ? size : null,
	    x: x != undefined ? x : null,
	    y: y != undefined ? y : null,
	    text: text ? text : null,
	    draw(){},
	    redraw(){}
	};

	return Obj;
    }

    Polyline(x, y, text, size){
	var Obj = {
	    type: 'polyline',
	      removeFromDOM(){
		Obj.c_svg = "";
	    }
	};
	return Obj;
    }

    Link(src_point, dest_point, line){
	var Obj = {
	    source: src_point != undefined ? src_point : null,
	    destination: dest_point != undefined ? dest_point : null,
	    line: line != undefined ? line : null,
	    type:"link",
	    redraw(){
	    }
	};
	return Obj;
    }
}
