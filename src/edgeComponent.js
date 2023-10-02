import {edgeactions} from "./edgeactions";
import {Edge} from "./entities/edge";
import { Event } from "./event";
import {Register} from './register';

class EdgeComponent{
    addAllEvents() {
	if(!this.comp.shape.ca)
	    this.comp.shape.line.addEvent('click', (e)=>{
		Event.onclick(this);
	    });
    }
    
    constructor(props){
	this.type = 'edge';
	this.comp = new Edge(props);
	
	this.addAllEvents();
	this.actions = edgeactions;
	Register.add(this.comp.shape.line.uuid, this);
    }

    save(){
	var obj = {};
	Object.keys(this.comp).map((e)=>{
	    if(e != 'shape')
		obj[e] = this.comp[e];
	    else if(this.comp[e].altpath)
		obj['altpath'] = true;
	});
	return obj;
    }

    remove(){
	this.comp.shape.removeFromDOM();
	Register.clear(this.comp.shape.line.uuid);
    }
}
export {EdgeComponent};
