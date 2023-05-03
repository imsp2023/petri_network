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

	this.shape.shape.c_svg.setAttribute("fill", color);
	this.shape.shape.c_svg.setAttribute("stroke-width", "2px");
	this.shape.shape.vertex.map((v)=>{
	    v.c_svg.setAttribute("fill", 'none');
	});
	this.shape.shape.c_points.map((c)=>{
	    c.c_svg.setAttribute("fill", 'none');
	});


	if(this.type == 'asub' || this.type == 'ssub'){
	    var child = aya.Rectangle(
		this.shape.shape.x,
		this.shape.shape.y,
		20, 50);
	    this.shape.addChild(child, {x: 5, y: 5}, null);
	    child.setStyles({fill: "none"});
	}else if(this.type == 'clock' || this.type == 'event' ||
                 this.type == 'manual' || this.type == 'automatic'){
	    this.shape.addChild(aya.Image(
		this.shape.shape.x,
		this.shape.shape.y,
		20, 20,
		this.type=='clock' ? 'src/images/clock2.png':
		    this.type=='event' ? 'src/images/envelope.png' :
		    this.type=='manual' ? 'src/images/user1.png':
                    'src/images/service2.png'  ), {x: 0, y: 0}, null);
	}

	if(this.type == 'asub' ||this.type == 'ssub' ||
           this.type == 'automatic' ||this.type == 'manual'){
	    this.shape.addChild(
		aya.Text(this.shape.shape.x - 60,
			 this.shape.shape.y - 10, this.name, 0, this.shape.shape.x + this.shape.shape.width + 60, this.shape.shape.y - 10),
		{x: 0, y: 0}, null);
	}

    }

    constructor(props={type: 'dummy'}){
	var state = '';
	var dim = {};

	if(props && typeof props != 'object')
	    throw new Error('wrong parameter');

	if(props.name && !props.type){
	    props.type = "dummy";
	}else if(props.type == "dummy" || props.type == "clock"){
	    if(!props.name)
		props.name = props.type;
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

	this.shape = aya.Component("rectangle", {x:props.x, y:props.y, width: dim.width, height: dim.height});
	if(this.shape && this.shape.type != 'rectangle')
	    throw new Error("the shape isn't a reectangle");

	this.completeShape();


    }

    
    setGate(gate){
	var index;
	if(this.gate != 'xor_join' && gate == 'xor_join'){
	    this.shape.addChild(aya.Polyline([this.shape.shape.x, this.shape.shape.y,
					      this.shape.shape.x-5, this.shape.shape.y,
					      this.shape.shape.x-5, this.shape.shape.y+this.shape.shape.height,
					      this.shape.shape.x, this.shape.shape.y+this.shape.shape.height,
					      this.shape.shape.x-5, this.shape.shape.y+this.shape.shape.height/2,
					      this.shape.shape.x, this.shape.shape.y]), {x: 0, y: 0}, null);
	    this.shape.shape.redraw();
	}else if(this.gate == 'xor_join' && gate != 'xor_join'){
	    if(this.type == 'manual' || this.type == 'automatic' ||
	       this.type == 'asub' || this.type == 'ssub')
		index = 2;
	    else if(this.type == 'dummy')
		index = 0;
	    else
		index = 1;x
	    this.shape.shape.children[index].child.removeFromDOM();
	    this.shape.shape.children.length--;
	}
	this.gate = gate;
    }

    setName(name){
        this.name = name;
        if(this.ca)
            Register.find(this.cauuid).comp.ca = name;
	if (this.shape.shape.children.length == 2)
	    this.shape.shape.children[1].child.text = name;
        this.shape.shape.redraw();
    }
    
    setType(type){
        var dim;
        if(this.type == type)
            return;

        this.type = type;
        this.app = {};
        this.shape.shape.children.map(({child})=>{
            child.removeFromDOM();
        })

        this.shape.shape.children.length = 0;
        dim = this.getRectDimension();

        this.shape.shape.width = dim.width;
        this.shape.shape.height = dim.height;

        this.completeShape();
	this.shape.shape.redraw();
    }

    redraw(){
	this.shape.shape.redraw();
    }
    
    removeFromDOM(){
    }
}
