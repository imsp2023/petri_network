var layoutAjust = 0;
var layoutClosest = 0;
var layoutMark = 0;
var layoutUMark = 0;
var entities = {};
var layoutMarkedCells = 0;
var layoutCellFound=false;

// class Transition {
//     constructor(props={}){
// 	// if(factoryFailed)
// 	//     throw new Error("instantiation failed");
// 	    this.comp = {redraw: ()=>{}, shape: {shape: {x: props.x,cy: props.y}}};
//     }
// }

class Lasso{
    constructor(props={}){
	this.shape = {
	    events: [],
	    redraw: ()=>{},

	    shape: {
		children: [],
		addEvent: (e, callback) => {
			var ev = {};
			ev[e] = 1;
		    this.shape.events.push(ev);
		},
		x: props.x?props.x:0,
		y: props.y?props.y:0
	    }
	};;
    }
}

class Transition{
    constructor(props={}){
	this.shape = {
	    events: [],
	    redraw: ()=>{},

	    shape: {
		addEvent: (e, callback) => {
			var ev = {};
			ev[e] = 1;
		    this.shape.events.push(ev);
		},
		x: props.x?props.x:0,
		y: props.y?props.y:0
	    }
	};;
    }
}

class Edge {
    constructor(){
	// if(factoryFailed)
	//     throw new Error("instantiation failed");
    }
}

class Place {
    constructor(props={}){
	// if(factoryFailed)
	//     throw new Error("instantiation failed");
	this.comp = {redraw: ()=>{}, shape: {shape: {x: props.x,y: props.y}}};
    }
}

const layout = {
    grid: [],
    init : (cw, ch, w, h)=>{
	    var i;
	    layout.cellW = cw; layout.cellH = ch;
	    layout.gridW = w; layout.gridH = h;
	    layout.gridW = w; layout.gridH = h;
        layout.ncols = layout.gridW/layout.cellW;
        layout.nligs = layout.gridH/layout.cellH;

	    for(i=0; i < layout.ncols*layout.nligs; i++)
	        layout.grid.push(false);
    },
    getClosestPosition: (x, y)=>{layoutClosest++; return {x:x+2,y:y+2}},
    mark: (x, y)=>{layoutMark++; console.log('mark');},
    umark: (x, y)=>{layoutUMark++; console.log('umark');},
    fixPoint: (x, y)=>{layoutAjust++; return {x:x, y:y};},
    markEdge: (x1, y1, x2, y2)=>{
	console.log('x1='+x1+' y1='+y1+' x2='+x2+' y2='+y2);
	layoutMark += Math.abs(x1-x2);
	layoutMark += Math.abs(y1-y2);
    },
    umarkEdge: (x1, y1, x2, y2)=>{
	layoutUMark += Math.abs(x1-x2);
	layoutUMark += Math.abs(y1-y2);
    },
    getMarkedCells: (fx, fy, tx, ty, rval)=>{layoutMarkedCells++;if(layoutCellFound)rval.push(1);}
};

const lassoactions = {};
