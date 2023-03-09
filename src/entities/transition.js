const t_actions = [
    {name: "place", path: "src/images/place.png"},
    {name: "edge", path: "src/images/edge2.png"},
    {name: "deletion", path: "src/images/delete.png"}
];
const ImSZ = 20;

class Transition{
    static path2name(path){
	var a;
	for(a=0; a < t_actions.length; a++){
	    if(path == t_actions[a].path){
		return t_actions[a].name;
	    }
	}
	return '';
    }
    constructor(props){
	var state = '';
	var color = 'white';
	var width = 20;
	var height = 50;

	if(props && typeof props != 'object')
	    throw new Error('wrong parameter');
	
	if(!props){
	    props = {};
	    props.type = "dummy";
	    props.name = "dummy";
	}else if(props.name && !props.type){
	    props.type = "dummy";
	}else if(props.type == "dummy" || props.type == "clock"){
	    if(!props.name)
		props.name = props.type;
	    if(props.type == 'clock'){
		height = 40;
	    }
	}else if(props.type == "manual" || props.type == "automatic" ||
		 props.type == "asub" || props.type == "ssub" || props.type == "event"){
	    if(!props.name)
		throw new Error("manual transition requires a name");
	    if(props.type == "asub" || props.type == "ssub"){
		width = 30;
		height = 60;
	    }else if(props.type == "event"){
		height = 40;
	    }else if(props.type == "manual"){
		height = 40;
	    }
	}else
	    throw new Error("wrong transition type");

	this.state = '';
	this.type = props.type;
	this.name = props.name;

	if(!props.x && !props.y){
	    props.x = 0;
	    props.y = 0;
	}

	if(props.cWidth && props.cHeight){
	    props.x += (props.cWidth-width)/2;
	    props.y += (props.cHeight-height)/2;
	}
	
	this.shape = aya.Component("rectangle", {x:props.x, y:props.y, width: width, height: height});
	if(this.shape && this.shape.type != 'rectangle')
	    throw new Error("the shape isn't a reectangle");

	if(props.type == 'dummy')
	    color = 'black';
	    
	this.shape.form.c_svg.setAttribute("fill", color);
	this.shape.form.c_svg.setAttribute("stroke-width", "2px");
	this.shape.form.vertex.map((v)=>{
	    v.c_svg.setAttribute("fill", 'none');
	});
	this.shape.form.c_points.map((c)=>{
	    c.c_svg.setAttribute("fill", 'none');
	});
	
	
	if(props.type == 'asub' || props.type == 'ssub'){
	    this.shape.addChild(aya.Rectangle(
		this.shape.form.x,
		this.shape.form.y,
		20, 50), {x: 5, y: 5}, null);
	}else if(props.type == 'clock' || props.type == 'event' || props.type == 'manual'){
	    this.shape.addChild(aya.Image(
		this.shape.form.x,
		this.shape.form.y,
		20, 20,
		props.type=='clock' ? 'src/images/clock.png':
		    props.type=='event' ? 'src/images/clock.png' :
		    'src/images/arrow.png'), {x: 0, y: -25}, null);
	}

	if(props.type != 'dummy'){
	    if(this.shape.form.children.length)
		this.shape.addChild(
		    aya.Text(this.shape.form.children[0].child.x,
			     this.shape.form.children[0].child.y, props.name),
		    {x: 0, y: -10}, null);
	    else
		this.shape.addChild(
		    aya.Text(this.shape.form.x,
			     this.shape.form.y, props.name),
		    {x: 0, y: -10}, null);
	}

	this.shape.form.c_svg.addEventListener("mouseover", (e)=>{
	    console.log('mouseover state='+this.state+ ' pos='+this.panelPos);
	    if(this.state == 'moving')
		return;
	    else if(this.panelPos==undefined || this.panelPos < 0)
	    	this.addPanel();
	    this.state = 'transition';
	});

	this.shape.form.c_svg.addEventListener("mouseleave", (e)=>{
	    console.log('mouseleave transition');
	    if(this.state == 'moving')
		return;
	    this.state = '';
	});

	this.shape.form.c_svg.addEventListener("mousedown", (e)=>{
	    var target;
	    console.log('mousedown');
	    this.removePanel();
	    this.state = 'moving';

	    if((target=Register.find(this.shape.uuid)))
		target.onMouseDown();
	    
	});
	
	this.shape.form.c_svg.addEventListener("mouseup", (e)=>{
	    var target;
	    
	    if(this.state == 'moving')
		this.state = '';
	    
	    if((target=Register.find(this.shape.uuid)))
		target.onMouseUp(this.shape.uuid);
	});

	this.shape.form.c_svg.addEventListener("mousemove", (e)=>{
		// this.shape.form.x = e.clientX;
		// this.shape.form.y = e.clientY;
	});
    }
    
