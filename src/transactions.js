const transactions = {
    list : [
	{name: "place", path: "src/images/place.png"},
	{name: "edge", path: "src/images/edge2.png"},
	{name: "andsplit", path: "src/images/andsplit.png"},
	{name: "dowhile", path: "src/images/loop2.png"},
	{name: "multinstance", path: "src/images/multinstance.png"},
	{name: "deletion", path: "src/images/delete.png"}
    ],

    place: (target)=>{
	var props = {}, tr, pos, edge, step, i, posx, posy;

	props.type = 'intermediary'

	/* TODO: genereate name*/
	props.name = 'generate automatic name';

	posx = Math.floor(target.comp.shape.shape.x/layout.cellW);
	posy = Math.floor(target.comp.shape.shape.y/layout.cellH);
	if((pos=layout.getClosestPosition(posx, posy))){
	    props.x = pos.x*layout.cellW;
	    props.y = pos.y*layout.cellH;
	}else{
	    props.x = 0;
	    props.y = 0;

	    pos.x = 0;
	    pos.y = 0;
	}

	props.cWidth = layout.cellW;
	props.cheight = layout.cellH;

	
	tr = ComponentFactory.getComponent('place', props);
	edge = ComponentFactory.getComponent('edge', {
	    direction: 't2p',
	    src: target.comp.shape.uuid,
	    dest: tr.comp.shape.uuid
	});
    },

    edge: (target)=>{
	Event.state = 'linking'
	Event.src = target;
	Event.line = aya.Line(target.comp.shape.shape.c_points[0].x,
			      target.comp.shape.shape.c_points[0].y);
	Event.line.draw();

    },

    andsplit: (target)=>{
	var i, lyt, p, t, e, cur, obj={};
	
	for(i=0; i<2; i++){
	    cur = target;

	    lyt = layout.getClosestPosition(Math.floor(cur.comp.shape.shape.x/layout.cellW),
					    Math.floor(cur.comp.shape.shape.y/layout.cellH));

	    obj.x = lyt.x*layout.cellW;
	    obj.y = lyt.y*layout.cellH;
	    obj.type = 'intermediary';
	    p = ComponentFactory.getComponent('place', obj);
	    e = ComponentFactory.getComponent('edge', {src: cur.comp.shape.uuid,
				       dest: p.comp.shape.uuid,
				       direction: 't2p'});
            cur = p;
	    lyt = layout.getClosestPosition(Math.floor(cur.comp.shape.shape.x/layout.cellW),
					    Math.floor(cur.comp.shape.shape.y/layout.cellH));
	    obj.x = lyt.x*layout.cellW;
	    obj.y = lyt.y*layout.cellH;
	    obj.type = 'dummy';
	    t = ComponentFactory.getComponent('transition', obj);
	    e = ComponentFactory.getComponent('edge', {src: cur.comp.shape.uuid,
				       dest: t.comp.shape.uuid,
				       direction: 'p2t'});
        }
    },

    dowhile: (target)=>{
	var i, lyt, p, t, e, obj={};

	lyt = layout.getClosestPosition(Math.floor(target.comp.shape.shape.x/layout.cellW),
	    				Math.floor(target.comp.shape.shape.y/layout.cellH));

	obj.x = lyt.x*layout.cellW;
	obj.y = lyt.y*layout.cellH;
	obj.type = 'intermediary';

	p = ComponentFactory.getComponent('place', obj);
	
        e = ComponentFactory.getComponent('edge', {src: target.comp.shape.uuid,
	    			   dest: p.comp.shape.uuid,
	    			   direction: 't2p'});

        e = ComponentFactory.getComponent('edge', {src: p.comp.shape.uuid,
	    			   dest: target.comp.shape.uuid,
	    					   direction: 'p2t',
						   cond: '',
						   altpath: true});
	
	lyt = layout.getClosestPosition(Math.floor(p.comp.shape.shape.x/layout.cellW),
					Math.floor(p.comp.shape.shape.y/layout.cellH));
	
	obj.x = lyt.x*layout.cellW;
	obj.y = lyt.y*layout.cellH;
	obj.type = 'dummy';
	
	t = ComponentFactory.getComponent('transition', obj);

	e = ComponentFactory.getComponent('edge', {src: p.comp.shape.uuid,
				   dest: t.comp.shape.uuid,
				   direction: 'p2t', cond: ''});


    },

    multinstance: (target)=>{
    },
    
    deletion: (target)=>{
	var edges = []; //, src, dest;
        Register.forEach(
	    (item, data)=>{
		if(item.type=='edge' &&
		   (item.comp.src == target.comp.shape.uuid ||
		    item.comp.dest == target.comp.shape.uuid)){
		    data.push(item);
		}
	    },
	    edges);
	
	edges.map((lk) => {
	    lk.remove();
	});

	target.remove();
    },

    edgeCompleted: (target)=>{
        var e;
	if(!Event.line)
	    return;

	Event.line.removeFromDOM();
	
        if(Event.src.type == 'place'){
            var count = {count: 0, altpath: false};
	    

            Register.forEach(
		(item, data)=>{
                    if(item.type=='edge' &&
		       (item.comp.src == target.comp.shape.uuid ||
			item.comp.dest == target.comp.shape.uuid)){
                        data.count++;
                        if(item.comp.src == Event.src.comp.shape.uuid ||
			   item.comp.dest == Event.src.comp.shape.uuid)
			    data.altpath = true;
		    }
		},
		count);

            // Set xor_join if transition has more than one place associated
            if(count.count >= 1)
                target.comp.setGate('xor_join');

	    e = ComponentFactory.getComponent('edge', {
		direction:'p2t',
		src: Event.src.comp.shape.uuid,
		dest: target.comp.shape.uuid,
                altpath: count.altpath
	    });
	}

	Event.line = null;
	Event.src = null;
	Event.state = null;
    }
}
