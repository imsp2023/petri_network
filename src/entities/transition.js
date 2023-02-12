class Transition{
    constructor(name=null, type=null){
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
	    console.log('automatic');
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
	this.shape = aya.Component("rectangle", {x:100, y: 100, width: width, height: height});
	if(this.shape && this.shape.type != 'rectangle')
	    throw new Error("the shape isn't a reectangle");

	if(type == 'dummy')
	    color = 'black';
	    
	this.shape.form.c_svg.setAttribute("fill", color);
	
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
