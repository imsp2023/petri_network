import {Panel} from "./panel";
import {Transition} from "./entities/transition";
import {Place} from "./entities/place";
import {layout} from "./layout";

const Event = {
    line: null,
    src: null,
    state: null,
    config: {},

    onmouseover: (target, actions, x, y)=>{
	//console.log('mouseover Component state='+Event.state+ ' pos='+target.panelPos);

	if(Event.state == 'moving')
	    return;
	else if(target.panelPos < 0)
		Panel.add(target, actions, x, y);
	
	target.state = 'component';
    },

    onmouseleave: (target)=>{
	//console.log('mouseleave Component');
	target.state = null;
    },

    onmousedown: (target, actions)=>{
	Panel.remove(target, actions);
	Event.state = 'moving';
	Event.x = target.comp.shape.x;
	Event.y = target.comp.shape.y;
    },

    onmouseup: (target)=>{
	// console.log('mouseUp state='+Event.state);
	if(Event.state == 'linking')
	    target.actions.edgeCompleted(target);
	else if(Event.state == 'moving'){
	    var edges = [], src, dest, osrc, odest, dim;
	    var lyt = layout.fixPoint(target.comp.shape.x,
				      target.comp.shape.y);
	    
	    if(target.type == 'transition')
		dim = Transition.getShapeDimension(target.comp.type);
	    else if(target.type == 'place')
		dim = Place.getShapeDimension(target.comp.type);


	    dim.x = lyt.x;
	    dim.y = lyt.y;

	    target.centerComponent(dim);
	    target.move(dim.x - target.comp.shape.x,
			dim.y - target.comp.shape.y);
	}
	
	Event.src = null;
	Event.state = null;
	Event.x = null;
	Event.y = null;
    },
    
    onclick: (target)=>{
		if(Event.config.node == target)
				Event.config.node = null;
		else
			Event.config.node = target;
    }
};
export {Event};
