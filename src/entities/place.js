//import { abstractComponent } from "../abstractions/abstractComponent";

class Place{
    static actions = [
	
	{name: "transition", path: "src/images/transition2.png"},
	{name: "edge", path: "src/images/edge2.png"},
	{name: "deletion", path: "src/images/delete.png"}
    ];
    static ImgSZ = 20;
    static Radius = 20;
    static IStroke = '1px';
    static SStroke = '2px';
    static EStroke = '2px';
    static IColor = 'black';
    static SColor = 'green';
    static EColor = 'red';
    
    static path2name(path){
	var a;
	for(a=0; a < Place.actions.length; a++){
	    if(path == Place.actions[a].path){
		return Place.actions[a].name;
	    }
	}
	return '';
    }
    
    constructor(props = {}){
	var color = Place.IColor;
	var pixel = Place.IStroke;
	var x, y;
	
	this.type = !props.type ? "intermediary" :  props.type;
	this.name = !props.name ? "intermediary" /* to be generated */ :  props.name;
	
	if (this.type == "start"){
	    color = Place.SColor;
	    pixel = Place.SStroke;;
	}else if (this.type == "end"){
	    color = Place.EColor;
	    pixel = Place.EStroke;
	}
	else if (this.type != "intermediary")
	    throw new Error("wrong parameter");

	if(!props.x && !props.y){
	    props.x = 0;
	    props.y = 0;
	}

	if(props.cWidth && props.cHeight){
	    props.x += props.cWidth/2;
	    props.y += props.cHeight/2;
	}
	console.log('place x='+props.x+' y='+props.y);	
	this.shape = aya.Component("circle",
				   {x:props.x, y: props.y,
				    r: Place.Radius});
	if(this.shape && this.shape.type != 'circle')
	    throw new Error("the shape isn't a circle");

	this.shape.form.removeBoxFromDOM();
	
	this.shape.form.c_svg.setAttribute("fill", "white");
	this.shape.form.c_svg.setAttribute("stroke-width", pixel);
	this.shape.form.c_svg.setAttribute("stroke", color);

	this.shape.form.c_points.map((pt) => {
	    pt.c_svg.setAttribute("fill", 'none');
	});
	this.shape.form.vertex.map((vt) => {
	    vt.c_svg.setAttribute("fill", 'none');
	});

	this.shape.form.c_svg.addEventListener("mouseover", () => {
	    if(this.panel == null)
		this.addPanel();
	    this.state = 'place';
	});
	this.shape.form.c_svg.addEventListener("mouseleave", ()=> {
	    this.state = '';
	});

	this.shape.form.c_svg.addEventListener("mouseup", (e)=>{
	    var target;
	    if((target=Register.find(this.shape.uuid)))
		target.edgeCompleted(this.shape.uuid);
	});
    }

    setType(type){
	var color = "black";
	var pixel = "3px";

	this.type = !type ? "intermediary" :  type;

	if (this.type == "start"){
	    color = "green";
	    pixel = "6px";
	}
	else if (this.type == "end"){
	    color = "red";
	    pixel = "6px";
	}
	else if (this.type != "intermediary")
	    throw new Error("this type is not correct");

	this.shape.form.c_points.map((pt) => {
	    pt.c_svg.setAttribute("fill", color);
	});
	this.shape.form.c_svg.setAttribute("stroke-width", pixel);
	this.shape.form.c_svg.setAttribute("stroke", color);
    }

    addPanel(){
	var img;
	var x = this.shape.form.x + this.shape.form.r;
	var y = this.shape.form.y - this.shape.form.r;
	var wid, hei, cp;

	wid = 2*Place.ImgSZ+2*5/*spacing*/+10;
	hei = Math.floor(Place.actions.length/2);
	if(Place.actions.length % 2)
	    hei++;
	hei *= (Place.ImgSZ+5);

	this.panel = aya.Rectangle(x,y, wid, hei);
	this.shape.addChild(this.panel, {x: -10, y: 0}, null, true);

	this.panel.c_svg.setAttribute("stroke-width", "0px");
	this.panel.c_svg.setAttribute("opacity", 0);
	
	for (var i = 0, j = 0; i < Place.actions.length; i++, j++){
	    if (i && !(i%2)){
		j = 0;
		y += Place.ImgSZ+5/* spacing */;
	    }

	    img = aya.Image(x+Place.ImgSZ * j, y,
			    Place.ImgSZ, Place.ImgSZ,
			    Place.actions[i].path);
	    this.shape.addChild(img, {x: 5, y: 0}, null, true);
	    
	    img.c_svg.addEventListener("mouseover", (e)=>{
		this.state = 'image';
	    });
	    img.c_svg.addEventListener("mouseleave", (e)=>{
		this.state = '';
	    });
	    img.c_svg.addEventListener("mousedown", (e)=>{
		if((cp=Register.find(this.shape.uuid)))
		    cp.addConnector(Place.path2name(e.target.href.baseVal));
	    });
	}

	this.panel.c_svg.addEventListener("mouseover", (e)=>{
	    this.state = 'panel';
	});
	this.panel.c_svg.addEventListener("mouseleave", (e)=>{
	    this.state = '';
	});
	
	this.shape.form.svg.addEventListener("mouseover", () => {
	    if (this.state == '' && this.panel)
		this.removePanel();
	});
    }

    removePanel(){
	this.shape.form.children.map(({child}) => {
	    child.removeFromDOM();
	});

	this.shape.form.children = [];
	
	this.shape.form.svg.removeEventListener("mouseover", () => {});
	this.panel = null;
	this.state = '';
	
    }
}