    addPanel(){
	var x = this.shape.form.x + this.shape.form.width;
	var y = this.shape.form.y;
	var wid, hei, panel, img, cp;

	wid = 2*ImSZ+2*5/*spacing*/;
	hei = Math.floor(t_actions.length/2);
	if(t_actions.length % 2)
	    hei++;
	
	hei = hei*ImSZ+ hei*5;
	panel = aya.Rectangle(x, y, wid, hei);
	
	this.shape.addChild(panel, {x: -2, y: 0}, null, true);
	panel.c_svg.setAttribute("stroke-width", "0px");
	panel.c_svg.setAttribute("opacity", 0);
	
	this.panelPos = this.shape.form.children.length-1;
	
	for (var i = 0, j = 0; i < t_actions.length; i++, j++){
	    if (i && !(i%2)){
		j = 0;
		y += ImSZ+5/* spacing */;
	    }
	    
	    img = aya.Image(x +ImSZ * j, y, ImSZ, ImSZ,
			    t_actions[i].path, t_actions[i].name);
	    this.shape.addChild(img, {x: 5, y: 0}, null, true);
	    img.c_svg.addEventListener("mouseover", (e)=>{
		this.state = 'panel';
	    });
	    img.c_svg.addEventListener("mouseleave", (e)=>{
		this.state = '';
	    });
	    img.c_svg.addEventListener("mousedown", (e)=>{
		if((cp=Register.find(this.shape.uuid)))
		    cp.addConnector(Transition.path2name(e.target.href.baseVal));
	    });
	}
	
	panel.c_svg.addEventListener("mouseover", (e)=>{
	    console.log('mouseover panel');
	    this.state = 'panel';
	});
	panel.c_svg.addEventListener("mouseleave", (e)=>{
	    this.state = '';
	});
	
	this.shape.form.svg.addEventListener("mouseover", () => {
	    console.log('mouseover svg');
	    if (this.state == '' && this.panelPos >= 0)
		this.removePanel();
	});
    }

    removePanel(){
	var i;
	for(i = this.panelPos; i <= this.panelPos+t_actions.length; i++)
	    this.shape.form.children[i].child.removeFromDOM();
	this.shape.form.children.splice(this.panelPos, 1+t_actions.length);
	
	this.panelPos = -1;
	this.shape.form.svg.removeEventListener("mouseover", () => {});
    }
    
    setGate(gate){
	var index;
	if(this.gate != 'xor_join' && gate == 'xor_join'){
	    this.shape.addChild(aya.Polyline([this.shape.form.x, this.shape.form.y,
					      this.shape.form.x-5, this.shape.form.y,
					      this.shape.form.x-5, this.shape.form.y+this.shape.form.height,
					      this.shape.form.x, this.shape.form.y+this.shape.form.height,
					      this.shape.form.x-5, this.shape.form.y+this.shape.form.height/2,
					      this.shape.form.x, this.shape.form.y]), {x: 0, y: 0}, null);
	    this.shape.form.redraw();
	}else if(gate != 'xor_join'){
	    if(this.type == 'clock' || this.type == 'event' || this.type == 'manual' ||
	       this.type == 'asub' || this.type == 'ssub')
		index = 2;
	    else if(this.type == 'dummy')
		index = 0;
	    else
		index = 1;
	    this.shape.form.children[index].child.removeFromDOM();
	    this.shape.form.children.length--;
	}
	this.gate = gate;
    }
    
    removeFromDOM(){
    }
}
