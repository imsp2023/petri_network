import {layout} from "./layout";
import {Event} from "./event";
import {Register} from './register';
import { Transition } from "./entities/transition";
import { transactions } from "./transactions";
class TransitionComponent{
    addAllEvents() {
	this.comp.shape.addEvent('mouseover', (e)=>{
	    Event.onmouseover(this, transactions.list,
			      this.comp.shape.x + this.comp.shape.width,
			      this.comp.shape.y);
	});
	this.comp.shape.addEvent('mousedown', (e)=>{
	    Event.onmousedown(this)
	    layout.umark(Math.floor(this.comp.shape.x/layout.cellW),
			 Math.floor(this.comp.shape.y/layout.cellH));
	});
	this.comp.shape.addEvent('mouseleave', (e)=>{
	    Event.onmouseleave(this);
	});
	this.comp.shape.addEvent('mouseup', (e)=>{
	    Event.onmouseup(this);
	});
	this.comp.shape.addEvent('click', (e)=>{
	    Event.onclick(this);
	});
    }

    centerComponent(comp){
	comp.x += (layout.cellW-comp.width)/2;
        comp.y += (layout.cellH-comp.height)/2;
    }
    
    constructor(props={}){
	var lyt = {x: 0, y :0}, dim;
	
	this.type = 'transition';
	this.panelPos = -1;
	
	if(props.x >= 0 && props.y >= 0){
	    var lyt = layout.fixPoint(props.x, props.y);

	    props.x = lyt.x;
	    props.y = lyt.y;
	}else{
	    props.x = 0;
	    props.y = 0;

	}

	dim = Transition.getShapeDimension(this.type);
	dim.x = props.x;
	dim.y = props.y;
	
	this.centerComponent(dim);
	props.x = dim.x;
	props.y = dim.y;
	
	this.comp = new Transition(props);

	layout.mark(Math.floor(props.x/layout.cellW),
                    Math.floor(props.y/layout.cellH),
                    this.comp.shape.uuid);

	this.addAllEvents();
	this.actions = transactions;
        Register.add(this.comp.shape.uuid, this);
    }

    move(dx, dy) {
	var edges = [];

	layout.umark(Math.floor(this.comp.shape.x/layout.cellW),
		     Math.floor(this.comp.shape.y/layout.cellH));

	this.comp.shape.shift(dx, dy);

	layout.mark(Math.floor(this.comp.shape.x/layout.cellW),
		    Math.floor(this.comp.shape.y/layout.cellH),
		    this.comp.shape.uuid);
	this.comp.redraw();

	Register.forEach(
	    (item, data)=>{
		if(item.type=='edge' &&
		   (item.comp.src == this.comp.shape.uuid ||
		    item.comp.dest == this.comp.shape.uuid))
		    data.push(item);
	    },
	    edges
	);

	edges.map((e)=>{
	    e.comp.redraw();
	});
    }

    setType(type){
        var dim;
        if(this.comp.type == type)
            return;

        this.comp.type = type;
        this.comp.app = {};
        this.comp.shape.children.map(({child})=>{
            child.removeFromDOM();
        })

        this.comp.shape.children.length = 0;
	var lyt = layout.fixPoint(this.comp.shape.x, this.comp.shape.y);
        dim = Transition.getShapeDimension(type);

	console.log(lyt);
	this.comp.shape.x = lyt.x; 
	this.comp.shape.y = lyt.y;
        this.comp.shape.width = dim.width;
        this.comp.shape.height = dim.height;

	this.centerComponent(this.comp.shape);
	
        this.comp.completeShape();
	this.move(0, 0)                ;
    }
    
    save(){
	var obj = {};
	Object.keys(this.comp).map((e)=>{
		// console.log(e);
	    if(e != 'shape' && e!= 'panelPos' && e!= 'cWidth' && e != 'cheight' && e != 'state' && e != 'app') 
		obj[e] = this.comp[e];
	    else if(e == 'shape'){
		obj.uuid = this.comp[e].shape.uuid
		obj.x = this.comp[e].shape.x;
		obj.y = this.comp[e].shape.y;
	    }
	});
	return obj;
    }

    remove(){
	if(this.comp.ca){
	    var cp;
	    if((cp = Register.find(this.comp.cauuid))){
		delete cp.comp.ca;
		delete cp.comp.cauuid;

		delete this.comp.ca;
		delete this.comp.cauuid;
	    }
	}

	layout.umark(Math.floor(this.comp.shape.x/layout.cellW),
		     Math.floor(this.comp.shape.y/layout.cellH));
	this.comp.shape.removeFromDOM();
        Register.clear(this.comp.shape.uuid);
    }
}
export {TransitionComponent};