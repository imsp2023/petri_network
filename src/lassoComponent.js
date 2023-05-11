import {Lasso} from "./entities/lasso";
import {Event} from "./event";
import {Register} from './register';
import {layout} from './layout';
import { lassoactions } from "./lassoactions";
class LassoComponent{
    addAllEvents() {
	this.comp.shape.addEvent('mouseover', (e)=>{
	    Event.onmouseover(this, lassoactions.list,
			      this.comp.shape.x + this.comp.shape.width,
			      this.comp.shape.y);
	});
	this.comp.shape.addEvent('mousedown', (e)=>{
	    Event.onmousedown(this);
	    Event.state += '_lasso'
	    Event.src = this;
	    Event.x = e.clientX;
	    Event.y = e.clientY;
	    this.oldX = this.comp.shape.x;
	    this.oldY = this.comp.shape.y;
	});
	this.comp.shape.addEvent('mouseleave', (e)=>{
	    Event.onmouseleave(this);
	});
	this.comp.shape.addEvent('mouseup', (e)=>{
	    //Event.onmouseup(this);
	    Event.state = null;
	    Event.x = null;
	    Event.y = null;
	});
    }

    constructor(props={}){
	this.type = 'lasso';
	this.panelPos = -1;
	this.selectedComp = [];
	
	this.comp = new Lasso(props);

	this.actions = lassoactions;
	Register.add(this.comp.shape.uuid, this);
    }

    lockComponent() {
	var ids = [], cp;
	layout.getMarkedCells(Math.floor(this.comp.shape.x/layout.cellW),
			      Math.floor(this.comp.shape.y/layout.cellH),
			      Math.floor((this.comp.shape.x+
					  this.comp.shape.width)/layout.cellW),
			      Math.floor((this.comp.shape.y+
					 this.comp.shape.height)/layout.cellH),
			      ids);
	//console.log(ids);

	if(ids.length == 0){
	    this.remove();
	    return;
	}
	
	ids.map((i)=>{
	    if((cp=Register.find(i))){
		
		if(cp.comp.shape.x > this.comp.shape.x &&
		   cp.comp.shape.y > this.comp.shape.y &&
		   cp.comp.shape.x < this.comp.shape.x+this.comp.shape.width &&
		   cp.comp.shape.y < this.comp.shape.y+ this.comp.shape.height){
		    cp.comp.shape.deleteAllEvents();
		    this.selectedComp.push(cp);
		}
	    }
	})

	this.addAllEvents();
    }

    move(dx, dy){
	this.selectedComp.map((c)=>{
	    c.move(dx, dy);
	    c.comp.redraw();
	});
    }
    
    save(){
	return null;
    }

    resize(dx, dy){
	if(this.comp.shape.width+dx < 0 ||
	   this.comp.shape.height+dy < 0)
	    return;
	this.comp.shape.width += dx;
	this.comp.shape.height += dy;
	this.comp.redraw();
    }
    
    remove(){
	// console.log('remove');
	// console.log(this.comp.shape);

	this.selectedComp.map((c)=>{
	    c.addAllEvents();
	});
	
	this.comp.shape.removeFromDOM();
        Register.clear(this.comp.shape.uuid);
    }
}
export {LassoComponent};