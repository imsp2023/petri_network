
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

export {Lasso};