//import { abstractComponent } from "../abstractions/abstractComponent";

class Place{
    static actions = [

	    {name: "transition", path: "src/images/transition3.png"},
	    {name: "edge", path: "src/images/edge2.png"},
	    {name: "xorsplit", path: "src/images/xorsplit.png"},
	    {name: "multichoice", path: "src/images/inclusive.png"},
	    {name: "deferredchoice", path: "src/images/deferredchoice.png"},
	    {name: "while", path: "src/images/loop2.png"},
	    {name: "multinstance", path: "src/images/multinstance.png"},
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
    
    static centerComponent(comp, cellW, cellH){
	    comp.x += cellW/2
	    comp.y += cellH/2;
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
	        Place.centerComponent(props, props.cWidth, props.cHeight);
	    }

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

	    this.shape.shape.c_svg.addEventListener("mouseover", () => {

	        if(this.state == 'moving')
		        return;

	        if(this.panel == null)
		        this.addPanel();
	        this.state = 'place';
	    });
	    this.shape.shape.c_svg.addEventListener("mouseleave", ()=> {
	        if(this.state == 'moving')
		        return;

	        this.state = '';
	    });

	    this.shape.shape.c_svg.addEventListener("mousedown", (e)=>{
	        var target;
	        console.log('mousedown place');
	        this.removePanel();
	        this.state = 'moving';

	        if((target=Register.find(this.shape.uuid)))
		        target.onMouseDown();
	    });

	    this.shape.shape.c_svg.addEventListener("mouseup", (e)=>{
	        var target;

	        if(this.state == 'moving')
		        this.state = '';

	        if((target=Register.find(this.shape.uuid)))
		        target.onMouseUp();
	    });

        this.shape.shape.c_svg.addEventListener("click", (e)=>{
	        var target;

	        if((target=Register.find(this.shape.uuid)))
		        target.onclick();
	    });
    }

    setType(type){
	    var color = Place.IColor;
	    var pixel = Place.IStroke;

	    this.type = !type ? "intermediary" :  type;

	    if (this.type == "start"){
	        color = Place.SColor;
	        pixel = Place.IStroke;
	    }
	    else if (this.type == "end"){
	        color = Place.EColor;
	        pixel = Place.EStroke;
	    }
	    else if (this.type != "intermediary")
	        throw new Error("this type is not correct");

	    this.shape.shape.c_points.map((pt) => {
	        pt.c_svg.setAttribute("fill", color);
	    });
	    this.shape.shape.c_svg.setAttribute("stroke-width", pixel);
	    this.shape.shape.c_svg.setAttribute("stroke", color);
    }

    redraw(cwidth, cheight){
	    var dx = this.shape.shape.x, dy = this.shape.shape.y;
	    Place.centerComponent(this.shape.shape, cwidth, cheight);
	    dx = this.shape.shape.x - dx;
	    dy = this.shape.shape.y - dy;
	    this.shape.shape.children.map(({child})=>{
		    child.shift(dx, dy);
	    });
	    this.shape.shape.redraw();
    }
    
    addPanel(){
	    var img;
	    var x = this.shape.shape.x + this.shape.shape.r;
	    var y = this.shape.shape.y - this.shape.shape.r;
	    var wid, hei, cp;

	    wid = 3*Place.ImgSZ+2*5/*spacing*/+10;
	    hei = Math.floor(Place.actions.length/2);
	    if(Place.actions.length % 3)
	        hei++;
	    hei *= (Place.ImgSZ+5);

	    this.panel = aya.Rectangle(x,y, wid, hei);
	    this.shape.addChild(this.panel, {x: -10, y: 0}, null, true);

	    this.panel.c_svg.setAttribute("stroke-width", "0px");
	    this.panel.c_svg.setAttribute("opacity", 0);

	    for (var i = 0, j = 0; i < Place.actions.length; i++, j++){
	        if (i && !(i%3)){
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
		        console.log('mousedown image place');
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

	    this.shape.shape.svg.addEventListener("mouseover", () => {
	        if (this.state == '' && this.panel)
		        this.removePanel();
	    });
    }

    removePanel(){
	    this.shape.shape.children.map(({child}) => {
	        child.removeFromDOM();
	    });

	    this.shape.shape.children = [];

	    this.shape.shape.svg.removeEventListener("mouseover", () => {});
	    this.panel = null;
	    this.state = '';

    }
}
