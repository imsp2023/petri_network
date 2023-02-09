//import { abstractComponent } from "../abstractions/abstractComponent";

class Place{

    constructor(type){
	var color = "black";

	this.type = !type ? "intermediary" :  type;

	if (this.type == "start")
	    color = "green";
	else if (this.type == "end")
	    color = "red";
	else if (this.type == "intermediary")
	    color = "black";
	else
	    throw new Error("this type is not correct");

	this.shape = aya.Component("circle", {x:0, y: 0, r: 25});
	if (this.shape && this.shape.type != "circle")
	    throw new Error("the shape isn't a circle");

	this.shape.form.c_svg.setAttribute("fill", color);
	this.shape.form.c_svg.setAttribute("stroke-width", "2px");
    }
    createShape(){
    }

    removeFromDOM(){
    }

    addConnector(component){
    }
}
