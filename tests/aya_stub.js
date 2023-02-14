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
		redraw: ()=>{
		},
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
		Obj.form.children.push({child, translate, rotate});
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
	    draw(){}
	};

	return Obj;
    }

    Text(x, y, text, size){
	var Obj = {
	    type: 'text',
	    x: x!=undefined ? x : null,
	    y: y!=undefined ? y : null,
	    text: text ? text : null,
	    draw(){}
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
}
