//import { abstractComponent } from "../abstractions/abstractComponent";

class Place{
    static Radius = 20;
    static IStroke = '1px';
    static SStroke = '2px';
    static EStroke = '2px';
    static IColor = 'black';
    static SColor = 'green';
    static EColor = 'red';
    
    
    constructor(props = {}){
	var color = Place.IColor;
	var pixel = Place.IStroke;
	var x, y;

	this.panelPos = -1;
	this.state = '';
	
	Object.keys(props).map((e)=>{
	    if(e != 'x' && e != 'y')
		this[e] = props[e];
	});

	if(this.type == undefined)
	    this.type = "intermediary";
	
	if(!this.name)
	    this.name = 'p_+aya.uuid.generate()';
	
	if (this.type == "start"){
	    color = Place.SColor;
	    pixel = Place.SStroke;;
	}else if (this.type == "end"){
	    color = Place.EColor;
	    pixel = Place.EStroke;
	}
	else if (this.type != "intermediary")
	    throw new Error("wrong parameter");

	this.shape = aya.Component("circle",
				   {x:props.x, y: props.y,
				    r: Place.Radius});
	if(this.shape && this.shape.type != 'circle')
	    throw new Error("the shape isn't a circle");

	this.shape.shape.removeBoxFromDOM();

	this.shape.shape.c_svg.setAttribute("fill", "white");
	this.shape.shape.c_svg.setAttribute("stroke-width", pixel);
	this.shape.shape.c_svg.setAttribute("stroke", color);

	this.shape.shape.c_points.map((pt) => {
	    pt.c_svg.setAttribute("fill", 'none');
	});
	this.shape.shape.vertex.map((vt) => {
	    vt.c_svg.setAttribute("fill", 'none');
	});
    }

    redraw(){
	this.shape.shape.redraw();
    }
    
    setType(type){
	var color = Place.IColor;
	var pixel = Place.IStroke;

	if(this.type == type)
            return;

	if (this.type == "start"){
	    color = Place.SColor;
	    pixel = Place.IStroke;
	}
	else if (this.type == "end"){
	    color = Place.EColor;
	    pixel = Place.EStroke;
	}

	this.shape.shape.c_points.map((pt) => {
	    pt.c_svg.setAttribute("fill", color);
	});
	this.shape.shape.c_svg.setAttribute("stroke-width", pixel);
	this.shape.shape.c_svg.setAttribute("stroke", color);
    }
    
}
