(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.petri = {}));
})(this, (function (exports) { 'use strict';

	class Register{
	    static store = {};
	    
	    static add(id, obj) {
		if(id)
		    Register.store[id] = obj;
	    }

	    static find(id){
	        return Register.store[id] ? Register.store[id] : null;
	    }

	    static clear(id){
	        delete Register.store[id];
	    }

	    static forEach(func, userdata){
		Object.keys(Register.store).map((e)=>{
		    func(Register.store[e], userdata);
		});
	    }
	}

	const edgeactions = {
	    list : [
		{name: "deletion", path: "src/images/delete.png"}
	    ],

	    deletion: (target)=>{
		target.remove();
	    }
	};

	class Edge {
	    constructor(props={}){
		var src, dest;
		if (!props.direction || !props.src || !props.dest)
		        throw new Error("missing parameters");

	            if ((props.direction != "p2t" && props.direction != "t2p" && props.direction != "ca") ||
		        !(src=Register.find(props.src)) ||
		        !(dest=Register.find(props.dest)) ||
		        (props.direction != 'ca' && src.comp.shape.type == dest.comp.shape.type))
		        throw new Error("wrong direction");

		    this.src = props.src;
		    this.dest = props.dest;
		    this.direction = props.direction;
	        if(props.cond || props.cond == "")
	            this.cond = props.cond;

	        if(props.direction == 'ca'){
	            props.subtype =  'optimal';
	            props.end_start = 'circle';
	            props.end_dest = 'circle';
	        }

		    this.shape = paya.link(src.comp.shape.uuid,
				                  dest.comp.shape.uuid,
	                              props);
	        if (this.cond != undefined){
	            //this.shape.addText(this.cond, "top");
	            if (this.cond == '')
	                //this.shape.line.setStyles({strokedasharray: "2"});
			this.shape.line.setStyles({stroke: "red"});
		    else
			this.shape.line.setStyles({stroke: "blue"});
	        }
	        this.shape.line.children.map(({child})=>{
	            child.setStyles({"fill": "black"});
	        });
	        this.shape.redraw();
	    }

	    setCond(cond){
		this.cond = cond;
		if (this.cond == '')
	            this.shape.line.setStyles({stroke: "red"});
		else
		    this.shape.line.setStyles({stroke: "blue"});
	    }

	    redraw(){
		this.shape.redraw();
	    }
	}

	const ImSZ = 22;
	const Panel = {
	    path2name: (actions, path)=>{
		var a;
		for(a=0; a < actions.length; a++){
		    if(path == actions[a].path){
			return actions[a].name;
		    }
		}
		return '';
	    },
	    add: (target, actions, posx, posy)=>{
		var x = posx;
		var y = posy;
		var wid, hei, panel, img;

		wid = 2*ImSZ+2*5/*spacing*/;
		hei = Math.floor(actions.length/2);
		if(actions.length % 2)
		    hei++;

		hei = hei*ImSZ+ hei*5;
		panel = paya.rectangle(x, y, wid, hei, false, false);

		target.comp.shape.addChild(panel, {x: -2, y: 0}, null, true);
		panel.c_svg.setAttribute("stroke-width", "0px");
		panel.c_svg.setAttribute("opacity", 0);

		target.panelPos = target.comp.shape.children.length-1;

	        for (var i = 0, j = 0; i < actions.length; i++, j++){
		    if (i && !(i%3)){
			j = 0;
			y += ImSZ+5/* spacing */;
		    }

		    img = paya.image(x +ImSZ * j, y, ImSZ, ImSZ,
				    actions[i].path, actions[i].name, false, false);
		    target.comp.shape.addChild(img, {x: 5, y: 0}, null, true);
		    img.c_svg.setAttribute("width", ImSZ);
		    img.c_svg.setAttribute("height", ImSZ);

		    img.addEvent("mouseover", (e)=>{
			target.state = 'panel';
		    });
		    img.addEvent("mouseleave", (e)=>{
			target.state = null;
		    });
		    img.addEvent("mousedown", (e)=>{
			Panel.remove(target);
			target.actions[Panel.path2name(actions, e.target.href.baseVal)](target);
		    });
		}

		panel.addEvent("mouseover", (e)=>{
		    target.state = 'panel';
		});
		panel.addEvent("mouseleave", (e)=>{
		    target.state = null;
		});

		target.comp.shape.svg.addEventListener("mouseover", () => {
		    // console.log('mouseover SVG state='+target.state + ' panelpos='+target.panelPos);
		    if (target.state == null && target.panelPos >= 0){
			Panel.remove(target);
			target.comp.shape.svg.removeEventListener("mouseover",()=>{});
		    }
		});
	    },

	    remove: (target)=>{
			var i, len;

				if(target.panelPos < 0)
					return;

		len = target.comp.shape.children.length;
	        for(i = target.panelPos; i < target.comp.shape.children.length; i++)
		    target.comp.shape.children[i].child.removeFromDOM();
		target.comp.shape.children.splice(target.panelPos, len);

			target.panelPos = -1;
			target.comp.shape.svg.removeEventListener("mouseover", () => {});
	    }
	};

	class Transition{
	    static getShapeDimension(type){
	        var dim = {width: 20, height: 50};
		
	        if(type == 'asub' || type == 'ssub'){
		    dim.width = 30;
		    dim.height = 60;
		}
		
	        return dim;
	    }

	    completeShape(){
	        var color = 'white';

	        if(this.type == 'dummy')
		    color = 'black';

		this.shape.c_svg.setAttribute("fill", color);
		this.shape.c_svg.setAttribute("stroke-width", "2px");
		this.shape.vertex.map((v)=>{
		    v.c_svg.setAttribute("fill", 'none');
		});
		this.shape.c_points.map((c)=>{
		    c.c_svg.setAttribute("fill", 'none');
		});


		if(this.type == 'asub' || this.type == 'ssub'){
		    var child = paya.rectangle(
			this.shape.x,
			this.shape.y,
			20, 50);
		    this.shape.addChild(child, {x: 5, y: 5}, null);
		    child.setStyles({fill: "none"});
		}else if(this.type == 'clock' || this.type == 'event' ||
	                 this.type == 'manual' || this.type == 'automatic'){
		    this.shape.addChild(paya.image(
			this.shape.x,
			this.shape.y,
			20, 20,
			this.type=='clock' ? 'src/images/clock2.png':
			    this.type=='event' ? 'src/images/envelope.png' :
			    this.type=='manual' ? 'src/images/user1.png':
	                    'src/images/service2.png', false, false), {x: 0, y: 0}, null);
		}

		if(this.type == 'asub' ||this.type == 'ssub' ||
	           this.type == 'automatic' ||this.type == 'manual'){
		    this.shape.addChild(
			paya.text(this.shape.x - 60,
				 this.shape.y - 10, this.name, 0, this.shape.x + this.shape.width + 60, this.shape.y - 10, false, false),
			{x: 0, y: 0}, null);
		}

	    }

	    constructor(props={type: 'dummy'}){
		var dim = {};

		if(props && typeof props != 'object')
		    throw new Error('wrong parameter');

		if(props.name && !props.type){
		    props.type = "dummy";
		}else if(props.type == "dummy" || props.type == "clock"){
		    if(!props.name)
			props.name = 't_' + paya.id();
		}else if(props.type == "manual" || props.type == "automatic" ||
			 props.type == "asub" || props.type == "ssub" || props.type == "event"){
		    if(!props.name)
			throw new Error("manual transition requires a name");
		}else
		    throw new Error("wrong transition type");

	        this.panelPos = -1;
		this.state = '';
		
		Object.keys(props).map((e)=>{
		    if(e != 'x' && e != 'y')
				this[e] = props[e];
		});
		    
		if(props.app == undefined)
			this.app = {};
	        
		dim = Transition.getShapeDimension(this.type);

		this.shape = paya.rectangle(props.x, props.y, dim.width, dim.height, true, true, props.uuid);
		if(this.shape && this.shape.type != 'rectangle')
		    throw new Error("the shape isn't a rectangle");

		this.completeShape();
	    }

		setGate(gate){
			var index;
			if(this.gate != 'xor_join' && gate == 'xor_join'){
				this.shape.addChild(paya.polyline([this.shape.x, this.shape.y,
								this.shape.x-5, this.shape.y,
								this.shape.x-5, this.shape.y+this.shape.height,
								this.shape.x, this.shape.y+this.shape.height,
								this.shape.x-5, this.shape.y+this.shape.height/2,
								this.shape.x, this.shape.y], false, false), {x: 0, y: 0}, null);
				this.shape.redraw();
			}else if(this.gate == 'xor_join' && gate != 'xor_join'){
				if(this.type == 'manual' || this.type == 'automatic' ||
					this.type == 'asub' || this.type == 'ssub')
					index = 2;
				else if(this.type == 'dummy')
					index = 0;
				else
					index = 1;
				this.shape.children[index].child.removeFromDOM();
				this.shape.children.length--;
			}
			this.gate = gate;
	    }

	    setName(name){
	        this.name = name;
	        if(this.ca)
	            Register.find(this.cauuid).comp.ca = name;
			if (this.shape.children.length == 2)
				this.shape.children[1].child.text = name;
	        this.shape.redraw();
	    }

	    redraw(){
			this.shape.redraw();
	    }
	    
	    removeFromDOM(){
	    }
	}

	class Place{
	    static Radius = 20;
	    static IStroke = '1px';
	    static SStroke = '2px';
	    static EStroke = '2px';
	    static IColor = 'black';
	    static SColor = 'green';
	    static EColor = 'red';

	    static getShapeDimension(type){
	        return {};
	    }
	    
	    constructor(props = {}){

			var color = Place.IColor;
			var pixel = Place.IStroke;

			this.panelPos = -1;
			this.state = '';
			
			Object.keys(props).map((e)=>{
				if(e != 'x' && e != 'y')
				this[e] = props[e];
			});

			if(this.type == undefined)
				this.type = "intermediary";
			
			if(!this.name)
				this.name = 'p_' + paya.id();
			
			if (this.type == "start"){
				color = Place.SColor;
				pixel = Place.SStroke;		}else if (this.type == "end"){
				color = Place.EColor;
				pixel = Place.EStroke;
			}
			else if (this.type != "intermediary")
				throw new Error("wrong parameter");

			this.shape = paya.circle(props.x, props.y, Place.Radius, true, true, props.uuid);
			if(this.shape && this.shape.type != 'circle')
				throw new Error("the shape isn't a circle");

			this.shape.removeBoxFromDOM();

			this.shape.setStyles({fill: "white", strokewidth: pixel, stroke: color});

			this.shape.makeHiddenCpoints();
			this.shape.makeHiddenVertex();
	    }

	    redraw(){
			this.shape.redraw();
	    }
	    
	    setType(type){
			var color = Place.IColor;
			var pixel = Place.IStroke;

			if(this.type == type)
					return;

			this.type = type;
			if (this.type == "start"){
				color = Place.SColor;
				pixel = Place.IStroke;
			}
			else if (this.type == "end"){
				color = Place.EColor;
				pixel = Place.EStroke;
			}
			
			this.shape.c_points.map((pt) => {
				pt.setStyles({fill: color});
			});
			this.shape.setStyles({strokewidth: pixel, stroke: color});
			this.shape.redraw();
	    }
	}

	const space = 3;
	var layout = {
	    cellW: 0,
	    cellH: 0,
	    grid: [],
	};

	layout.init = function(cellW, cellH, gridW, gridH){
	    var i;
	    if(!cellW || !cellH || !gridW || !gridH)
		return false;

	    layout.cellW = cellW;
	    layout.cellH = cellH;
	    layout.ncols = Math.floor(gridW/cellW);
	    layout.nligs = Math.floor(gridH/cellH);
	    layout.grid = [];
	    for(i = 0; i < layout.ncols*layout.nligs; i++)
		layout.grid.push(false);
	    return true;
	};

	layout.getClosestPosition = (originX, originY)=>{
	    var obj = {}, pos1, pos2, i, j, coef;

	    // console.log('closestposition x='+originX+' y='+originY);
	    if(originX == undefined || originY == undefined ||
	       originX < 0 || originY < 0 || originX >= layout.ncols || originY >= layout.nligs)
		return null;
	    
	    for(j=0, coef=1; j < 2 /*east, west oritentation*/; j++, coef*=-1){
		if(originX+coef*space >= layout.ncols || originX+coef*space < 0)
		    continue;
		
		for(i=0; i < layout.nligs-originY; i+=1){
		    pos1 = originY-i;
		    pos2 = originY+i;

		    obj.x = originX+coef*space;
		    if(pos1 >= 0){
			pos1 = layout.ncols*pos1+originX+coef*space;
			if(!layout.grid[pos1]){
			    obj.y = originY-i;
			    // console.log('close-1');
			    // console.log(obj);
			    return obj;
			}
		    }				

		    if(pos2 < layout.nligs){
			pos2 = layout.ncols*pos2+originX+coef*space;
			
			if(!layout.grid[pos2]){
			    obj.y = originY+i;
			    // console.log('close-2');
			    // console.log(obj);
			    return obj;
			}
		    }
		}
	    }
	    
	    return null;
	};


	layout.clear = ()=>{
	    var i;
	    for(i=0; i< layout.grid.length; i++)
		layout.grid[i] = false;
	};

	layout.mark = (col, lig, comp)=>{
	    // console.log('LAYOUT mark x1='+col+' y1='+lig);
	    layout.grid[lig*layout.ncols+col] = comp ? comp: true;
	};

	layout.umark = (col, lig)=>{
	    // console.log('umark x1='+col+' y1='+lig);
	    layout.grid[lig*layout.ncols+col] = false;
	};

	layout.fixPoint = (x, y)=>{
	    if(x == undefined || y == undefined ||
	       x < 0 || x >= layout.ncols*layout.cellW ||
	       y < 0 || x >= layout.nligs*layout.cellH)
		return {x: 0, y: 0};
	    return {x: Math.floor(x/layout.cellW)*layout.cellW, y: Math.floor(y/layout.cellH)*layout.cellH};
	};

	layout.getMarkedCells= (fromX, fromY, toX, toY, cells)=>{
	    var i, j;
	    for(j = fromY; j <= toY; j++)
		for(i = fromX; i <= toX; i++){
		    // console.log('LAYOUT mark x1='+i+' y1='+j+ 'value'+layout.grid[i*layout.ncols+j]);
		    if(layout.grid[j*layout.ncols+i])
			cells.push(layout.grid[j*layout.ncols+i]);
		}
	};

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
		    var dim;
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
			var props = {}, tr, pos, posx, posy;

			props.type = 'dummy';
			
			props.name = 't_' + paya.id();
			console.log("placactions");
			console.log(props.name);

			posx = Math.floor(target.comp.shape.x/layout.cellW);
			posy = Math.floor(target.comp.shape.y/layout.cellH);
			if((pos=layout.getClosestPosition(posx, posy))){
				props.x = pos.x*layout.cellW;
				props.y = pos.y*layout.cellH;
			}else {
				props.x = 0;
				props.y = 0;

				pos.x = 0;
				pos.y = 0;
			}

			props.cWidth = layout.cellW;
			props.cheight = layout.cellH;

			tr = ComponentFactory.getComponent('transition', props);
			ComponentFactory.getComponent('edge', {
				direction: 'p2t',
				src: target.comp.shape.uuid,
				dest: tr.comp.shape.uuid
			});
	    },

	    edge: (target)=>{
			Event.state = 'linking';
			Event.src = target;
			Event.line = paya.line(target.comp.shape.c_points[0].x,
						target.comp.shape.c_points[0].y, true, false);
			Event.line.vertex.map((vt)=>{ vt.setStyles({fill: "none"});});
	    },

	    xorsplit: (target)=>{
			var lyt, p, t, obj={};

			lyt = layout.getClosestPosition(Math.floor(target.comp.shape.x/layout.cellW),
				Math.floor(target.comp.shape.y/layout.cellH));
			obj.x = lyt.x*layout.cellW;
			obj.y = lyt.y*layout.cellH;
			obj.type = 'dummy';

			t = ComponentFactory.getComponent('transition', obj);
			ComponentFactory.getComponent('edge', {src: target.comp.shape.uuid,
						dest: t.comp.shape.uuid,
						direction: 'p2t', cond:""});

				lyt = layout.getClosestPosition(Math.floor(t.comp.shape.x/layout.cellW),
							Math.floor(t.comp.shape.y/layout.cellH));
			obj = {};
			obj.x = lyt.x*layout.cellW;
			obj.y = lyt.y*layout.cellH;
			obj.type = 'intermediary';

			p = ComponentFactory.getComponent('place', obj);
			ComponentFactory.getComponent('edge', {src: t.comp.shape.uuid,
						dest: p.comp.shape.uuid,
						direction: 't2p'});

				lyt = layout.getClosestPosition(Math.floor(target.comp.shape.x/layout.cellW),
							Math.floor(target.comp.shape.y/layout.cellH));
			obj = {};
			obj.x = lyt.x*layout.cellW;
			obj.y = lyt.y*layout.cellH;
			obj.type = 'dummy';

			t = ComponentFactory.getComponent('transition', obj);
			ComponentFactory.getComponent('edge', {src: target.comp.shape.uuid,
														dest: t.comp.shape.uuid,
														direction: 'p2t', cond:""});

			ComponentFactory.getComponent('edge', {src: t.comp.shape.uuid,
														dest: p.comp.shape.uuid,
														direction: 't2p'});
	    },

	    multichoice: (target)=>{
		var i, lyt, p, t, t0, t2, t3, e, obj={};

	        lyt = layout.getClosestPosition(Math.floor(target.comp.shape.x/layout.cellW),
						Math.floor(target.comp.shape.y/layout.cellH));
		obj.x = lyt.x*layout.cellW;
		obj.y = lyt.y*layout.cellH;
		obj.type = 'dummy';

	        t0 = ComponentFactory.getComponent('transition', obj);
		e = ComponentFactory.getComponent('edge', {src: target.comp.shape.uuid,
					   dest: t0.comp.shape.uuid,
					   direction: 'p2t'});

	        for(i=0; i<2; i++){
	            lyt = layout.getClosestPosition(Math.floor(t0.comp.shape.x/layout.cellW),
						    Math.floor(t0.comp.shape.y/layout.cellH));
		    obj.x = lyt.x*layout.cellW;
		    obj.y = lyt.y*layout.cellH;
		    obj.type = 'intermediary';

	            p = ComponentFactory.getComponent('place', obj);
	            e = ComponentFactory.getComponent('edge', {src: t0.comp.shape.uuid,
					       dest: p.comp.shape.uuid,
					       direction: 't2p'});
	            lyt = layout.getClosestPosition(Math.floor(p.comp.shape.x/layout.cellW),
						    Math.floor(p.comp.shape.y/layout.cellH));
		    obj.x = lyt.x*layout.cellW;
		    obj.y = lyt.y*layout.cellH;
		    obj.type = 'automatic';
	            obj.name = 'auto'+i;

	            t = ComponentFactory.getComponent('transition', obj);

	            lyt = layout.getClosestPosition(Math.floor(p.comp.shape.x/layout.cellW),
						    Math.floor(p.comp.shape.y/layout.cellH));
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

	            lyt = layout.getClosestPosition(Math.floor(t.comp.shape.x/layout.cellW),
						    Math.floor(t.comp.shape.y/layout.cellH));
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
	                lyt = layout.getClosestPosition(Math.floor(p.comp.shape.x/layout.cellW),
							Math.floor(p.comp.shape.y/layout.cellH));
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

	        lyt = layout.getClosestPosition(Math.floor(target.comp.shape.x/layout.cellW),
		    				Math.floor(target.comp.shape.y/layout.cellH));
		obj.x = lyt.x*layout.cellW;
		obj.y = lyt.y*layout.cellH;
		obj.type = 'dummy';
		t = ComponentFactory.getComponent('transition', obj);

	        e = ComponentFactory.getComponent('edge', {src: target.comp.shape.uuid,
		    			   dest: t.comp.shape.uuid,
		    			   direction: 'p2t'});
	        e.comp.shape.redraw();

	        for(i=0; i<2; i++){
	            lyt = layout.getClosestPosition(Math.floor(t.comp.shape.x/layout.cellW),
		    				    Math.floor(t.comp.shape.y/layout.cellH));
		    obj.x = lyt.x*layout.cellW;
		    obj.y = lyt.y*layout.cellH;
		    obj.type = 'intermediary';

	            p = ComponentFactory.getComponent('place', obj);

	            e = ComponentFactory.getComponent('edge', {src: t.comp.shape.uuid,
		    			       dest: p.comp.shape.uuid,
		    			       direction: 't2p'});
	            e.comp.shape.redraw();

	            lyt = layout.getClosestPosition(Math.floor(p.comp.shape.x/layout.cellW),
		    				    Math.floor(p.comp.shape.y/layout.cellH));
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
	                lyt = layout.getClosestPosition(Math.floor(t2.comp.shape.x/layout.cellW),
		    					Math.floor(t2.comp.shape.y/layout.cellH));
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
	        ca[0].comp.cauuid = ca[1].comp.shape.uuid;

	        ca[1].comp.ca = ca[0].comp.name;
	        ca[1].comp.cauuid = ca[0].comp.shape.uuid;

	        e = ComponentFactory.getComponent('edge', {src: ca[0].comp.shape.uuid,
		            		   dest: ca[1].comp.shape.uuid,
		            		   direction: 'ca'});

	    },

	    while: (target)=>{
		var lyt, t, obj={};

	        lyt = layout.getClosestPosition(Math.floor(target.comp.shape.x/layout.cellW),
	                                        Math.floor(target.comp.shape.y/layout.cellH));

	        obj.x = lyt.x*layout.cellW;
	        obj.y = lyt.y*layout.cellH;
	        obj.type = 'dummy';
	        t = ComponentFactory.getComponent('transition', obj);

	        ComponentFactory.getComponent('edge', {src: target.comp.shape.uuid,
	                                   dest: t.comp.shape.uuid,
	                                   direction: 'p2t', cond:""});

	        ComponentFactory.getComponent('edge', {src: t.comp.shape.uuid,
	                                   dest: target.comp.shape.uuid,
	                                   direction: 't2p',
	                                   altpath: true});
	        
	        lyt = layout.getClosestPosition(Math.floor(target.comp.shape.x/layout.cellW),
	                                        Math.floor(target.comp.shape.y/layout.cellH));
	        
	        obj.x = lyt.x*layout.cellW;
	        obj.y = lyt.y*layout.cellH;
	        obj.type = 'dummy';
	        
	        t = ComponentFactory.getComponent('transition', obj);

	        ComponentFactory.getComponent('edge', {src: target.comp.shape.uuid,
	                                   dest: t.comp.shape.uuid,
	                                   direction: 'p2t', cond: ""});

	    },

	    multinstance: (target)=>{
	    },
	    
	    deletion: (target)=>{
			var edges = [];

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
		if(!Event.line)
		    return;

		console.log('completed type='+target.type+ ' x2='+ target.comp.shape.x);
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

		    ComponentFactory.getComponent('edge', {
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

	class PlaceComponent{
	    addAllEvents() {
			this.comp.shape.addEvent('mouseover', (e)=>{
				Event.onmouseover(this, placactions.list,
					this.comp.shape.x + this.comp.shape.r,
					this.comp.shape.y - this.comp.shape.r);
			});
			this.comp.shape.addEvent('mousedown', (e)=>{
				Event.onmousedown(this);
				layout.umark(Math.floor(this.comp.shape.x/layout.cellW),
					Math.floor(this.comp.shape.y/layout.cellH));
			});
			this.comp.shape.addEvent('mouseleave', (e)=>{
				Event.onmouseleave(this);
			});
			this.comp.shape.addEvent('mouseup', (e)=>{
				console.log("mouseupppppppppppppppppppppppppppppppp");
				Event.onmouseup(this);
			});
			this.comp.shape.addEvent('click', (e)=>{
				Event.onclick(this);
			});
	    }

	    centerComponent(comp){
			comp.x += layout.cellW/2;
			comp.y += layout.cellH/2;
		}
	    
	    constructor(props){
			var lyt = {x: 0, y :0};
			
			this.type = 'place';
			this.panelPos = -1;
		
			if(props.x >= 0 && props.y >= 0){
				var lyt = layout.fixPoint(props.x, props.y);

				props.x = lyt.x;
				props.y = lyt.y;
			}else {
				props.x = 0;
				props.y = 0;
			}

			this.centerComponent(props);
			this.comp = new Place(props);

			layout.mark(Math.floor(lyt.x/layout.cellW),
							Math.floor(lyt.y/layout.cellH),
							this.comp.shape.uuid);
		
			this.addAllEvents();
			this.actions = placactions;
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
	    
	    save(){
			var obj = {};
			Object.keys(this.comp).map((e)=>{
				if(e != 'shape' && e!= 'panelPos' && e!= 'state') {
					obj[e] = this.comp[e];

				}
				else if(e == 'shape'){
					obj.uuid = this.comp[e].uuid;
					obj.x = this.comp[e].x;
					obj.y = this.comp[e].y;
				}
			});
			return obj;
	    }

	    remove(){
			layout.umark(Math.floor(this.comp.shape.x/layout.cellW),
					Math.floor(this.comp.shape.y/layout.cellH));
			this.comp.shape.removeFromDOM();
				Register.clear(this.comp.shape.uuid);
	    }

	}

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
		var props = {}, tr, pos, posx, posy;

		props.type = 'intermediary';

		props.name = 'p_' + paya.id();
		console.log("transactions");
		console.log(props.name);


		posx = Math.floor(target.comp.shape.x/layout.cellW);
		posy = Math.floor(target.comp.shape.y/layout.cellH);
		if((pos=layout.getClosestPosition(posx, posy))){
		    props.x = pos.x*layout.cellW;
		    props.y = pos.y*layout.cellH;
		}else {
		    props.x = 0;
		    props.y = 0;

		    pos.x = 0;
		    pos.y = 0;
		}

		props.cWidth = layout.cellW;
		props.cheight = layout.cellH;

		
		tr = ComponentFactory.getComponent('place', props);
		ComponentFactory.getComponent('edge', {
		    direction: 't2p',
		    src: target.comp.shape.uuid,
		    dest: tr.comp.shape.uuid
		});
	    },

	    edge: (target)=>{
			Event.state = 'linking';
			Event.src = target;
			Event.line = paya.line(target.comp.shape.c_points[0].x,
						target.comp.shape.c_points[0].y, true, false);
			Event.line.vertex.map((vt)=>{ vt.setStyles({fill: "none"});});
	    },

	    andsplit: (target)=>{
		var i, lyt, p, t, cur, obj={};
		
		for(i=0; i<2; i++){
		    cur = target;

		    lyt = layout.getClosestPosition(Math.floor(cur.comp.shape.x/layout.cellW),
						    Math.floor(cur.comp.shape.y/layout.cellH));
			obj = {};
		    obj.x = lyt.x*layout.cellW;
		    obj.y = lyt.y*layout.cellH;
		    obj.type = 'intermediary';
		    p = ComponentFactory.getComponent('place', obj);
		    ComponentFactory.getComponent('edge', {src: cur.comp.shape.uuid,
					       dest: p.comp.shape.uuid,
					       direction: 't2p'});
	            cur = p;
		    lyt = layout.getClosestPosition(Math.floor(cur.comp.shape.x/layout.cellW),
						    Math.floor(cur.comp.shape.y/layout.cellH));
			obj = {};
		    obj.x = lyt.x*layout.cellW;
		    obj.y = lyt.y*layout.cellH;
		    obj.type = 'dummy';
		    t = ComponentFactory.getComponent('transition', obj);
		    ComponentFactory.getComponent('edge', {src: cur.comp.shape.uuid,
					       dest: t.comp.shape.uuid,
					       direction: 'p2t'});
	        }
	    },

	    dowhile: (target)=>{
		var lyt, p, t, obj={};

		lyt = layout.getClosestPosition(Math.floor(target.comp.shape.x/layout.cellW),
		    				Math.floor(target.comp.shape.y/layout.cellH));

		obj.x = lyt.x*layout.cellW;
		obj.y = lyt.y*layout.cellH;
		obj.type = 'intermediary';

		p = ComponentFactory.getComponent('place', obj);
		
	        ComponentFactory.getComponent('edge', {src: target.comp.shape.uuid,
		    			   dest: p.comp.shape.uuid,
		    			   direction: 't2p'});

	        ComponentFactory.getComponent('edge', {src: p.comp.shape.uuid,
		    			   dest: target.comp.shape.uuid,
		    					   direction: 'p2t',
							   cond: '',
							   altpath: true});
		
		lyt = layout.getClosestPosition(Math.floor(p.comp.shape.x/layout.cellW),
						Math.floor(p.comp.shape.y/layout.cellH));
		obj = {};
		obj.x = lyt.x*layout.cellW;
		obj.y = lyt.y*layout.cellH;
		obj.type = 'dummy';
		
		t = ComponentFactory.getComponent('transition', obj);

		ComponentFactory.getComponent('edge', {src: p.comp.shape.uuid,
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

		    ComponentFactory.getComponent('edge', {
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
	};

	class TransitionComponent{
	    addAllEvents() {
		this.comp.shape.addEvent('mouseover', (e)=>{
		    Event.onmouseover(this, transactions.list,
				      this.comp.shape.x + this.comp.shape.width,
				      this.comp.shape.y);
		});
		this.comp.shape.addEvent('mousedown', (e)=>{
		    Event.onmousedown(this);
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
		}else {
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
	        });

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
		    if(e != 'shape' && e!= 'panelPos' && e!= 'cWidth' && e != 'cheight' && e != 'state' && e != 'app') 
			obj[e] = this.comp[e];
		    else if(e == 'shape'){
			obj.uuid = this.comp[e].uuid;
			obj.x = this.comp[e].x;
			obj.y = this.comp[e].y;
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

	class Lasso{
	    constructor(props={}){

		if(props.x == undefined)
		    props.x = 0;

		if(props.y == undefined)
		    props.y = 0;

		if(props.width == undefined)
		    props.width = 0;
		
		if(props.height == undefined)
		    props.height = 0;

		
		this.selectedComp = [];
		this.panelPos = -1;

		this.shape = paya.rectangle(props.x, props.y, props.width, props.height);
		//this.shape.c_svg.setAttribute("stroke-width", "1px");
		this.shape.c_svg.setAttribute("stroke-dasharray", "4 1 2");
		this.shape.c_svg.setAttribute("stroke", "blue");
		this.shape.c_svg.setAttribute("fill-opacity", 0);
		this.shape.c_svg.setAttribute("rx", 5);
		this.shape.c_svg.setAttribute("ry", 5);
		
		this.shape.c_points.map((c)=>{
		    c.c_svg.setAttribute("fill", 'none');
		});

		this.shape.vertex.map((c)=>{
		    c.c_svg.setAttribute("fill", 'none');
		});
	    }

	    redraw(){
		this.shape.redraw();
	    }

	    
	    removeFromDOM(){
	    }
	}

	const lassoactions = {
	    list : [
		{name: "break", path: "src/images/break.png"},
		{name: "deletion", path: "src/images/delete.png"}
	    ],
	    break: (target)=>{
		target.remove();
	    },
	    
	    deletion: (target)=>{
		target.selectedComp.map((c)=>{
		    c.actions['deletion'](c);
		});
		target.remove();
	    }
	};

	class LassoComponent{
	    addAllEvents() {
		this.comp.shape.addEvent('mouseover', (e)=>{
		    Event.onmouseover(this, lassoactions.list,
				      this.comp.shape.x + this.comp.shape.width,
				      this.comp.shape.y);
		});
		this.comp.shape.addEvent('mousedown', (e)=>{
		    Event.onmousedown(this);
		    Event.state += '_lasso';
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
		});

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

	class ComponentFactory{
	    static getComponent(type, props){
			if (type == 'place')
				return new PlaceComponent(props);
			else if (type == 'edge')
				return new EdgeComponent(props);
			else if (type == 'transition')
				return new TransitionComponent(props);
			else if (type == 'lasso')
				return new LassoComponent(props);
			else
				return null;
			}
	}

	const config = {
	    svg_width: 2000,
	    svg_height: 2000,
	    end_start: "",
	    end_dest: "triangle",
	    cellW: 40,
	    cellH:  80
	};

	let PetriExports = {
	    Mode:'dev',

	    edge2SQLObject: (ed) =>{
		var obj = {}, src, dst;

		if(ed.type != 'edge')
		    return null;
		
		src = Register.find(ed.comp.src);
		dst = Register.find(ed.comp.dest);

		obj.direction = ed.comp.direction;


		/* to be checked */
		if(ed.comp.shape && ed.comp.shape.altpath)
		    obj.altpath = true;

		if(ed.comp.direction == 'ca'){
		    obj.pid = src.comp.name;
		    obj.tid = dst.comp.name;
		}else if(ed.comp.direction == 'p2t'){
		    obj.pid = src.comp.name;
		    obj.tid = dst.comp.name;

		    if(dst.comp.type == 'automatic')
			obj.type = 'auto';
		    else
			obj.type = dst.comp.type;
		    
		    if(dst.comp.type == 'manual')
			obj.role = 'dev' ;
		    else if(dst.comp.type == 'automatic')
			obj.app = dst.comp.app;

		    if(dst.comp.ca)
			obj.ca = dst.comp.ca;
		    
		    if(dst.comp.type == 'asub' || dst.comp.type == 'ssub')
			obj.count = dst.comp.count;
		    
		    if(ed.comp.cond)
			obj.cond = ed.comp.cond;


		    if(dst.comp.gate)
			obj.gate = dst.comp.gate;
		}else if(ed.comp.direction == 't2p'){
		    obj.pid = dst.comp.name;
		    obj.tid = src.comp.name;
		    if(dst.comp.type == 'end')
			obj.type = 'end';
		}

		return obj;
	    },
	    
	    toSQL: (name) =>{
			var data={edges:[]}, text='';
			
			Register.forEach( (c, ud)=> {
				if(c.type == 'place' && c.comp.type == 'start')
					ud.start = c.comp.name;
				else if(c.type == 'edge'){
					ud.edges.push(PetriExports.edge2SQLObject(c));
				}
			}, data);

			text += 'insert into workflow.processes(process) values(\'{"name":"'+name+
				'", "place":"'+ data.start +'"}\');';

			data.edges.forEach(e=>{
				text += '\ninsert into workflow.edges (id_processes, edge) values ((select id from workflow.processes where process->>\'name\'=\''+name+'\'),\''+JSON.stringify(e)+'\' );';
			});

			return text;
	    }
	};

	let paya$1;

	const init = (name)=>{
	    try{
	        paya$1 = aya.init(2000, 2000);
	        paya$1.grid(paya$1.svg);
	        paya$1.config.link.end_start = config.end_start;
	        paya$1.config.link.end_dest = config.end_dest;
	        paya$1.name = name;

	        paya$1.svg.addEventListener("mousemove", (e)=>{
	            if(Event.state == 'linking'){
	                Event.line.dest_x = e.clientX;
	                Event.line.dest_y = e.clientY;
	                Event.line.redraw();
	            }else if(Event.state == 'selection'){
	                Event.src.resize(e.clientX-Event.x, e.clientY-Event.y);
	                Event.x = e.clientX;
	                Event.y = e.clientY;
	            }else if(Event.state == 'moving_lasso'){
	                Event.src.move(e.clientX-Event.x, e.clientY-Event.y);
	                Event.x = e.clientX;
	                Event.y = e.clientY;
	            }
	        });
	        
	        paya$1.svg.addEventListener("mouseup", (e)=>{
	            // console.log('mouseUP SVG state='+Event.state);
	            if(Event.state == 'linking'){
	                Event.line.removeFromDOM();
	                Event.line = null;
	                Event.src = null;
	                Event.state = null;
	            }
	            else if(Event.state == 'selection'){
	                Event.src.lockComponent();
	                Event.src = null;
	                Event.state = null;
	            }
	        });
	    
	        paya$1.svg.addEventListener("mousedown", (e)=>{
	        // console.log('mouseDOWN SVG state='+Event.state);
	        if(Event.state != null)
	            return;
	    
	        Event.state = 'selection';
	    
	        Event.x = e.clientX;
	        Event.y = e.clientY;
	        Event.src = ComponentFactory.getComponent('lasso', {x: Event.x, y: Event.y});
	        });

	        layout.init( config.cellW,  config.cellH, config.svg_width,  config.svg_height);
	        globalThis.paya = paya$1;
	    }
	    catch(e){
	        console.error(e);
	    }
	};

	const _new = ()=>{
	    var cps = [];
	    Register.forEach(cp => {
	    if (cp.type != "edge")
	        cps.push(cp);
	    }, cps);

	    cps.map((c)=>{c.actions['deletion'](c);});
	    cps.length = 0;
	    
	    ComponentFactory.getComponent("place", { type: 'start', x: 100, y: 350 });
	};

	const load = (data)=>{
	    console.log("azer");
	    var cps = [];
	    Register.forEach(cp => {
	    if (cp.type != "edge")
	        cps.push(cp);
	    }, cps);

	    cps.map((c)=>{c.actions['deletion'](c);});
	    cps.length = 0;
	    
	    data.places.map((p)=>{
	        ComponentFactory.getComponent("place", p);
	    });
	    data.transitions.map((t)=>{
	        ComponentFactory.getComponent("transition", t);
	    });
	    data.edges.map((e)=>{
	        ComponentFactory.getComponent("edge", e);
	    });
	};

	const save_as_svg = ()=>{
	    const svg = document.getElementById("viewport").children[0];
	    saveFile(svg.outerHTML, paya$1.name + ".svg","image/svg+xml");
	};

	const save_as_sql = () =>{
	    var data = PetriExports.toSQL(paya$1.name);
	    saveFile(data, paya$1.name + '.sql');
	};

	// save should return an object
	const save_as_json = ()=>{
	    var data = { edges: [], places: [], transitions: [] };
	    Register.forEach(comp => {
	        data[comp.type + 's'].push(comp.save());
	    }, data);
	    saveFile(JSON.stringify(data), paya$1.name + ".json", 'text/plain'); 
	};

	const saveFile = (data, name, type)=>{
	    let blob = new Blob([data], { type });
	    if (typeof navigator.msSaveBlob == "function")
	        return navigator.msSaveBlob(blob, file_name);

	    var saver = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
	    var blobURL = saver.href = URL.createObjectURL(blob);
	    var body = document.body;

	    saver.download = name;

	    body.appendChild(saver);
	    saver.dispatchEvent(new MouseEvent("click"));
	    body.removeChild(saver);
	    URL.revokeObjectURL(blobURL);
	};

	const editor = () => {
	    // edge -> src, destn , direction, condition
	    var edge = () => {
	        return {
	        view(vnode) {
	            let node = vnode.attrs.node;
	            console.log(node);
	            return m(".flex.flex-col.p-4.w-full", [
	            m("", [
	                m("label.block.mb-3", "Src"),
	                m("input[disabled]", { value: node.comp.src, onchange: (e) => node.comp.src = e.target.value })
	            ]),
	            m("", [
	                m("label.block.mb-3", "Destination "),
	                m("input[disabled]", { value: node.comp.dest, onchange: (e) => node.comp.dest = e.target.value })
	            ]),
	            m("", [
	                m("label.block.mb-3", "Direction"),
	                m("input[disabled]", { value: node.comp.direction, onchange: (e) => node.comp.direction = e.target.value })
	            ]),
	            node.comp.cond != undefined && m("", [
	                m("label.block.mb-3", "Condition"),
	                m("input", { value: node.comp.cond, onchange: (e) => {node.comp.setCond(e.target.value);} })
	            ])
	            ])
	        }
	        }
	    };
	    // place -> uuid, type {start, end, intermediary}, name
	    var place = () => {
	        let types = ["start", "intermediary", "end"];
	        return {
	        view(vnode) {
	            var node = vnode.attrs.node;
	            return m(".flex.flex-col.p-4.w-full", [
	            m("", [
	                m("label.block.mb-3", "UUID"),
	                m("input", { value: node.comp.shape.uuid, disabled: true })
	            ]),
	            m("", [
	                m("label.block.mb-3", "Type"),
	                m("select",
	                {
	                    onchange: (e) => {
	                        node.comp.setType(e.target.value);
	                        node.comp.shape.redraw();
	                    }
	                },
	                types.map((type, idx) =>
	                    m("option", {
	                    key: idx,
	                    value: type,
	                    selected: node.comp.type == type,
	                    }, type))
	                )]),
	            m("", [
	                m("label.block.mb-3", "Name"),
	                m("input", { value: node.comp.name, onchange: (e) => node.comp.name = e.target.value })
	            ]),
	            ])
	        }
	        }
	    };
	    // transition -> uuid, type {auto, manual, clock , ssub, asub}, name, ca, gateway, role, resource id, resource name, 
	    var transition = {
	        view(vnode) {
	            var node = vnode.attrs.node;
	            // console.log(node);
	            const types = ["dummy","automatic", "event", "manual", "clock", "ssub", "asub"];
	            const rnames = ["get", "put", "post", "delete"];
	            const gateways = ["and_join", "xor_join"];
	            return m(".grid.grid-cols-2", [
			m(".p-2.border-r",
			  m(".flex.flex-col.px-4", [
	                      m("", [
				  m("label.block.mb-3", "UUID"),
				  m("input", { value: node.comp.shape.uuid, disabled: true })
	                      ]),
	                      m("", [
				  m("label.block.mb-3", "type"),
				  m("select",
				    {
					onchange: (e) => {
					    node.setType(e.target.value);
					}
				    },
				    types.map((type, idx) =>
					m("option", {
					    key: idx,
					    value: type,
					    selected: node.comp.type == type,
					}, type))
				   ),
	                      ]),
	                      node.comp.ca && m("", [
				  m("label.block.mb-3", "Cancel activity"),
				  m("input", { value: node.comp.ca, disabled: true})
	                      ]),
	                      node.comp.type == "automatic" && m("", [
				  m("label.block.mb-3", "Resource name"),
				  m("select",
				    {
					onchange: (e) => {
					    node.comp.app.name = e.target.value;
					}
				    },
				    rnames.map((name, idx) =>
					m("option", {
					    key: idx,
					    value: name,
					    selected: node.comp.app.name == name,
					}, name))
				   )]),
			  ]),
			 ),
			m(".p-2", m(".flex.flex-col.px-4", [
			    m("", [
				m("label.block.mb-3", "Name"),
				m("input", {
				    value: node.comp.name,
				    onchange: (e) => {node.comp.setName(e.target.value);}
				})
			    ]),
			    m("", [
				m("label.block.mb-3", "Gateway"),
				m("select",
				  {
				      onchange: (e) => {
					  node.comp.setGate(e.target.value);
				      }
				  },
				  gateways.map((gateway, idx) =>
				      m("option", {
					  key: idx,
					  value: gateway,
					  selected: node.comp.gate == gateway || (gateway == "and_join" && node.comp.gate == undefined),
				      }, gateway))
				 ),
				node.comp.type == "manual" && m("", [
				    m("label.block.mb-3", "Role"),
				    m("input", { value: node.comp.role, onchange: (e) => node.comp.role = e.target.value })
				]),
			    ]),
			])),
			node.comp.type == "automatic" && m(".px-4.col-span-2", [
			    m("label.block.mb-3", "Resource uri"),
			    m("input.border", { value: node.comp.app.path, onchange: (e) => node.comp.app.path = e.target.value })
			]),
			node.comp.type == "automatic" && m(".px-4.col-span-2.overflow-y-auto", [
	                    m("label.block.mb-3", "Resource parameters"),
	                    m("textarea.border.w-full", { rows: 20,value: node.comp.app.in, onchange: (e) => node.comp.app.in = e.target.value })
	                ]),
	            ])
	        }
	    };
	    
	    var config = {
	    
	        view(vnode) {
	        const node = vnode.attrs.config;
	        return m(".fixed.border.border-1.right-0.top-0.bottom-0.bg-white.flex.flex-col.overflow-y-auto",
	            { style: "min-width:25%; box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 12px;}" }, [
	            m(".flex.justify-between.border-b.px-4.py-2",
	            m("label.text-2xl.font-medium", "Config"),
	            m("button", {
	                onclick: () => {
	                    Event.config.node = null;
	                }
	            }, [
	                m("svg[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round'][color='currentColor']",
	                { class: "text-gray-400 hover:text-gray-600 active:text-gray-800" },
	                [
	                    m("line[x1='18'][y1='6'][x2='6'][y2='18']"),
	                    m("line[x1='6'][y1='6'][x2='18'][y2='18']")
	                ]
	                )
	            ])),
	            m(".flex-1.flex.justify-center.flex-col", [
	            m("", [
	                m(".flex.items-center.justify-between.mx-6.m-2", [
	                m("label.text-xl.font-medium", node.type),
	                m("button.btn.rounded-xl.w-fit.self-end", {
	                    onclick: () => {
	                        // vnode.attrs.config.node.remove();
	                        vnode.attrs.config.actions['deletion'](vnode.attrs.config);
	                        vnode.attrs.config = null;
	    
	                    }
	                }, 
	                    m("svg[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round'][color='currentColor']",
	                        { class: "text-red-300 hover:text-red-500 active:text-red-600 focus:test-red-400" }, 
	                        [
	                            m("path[d='M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z']"),
	                            m("line[x1='18'][y1='9'][x2='12'][y2='15']"),
	                            m("line[x1='12'][y1='9'][x2='18'][y2='15']")
	                        ]
	                    )
	                ),
	                ]), m("hr.mx-6.border-black.border-1")]),
	            [
	                node.type == "place" && m(place, { node }),
	                node.type == "edge" && m(edge, { node }),
	                node.type == "transition" && m(transition, { node }),
	            ]
	            // m(".px-8", m(vnode.attrs.mode.configView)),
	            ])
	        ])
	        }
	    };
	    return {
	        oncreate(vnode) {
	            vnode.dom.append(paya$1.svg);
	        },
	        view: (vnode) => {
	            return m("#viewport",{
	            onclick(){}
	            }, [
	            Event.config.node && m(config, { config: Event.config.node})
	            ])
	        }
	    }
	};

	exports._new = _new;
	exports.editor = editor;
	exports.init = init;
	exports.load = load;
	exports.saveFile = saveFile;
	exports.save_as_json = save_as_json;
	exports.save_as_sql = save_as_sql;
	exports.save_as_svg = save_as_svg;

}));
