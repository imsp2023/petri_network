function getSelectedComp(){}
class Lasso{
    constructor(props={}){

	if(!props.x)
	    props.x = 0;

	if(!props.y)
	    props.y = 0;

	if(!props.width)
	    props.width = 0;

	if(!props.height)
	    props.height = 0;

	this.from = {i: props.x/layout.cellW, j: props.y/layout.cellH};
	this.to = {
	    i: (props.x+props.width)/layout.cellW,
	    j: (props.y+props.height)/layout.cellH
	};
	this.shape = aya.Component("rectangle", {x:props.x, y:props.y,
						 width: props.width,
						 height: props.height});
	this.shape.shape.c_svg.setAttribute("fill", 'none');
	this.shape.shape.c_svg.setAttribute("stroke-width", "2px");
	this.shape.shape.c_svg.setAttribute("stroke", "blue");

	this.shape.shape.c_points = null;
	this.shape.shape.vertex = null;
    }

    removeFromDOM(){
    }
}
