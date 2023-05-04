
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
	this.shape = aya.Component("rectangle", {x:props.x, y:props.y,
						 width: props.width,
						 height: props.height});

	//this.shape.shape.c_svg.setAttribute("stroke-width", "1px");
	this.shape.shape.c_svg.setAttribute("stroke-dasharray", "4 1 2");
	this.shape.shape.c_svg.setAttribute("stroke", "blue");
	this.shape.shape.c_svg.setAttribute("fill-opacity", 0);
	this.shape.shape.c_svg.setAttribute("rx", 5);
	this.shape.shape.c_svg.setAttribute("ry", 5);
	
	this.shape.shape.c_points.map((c)=>{
	    c.c_svg.setAttribute("fill", 'none');
	});

	this.shape.shape.vertex.map((c)=>{
	    c.c_svg.setAttribute("fill", 'none');
	});
    }

    redraw(){
	this.shape.shape.redraw();
    }

    
    removeFromDOM(){
    }
}

export {Lasso};