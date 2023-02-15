class Aya{
    constructor(){
	this.ttype = null;
    }

    settype(type){
	 this.ttype = type;
    }

    Component(type, props){
	var Obj = {
	    events: [],
	    type : this.ttype ? this.ttype : type,
	    form : {
		vertex: [],
		c_points: [],
		children: [
		],
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
		removeBoxFromDOM(){
		},
		x: props ? props.x : null,
		y: props ? props.y : null,
		r: props ? props.r : null
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
		Obj.form.children.push({child, translate, rotate});
	    }
	}
	return Obj;
    }

    Rectangle(x, y, width, height){
	var Obj = {
	    events: [],
	    x: x ? x : null,
	    y: y ? y : null,
	    width: width ? width : null,
	    height: height ? height : null,
	    type: "rectangle",
	    offsetX: "",
	    offsetY: "",
	    children : [
	    ],
	    c_points: [],
	    vertex: [],
	    form: {},
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

    Polyline(points = []){
	var Obj = {
	    events: [],
	    points: points ? points : null,
	    type: "polyline",
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
	};
	return Obj;
    }

    Image(x, y, width, height, path){
	var Obj = {
	    events: [],
	    x: x != undefined ? x : null,
	    y: y != undefined ? y : null,
	    width: width ? width : null,
	    height: height ? height : null,
	    path: path ? path : null,
	    type: "image",
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
}
