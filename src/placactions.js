const placactions = {
    list: [
	{name: "transition", path: "src/images/transition3.png"},
	{name: "edge", path: "src/images/edge2.png"},
	{name: "xorsplit", path: "src/images/xorsplit.png"},
	{name: "multichoice", path: "src/images/inclusive.png"},
	{name: "deferredchoice", path: "src/images/deferredchoice.png"},
	{name: "while", path: "src/images/loop2.png"},
	{name: "multinstance", path: "src/images/multinstance.png"},
	{name: "deletion", path: "src/images/delete.png"}
    ],
    
    transition: (target)=>{
	var props = {}, tr, pos, edge, step, i, posx, posy;

	props.type = 'dummy'
	
	/* TODO: genereate name*/
	props.name = 't_ + aya.uuid()';

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

	tr = ComponentFactory.getComponent('transition', props);
	edge = ComponentFactory.getComponent('edge', {
	    direction: 'p2t',
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

    xorsplit: (target)=>{
	var lyt, p, t, e, cur, obj={};

        lyt = layout.getClosestPosition(Math.floor(target.comp.shape.shape.x/layout.cellW),
					Math.floor(target.comp.shape.shape.y/layout.cellH));
	obj.x = lyt.x*layout.cellW;
	obj.y = lyt.y*layout.cellH;
	obj.type = 'dummy';

        t = ComponentFactory.getComponent('transition', obj);
	e = ComponentFactory.getComponent('edge', {src: target.comp.shape.uuid,
				   dest: t.comp.shape.uuid,
				   direction: 'p2t', cond:""});

        lyt = layout.getClosestPosition(Math.floor(t.comp.shape.shape.x/layout.cellW),
					Math.floor(t.comp.shape.shape.y/layout.cellH));
	obj.x = lyt.x*layout.cellW;
	obj.y = lyt.y*layout.cellH;
	obj.type = 'intermediary';

        p = ComponentFactory.getComponent('place', obj);
	e = ComponentFactory.getComponent('edge', {src: t.comp.shape.uuid,
				   dest: p.comp.shape.uuid,
				   direction: 't2p'});

        lyt = layout.getClosestPosition(Math.floor(target.comp.shape.shape.x/layout.cellW),
					Math.floor(target.comp.shape.shape.y/layout.cellH));
	obj.x = lyt.x*layout.cellW;
	obj.y = lyt.y*layout.cellH;
	obj.type = 'dummy';

        t = ComponentFactory.getComponent('transition', obj);
	e = ComponentFactory.getComponent('edge', {src: target.comp.shape.uuid,
				   dest: t.comp.shape.uuid,
				   direction: 'p2t', cond:""});

        e = ComponentFactory.getComponent('edge', {src: t.comp.shape.uuid,
				   dest: p.comp.shape.uuid,
				   direction: 't2p'});

    },

    multichoice: (target)=>{
	var i, lyt, p, p2, t, t0, t2, t3, e, cur, obj={};

        lyt = layout.getClosestPosition(Math.floor(target.comp.shape.shape.x/layout.cellW),
					Math.floor(target.comp.shape.shape.y/layout.cellH));
	obj.x = lyt.x*layout.cellW;
	obj.y = lyt.y*layout.cellH;
	obj.type = 'dummy';

        t0 = ComponentFactory.getComponent('transition', obj);
	e = ComponentFactory.getComponent('edge', {src: target.comp.shape.uuid,
				   dest: t0.comp.shape.uuid,
				   direction: 'p2t'});

        for(i=0; i<2; i++){
            lyt = layout.getClosestPosition(Math.floor(t0.comp.shape.shape.x/layout.cellW),
					    Math.floor(t0.comp.shape.shape.y/layout.cellH));
	    obj.x = lyt.x*layout.cellW;
	    obj.y = lyt.y*layout.cellH;
	    obj.type = 'intermediary';

            p = ComponentFactory.getComponent('place', obj);
            e = ComponentFactory.getComponent('edge', {src: t0.comp.shape.uuid,
				       dest: p.comp.shape.uuid,
				       direction: 't2p'});
            lyt = layout.getClosestPosition(Math.floor(p.comp.shape.shape.x/layout.cellW),
					    Math.floor(p.comp.shape.shape.y/layout.cellH));
	    obj.x = lyt.x*layout.cellW;
	    obj.y = lyt.y*layout.cellH;
	    obj.type = 'automatic';
            obj.name = 'auto'+i;

            t = ComponentFactory.getComponent('transition', obj);

            lyt = layout.getClosestPosition(Math.floor(p.comp.shape.shape.x/layout.cellW),
					    Math.floor(p.comp.shape.shape.y/layout.cellH));
	    obj.x = lyt.x*layout.cellW;
	    obj.y = lyt.y*layout.cellH;
	    obj.type = 'dummy';
            obj.name = null;

            t2 = ComponentFactory.getComponent('transition', obj);

            e = ComponentFactory.getComponent('edge', {src: p.comp.shape.uuid,
				       dest: t.comp.shape.uuid,
				       direction: 'p2t', cond:''});

            e = ComponentFactory.getComponent('edge', {src: p.comp.shape.uuid,
				       dest: t2.comp.shape.uuid,
				       direction: 'p2t', cond:''});

            lyt = layout.getClosestPosition(Math.floor(t.comp.shape.shape.x/layout.cellW),
					    Math.floor(t.comp.shape.shape.y/layout.cellH));
	    obj.x = lyt.x*layout.cellW;
	    obj.y = lyt.y*layout.cellH;
	    obj.type = 'intermediary';

            p = ComponentFactory.getComponent('place', obj);

            e = ComponentFactory.getComponent('edge', {src: t.comp.shape.uuid,
				       dest: p.comp.shape.uuid,
				       direction: 't2p'});
            e.comp.shape.redraw();

            e = ComponentFactory.getComponent('edge', {src: t2.comp.shape.uuid,
				       dest: p.comp.shape.uuid,
				       direction: 't2p'});
            e.comp.shape.redraw();

            if(!i){
                lyt = layout.getClosestPosition(Math.floor(p.comp.shape.shape.x/layout.cellW),
						Math.floor(p.comp.shape.shape.y/layout.cellH));
		obj.x = lyt.x*layout.cellW;
		obj.y = lyt.y*layout.cellH;
		obj.type = 'dummy';
                t3 = ComponentFactory.getComponent('transition', obj);
                t3.comp.setGate('and_join');
            }

            e = ComponentFactory.getComponent('edge', {src: p.comp.shape.uuid,
				       dest: t3.comp.shape.uuid,
				       direction: 'p2t'});
        }

    },

    deferredchoice: (target)=>{
	var i, lyt, p, p2, t, t2, e, obj={}, ca = [null, null];

        lyt = layout.getClosestPosition(Math.floor(target.comp.shape.shape.x/layout.cellW),
	    				Math.floor(target.comp.shape.shape.y/layout.cellH));
	obj.x = lyt.x*layout.cellW;
	obj.y = lyt.y*layout.cellH;
	obj.type = 'dummy';
	t = ComponentFactory.getComponent('transition', obj);

        e = ComponentFactory.getComponent('edge', {src: target.comp.shape.uuid,
	    			   dest: t.comp.shape.uuid,
	    			   direction: 't2p'});
        e.comp.shape.redraw();

        for(i=0; i<2; i++){
            lyt = layout.getClosestPosition(Math.floor(t.comp.shape.shape.x/layout.cellW),
	    				    Math.floor(t.comp.shape.shape.y/layout.cellH));
	    obj.x = lyt.x*layout.cellW;
	    obj.y = lyt.y*layout.cellH;
	    obj.type = 'intermediary';

            p = ComponentFactory.getComponent('place', obj);

            e = ComponentFactory.getComponent('edge', {src: t.comp.shape.uuid,
	    			       dest: p.comp.shape.uuid,
	    			       direction: 't2p'});
            e.comp.shape.redraw();

            lyt = layout.getClosestPosition(Math.floor(p.comp.shape.shape.x/layout.cellW),
	    				    Math.floor(p.comp.shape.shape.y/layout.cellH));
            obj.x = lyt.x*layout.cellW;
	    obj.y = lyt.y*layout.cellH;
	    obj.type = 'automatic';
            obj.name = 'auto'+i;

            t2 = ComponentFactory.getComponent('transition', obj);
            ca[i] = t2;

            e = ComponentFactory.getComponent('edge', {src: p.comp.shape.uuid,
	    			       dest: t2.comp.shape.uuid,
	    			       direction: 'p2t'});
            if(!i){
                lyt = layout.getClosestPosition(Math.floor(t2.comp.shape.shape.x/layout.cellW),
	    					Math.floor(t2.comp.shape.shape.y/layout.cellH));
	        obj.x = lyt.x*layout.cellW;
	        obj.y = lyt.y*layout.cellH;
	        obj.type = 'intermediary';
                obj.name = null;

                p2 = ComponentFactory.getComponent('place', obj);
            }

            e = ComponentFactory.getComponent('edge', {src: t2.comp.shape.uuid,
	    			       dest: p2.comp.shape.uuid,
	    			       direction: 't2p'});
        }

        ca[0].comp.ca = ca[1].comp.name;
        ca[0].comp.cauuid = ca[1].comp.shape.shape.uuid;

        ca[1].comp.ca = ca[0].comp.name;
        ca[1].comp.cauuid = ca[0].comp.shape.shape.uuid;

        e = ComponentFactory.getComponent('edge', {src: ca[0].comp.shape.shape.uuid,
	            		   dest: ca[1].comp.shape.shape.uuid,
	            		   direction: 'ca'});

    },

    while: (target)=>{
	var i, lyt, p, t, e, obj={};

        lyt = layout.getClosestPosition(Math.floor(target.comp.shape.shape.x/layout.cellW),
                                        Math.floor(target.comp.shape.shape.y/layout.cellH));

        obj.x = lyt.x*layout.cellW;
        obj.y = lyt.y*layout.cellH;
        obj.type = 'dummy';
        t = ComponentFactory.getComponent('transition', obj);

        e = ComponentFactory.getComponent('edge', {src: target.comp.shape.uuid,
                                   dest: t.comp.shape.uuid,
                                   direction: 'p2t', cond:""});

        e = ComponentFactory.getComponent('edge', {src: t.comp.shape.uuid,
                                   dest: target.comp.shape.uuid,
                                   direction: 't2p',
                                   altpath: true});
        
        lyt = layout.getClosestPosition(Math.floor(target.comp.shape.shape.x/layout.cellW),
                                        Math.floor(target.comp.shape.shape.y/layout.cellH));
        
        obj.x = lyt.x*layout.cellW;
        obj.y = lyt.y*layout.cellH;
        obj.type = 'dummy';
        
        t = ComponentFactory.getComponent('transition', obj);

        e = ComponentFactory.getComponent('edge', {src: target.comp.shape.uuid,
                                   dest: t.comp.shape.uuid,
                                   direction: 'p2t', cond: ""});

    },

    multinstance: (target)=>{
    },
    
    deletion: (target)=>{
		var edges = [], src, dest;

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

	console.log('completed type='+target.type+ ' x2='+ target.comp.shape.shape.x);
	Event.line.removeFromDOM();

        /* Only p2t  and t2p are allowed */
	if(Event.src.type == 'transition'){
            var count = {altpath: false};


            Register.forEach(
		(item, data)=>{
                    console.log('Register');
                    if(item.type=='edge' &&
		       (item.comp.src == target.comp.shape.uuid ||
			item.comp.dest == target.comp.shape.uuid)){
                        if(item.comp.src == Event.src.comp.shape.uuid ||
			   item.comp.dest == Event.src.comp.shape.uuid)
			    data.altpath = true;
		    }
		},
		count);

            /* Set xor_join if transition has more than one place associated */
            // if(count.count >= 1)
            //     target.comp.setGate('xor_join');

	    e = ComponentFactory.getComponent('edge', {
		direction:'t2p',
		src: Event.src.comp.shape.uuid,
		dest: target.comp.shape.uuid,
                altpath: count.altpath
	    });
	}

	Event.line = null;
	Event.src = null;
	Event.state = null;
    }
};
