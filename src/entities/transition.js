const t_actions = [
    {name: "place", path: "src/images/place.png"},
    {name: "edge", path: "src/images/edge2.png"},
    {name: "deletion", path: "src/images/delete.png"}
];
const ImSZ = 20;

class Transition{
    constructor(name=null, type=null){
	var state = '';
	var color = 'white';
	var width = 20;
	var height = 50;
	
	if(type==null && name==null){
	    type = "dummy";
	    name = "dummy";
	}else if(name && type==null){
	    type = "dummy";
	}else if(type == "dummy" || type == "clock"){
	    if(!name)
		name = type;
	    if(type == 'clock'){
		height = 40;
	    }
	}else if(type == "manual" || type == "automatic" ||
		 type == "asub" || type == "ssub" || type == "event"){
	    if(name == null)
		throw new Error("manual transition requires a name");
	    if(type == "asub" || type == "ssub"){
		width = 30;
		height = 60;
	    }else if(type == "event"){
		height = 40;
	    }else if(type == "manual"){
		height = 40;
	    }
	}else
	    throw new Error("wrong transition type");
	
	this.type = type;
	this.name = name;
	this.shape = aya.Component("rectangle", {x:0, y:0, width: width, height: height});
	if(this.shape && this.shape.type != 'rectangle')
	    throw new Error("the shape isn't a reectangle");

	if(type == 'dummy')
	    color = 'black';
	    
	this.shape.form.c_svg.setAttribute("fill", color);
	this.shape.form.c_svg.setAttribute("stroke-width", "2px");
	this.shape.form.vertex = [];
	this.shape.form.c_points = [];
	
	if(type == 'asub' || type == 'ssub'){
	    this.shape.addChild(aya.Rectangle(
		this.shape.form.x,
		this.shape.form.y,
		20, 50), {x: 5, y: 5}, null);
	}else if(type == 'clock' || type == 'event' || type == 'manual'){
	    this.shape.addChild(aya.Image(
		this.shape.form.x,
		this.shape.form.y,
		20, 20,
		type=='clock' ? 'src/images/clock.png':
		    type=='event' ? 'src/images/clock.png' :
		    'src/images/arrow.png'), {x: 0, y: -25}, null);
	}

	if(type != 'dummy'){
	    if(this.shape.form.children.length)
		this.shape.addChild(
		    aya.Text(this.shape.form.children[0].child.x,
			     this.shape.form.children[0].child.y, name),
		    {x: 0, y: -10}, null);
	    else
		this.shape.addChild(
		    aya.Text(this.shape.form.x,
			     this.shape.form.y, name),
		    {x: 0, y: -10}, null);
	}

	this.shape.form.c_svg.addEventListener("mouseover", (e)=>{
	    if(this.panelPos==undefined || this.panelPos < 0)
	    	this.addPanel();
	    
	    this.state = 'transition';
	});

	this.shape.form.c_svg.addEventListener("mouseleave", (e)=>{
	    this.state = '';
	});
    }
    

    addPanel(){
	var x = this.shape.form.x + this.shape.form.width;
	var y = this.shape.form.y;
	var wid, hei, panel, img;

	wid = 2*ImSZ+2*5/*spacing*/;
	hei = Math.floor(t_actions.length/2);
	if(t_actions.length % 2)
	    hei++;
	
	hei = hei*ImSZ+ hei*5;
	panel = aya.Rectangle(x, y, wid, hei);

	this.shape.addChild(panel, {x: -2, y: 0}, null, true);
	panel.c_svg.setAttribute("stroke-width", "0px");
	this.panelPos = this.shape.form.children.length-1;
	
	for (var i = 0, j = 0; i < t_actions.length; i++, j++){
	    if (i && !(i%2)){
		j = 0;
		y += ImSZ+5/* spacing */;
	    }

	    img = aya.Image(x +ImSZ * j, y, ImSZ, ImSZ, t_actions[i].path);
	    this.shape.addChild(img, {x: 5, y: 0}, null, true);
	    img.c_svg.addEventListener("mouseover", (e)=>{
		this.state = 'panel';
	    });
	    img.c_svg.addEventListener("mouseleave", (e)=>{
		this.state = '';
	    });
	}
	
	panel.c_svg.addEventListener("mouseover", (e)=>{
	    this.state = 'panel';
	});
	panel.c_svg.addEventListener("mouseleave", (e)=>{
	    this.state = '';
	});
	
	this.shape.form.svg.addEventListener("mouseover", () => {
	    if (this.state == '' && this.panelPos >= 0)
		this.closePanel();
	});
    }

    closePanel(){
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
    
    createShape(){
    }
    
    removeFromDOM(){
    }
    
    addConnector(component){
    }
}
