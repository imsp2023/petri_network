const Event = {
    line: null,
    src: null,
    state: null,
    config: {},

    onmouseover: (target, actions, x, y)=>{
	console.log('mouseover Component state='+target.lstate+ ' pos='+target.panelPos);
	// if(target.state == 'moving')
	//     return;
	//else
	    if(target.panelPos < 0)
		Panel.add(target, actions, x, y);
	
	target.state = 'component';
    },

    onmouseleave: (target)=>{
	console.log('mouseleave Component');
	// if(target.state == 'moving')
	//     return;
	target.state = '';
    },

    onmousedown: (target, actions)=>{
	console.log('mousedown component');
	//	Panel.remove(target, actions);
	
	Event.state = 'moving';
	Event.x = target.comp.shape.shape.x;
	Event.y = target.comp.shape.shape.y;
 
	//target.state = 'moving';
    },

    onmouseup: (target)=>{
	// if(this.state == 'moving')
	//     this.state = '';
	console.log('mouseUp state='+Event.state);
	if(Event.state == 'linking')
	    target.actions.edgeCompleted(target);
	else if(Event.state == 'moving'){
	    var edges = [], src, dest, osrc, odest, dim;
	    var lyt = layout.fixPoint(target.comp.shape.shape.x,
				      target.comp.shape.shape.y);
	    
	    dim = Transition.getShapeDimension();
	    dim.x = lyt.x;
	    dim.y = lyt.y;

	    target.centerComponent(dim);
	    target.move(dim.x - target.comp.shape.shape.x,
			dim.y - target.comp.shape.shape.y);

	    layout.umark(Math.floor(Event.x/layout.cellW),
			 Math.floor(Event.y/layout.cellH));
	    layout.mark(lyt.x/layout.cellW,  lyt.y/layout.cellH);
	}
    
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


    // onMouseUp(uuid){
    // 	console.log('mouseUp state='+Component.state);
    // 	if(Component.state == 'linking')
    // 	    this.edgeCompleted(uuid);
    // 	else if(Component.state == 'moving'){
    // 	    var lyt = layout.fixPoint(this.comp.shape.shape.x,
    // 				      this.comp.shape.shape.y);
    // 	    var edges = [], src, dest, osrc, odest;

    // 	    this.comp.shape.shape.shift(lyt.x - this.comp.shape.shape.x,
    // 					lyt.y - this.comp.shape.shape.y);
    // 	    this.comp.redraw(layout.cellW, layout.cellH);

    // 	    Register.forEach(
    // 		(item, data)=>{
    // 		    if(item.type=='edge' &&
    // 		       (item.comp.src == this.comp.shape.uuid ||
    // 			item.comp.dest == this.comp.shape.uuid))
    // 			data.push(item);
    // 		},
    // 		edges);
    // 	    console.log(edges);
    // 	    if(!edges.length){
    // 		layout.umark(Math.floor(Component.x/layout.cellW),
    // 			     Math.floor(Component.y/layout.cellH));
    // 		layout.mark(lyt.x/layout.cellW,  lyt.y/layout.cellH);
    // 	    }else{
    // 		edges.map((e)=>{
    // 		    if(e.comp.src == this.comp.shape.uuid){
    // 			dest = Register.find(e.comp.dest);
    // 			odest = {
    // 			    x: dest.comp.shape.shape.x,
    // 			    y: dest.comp.shape.shape.y
    // 			};
    // 			src = this;
    // 			osrc = {
    // 			    x: Component.x,
    // 			    y: Component.y
    // 			};
			
    // 		    }
    // 		    else{
    // 			src = Register.find(e.comp.src);
    // 			osrc = {
    // 			    x: src.comp.shape.shape.x,
    // 			    y: src.comp.shape.shape.y
    // 			};

    // 			dest = this;
    // 			odest = {
    // 			    x: Component.x,
    // 			    y: Component.y
    // 			};
			
    // 		    }

    // 		    layout.umarkEdge(Math.floor(osrc.x/layout.cellW),
    // 				     Math.floor(osrc.y/layout.cellH),
    // 				     Math.floor(odest.x/layout.cellW),
    // 				     Math.floor(odest.y/layout.cellH));

    // 		    layout.markEdge(Math.floor(src.comp.shape.shape.x/layout.cellW),
    // 				    Math.floor(src.comp.shape.shape.y/layout.cellH),
    // 				    Math.floor(dest.comp.shape.shape.x/layout.cellW),
    // 				    Math.floor(dest.comp.shape.shape.y/layout.cellH));

    // 		    e.comp.shape.redraw();
    // 		});
    // 	    }
    // 	}
    // 	Component.state = null;
    // }

