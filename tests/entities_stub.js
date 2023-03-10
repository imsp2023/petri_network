var layoutAjust = 0;
var layoutClosest = 0;
var layoutMark = 0;
var layoutUMark = 0;
var entities = {};

class Transition {
    constructor(props={}){
	if(factoryFailed)
	    throw new Error("instantiation failed");
	this.comp = {redraw: ()=>{},shape: {form: {x: props.x,cy: props.y}}};
    }
}

class Edge {
    constructor(){
	if(factoryFailed)
	    throw new Error("instantiation failed");
    }
}

class Place {
    constructor(props={}){
	if(factoryFailed)
	    throw new Error("instantiation failed");
	this.comp = {redraw: ()=>{},shape: {form: {x: props.x,y: props.y}}};
    }
}

var layout = {
    grid: [],
    init : (cw, ch, w, h)=>{
	var i;
	layout.cellW = cw; layout.cellH = ch;
	layout.gridW = w; layout.gridH = h;
	for(i=0; i < w*h; i++)
	    layout.grid.push(0);
    },
    getClosestPosition: (x, y)=>{layoutClosest++; return {x:x+2,y:y+2}},
    mark: (x, y)=>{layoutMark++; console.log('mark');},
    umark: (x, y)=>{layoutUMark++; console.log('umark');},
    fixPoint: (x, y)=>{layoutAjust++; return {x:x, y:y};},
    markEdge(x1, y1, x2, y2){
	console.log('x1='+x1+' y1='+y1+' x2='+x2+' y2='+y2);
	layoutMark += Math.abs(x1-x2);
	layoutMark += Math.abs(y1-y2);
    },
    umarkEdge(x1, y1, x2, y2){
	layoutUMark += Math.abs(x1-x2);
	layoutUMark += Math.abs(y1-y2);
    }
};
