//import { abstractComponent } from "../abstractions/abstractComponent";
var actions = [
    {name: "deletion", path: "src/images/trash.png"},
    {name: "transition", path: "src/images/transition.png"},
    {name: "edge", path: "src/images/edge.png"},
    {name: "setting", path: "src/images/setting.png"},
];

class Place{

    constructor(type){
	var color = "black";
	var pixel = "3px";

	this.state = null;

	this.active_component = null;

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


	this.name = null;
	this.shape = aya.Component("circle", {x:0, y: 0, r: 20});

	this.shape.form.c_points.map((pt) => {
	    pt.deleteEvent("mousedown");
	    pt.deleteEvent("mouseover");
	    pt.deleteEvent("mouseleave");
	    pt.c_svg.setAttribute("fill", "red");
	});

	this.shape.form.vertex.map((vt) => {
	    vt.removeFromDOM();
	});

	this.shape.form.removeBoxFromDOM();
	if (this.shape && this.shape.type != "circle")
	    throw new Error("the shape isn't a circle");

	this.shape.form.c_svg.setAttribute("fill", "white");
	this.shape.form.c_svg.setAttribute("stroke-width", pixel);
	this.shape.form.c_svg.setAttribute("stroke", color);
	this.shape.form.c_svg.addEventListener("mouseover", () => {
	    this.state = "mouseover";
	    if (this.active_component)
		return;
	    this.active_component = this.shape.form;
	    this.addPanel();
	    this.shape.form.svg.addEventListener("mouseover", () => {
		if (this.state == "mouseover")
		    return;
		if (this.active_component){
		    this.shape.form.children.map(({child}) => {
			child.removeFromDOM();
		    });
		    this.shape.form.children = [];
		    this.shape.form.svg.removeEventListener("mouseover", () => {});
		}
		this.active_component = null;
	    });
	});
	this.shape.form.c_svg.addEventListener("mouseleave", ()=> {
	    this.state = "";
	});
    }

    setName(name){
	if (name)
	    this.name = name;
	this.shape.addChild(aya.Text(this.shape.form.x, this.shape.form.y, this.name, 20), {x: -this.shape.form.r, y: this.shape.form.r + 20}, null, true);
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
	this.shape.form.c_svg.setAttribute("stroke-width", pixel);
	this.shape.form.c_svg.setAttribute("stroke", color);
    }

    addPanel(){
	var x = this.shape.form.x + this.shape.form.r; 
	var y = this.shape.form.y - this.shape.form.r - 10;

	this.shape.addChild(aya.Rectangle(x,y, 100, 100), {x: 0, y: 0}, null, true);
	this.shape.form.children[0].child.c_svg.setAttribute("stroke-width", "0px");

	for (var i = 0, j = 0; i < actions.length; i++, j++){
	    if (i && !(i%2)){
		j = 0;
		y += 35;
	    }
	    this.shape.addChild(aya.Image(x + 35 * j, y, 30, 30, actions[i].path, actions[i].name), {x: 5, y: 0}, null, true);
	}
	// adding mouseover to the children to allow panel to stay open when moving on its children
	this.shape.form.children.map(({child}, index) => {
	    if (child.type != "rectangle"){
		child.c_svg.addEventListener("mouseover", () => {
		    this.state = "mouseover";
		});
		child.c_svg.addEventListener("mousedown", (e) => {
		    var cp = Register.find(this.shape.uuid);
		    if (cp){
			src = cp;
			if (child.name == 'edge'){
			    state = 'drawing_edge';
			    cp.addConnector("edge");
			}
			else if (child.name == 'transition'){
			    state = 'c_transit';
			    cp.addConnector('transition');
			}
			else if (child.name == 'deletion'){
			    var links = Register.findAllEdges(cp);
			    links.map((lk) => {
				lk.comp.shape.line.removeFromDOM();
				Register.clear(lk.comp.shape.line.uuid);
			    });
			    this.shape.form.children.map(({child}) => {
				child.removeFromDOM();
			    });
			    this.shape.form.svg.removeChild(this.shape.form.c_svg);
			    Register.clear(this.shape.uuid);
			}
			else if (child.name == 'setting'){
			}
		    }
		});

		child.c_svg.addEventListener("mouseup", () => {
		    this.shape.form.children.map(({child}) => {
			child.removeFromDOM();
		    });
		    this.shape.form.children = [];
		});
	    }
	});
	this.shape.form.children[0].child.c_svg.addEventListener("mouseover", () => {
	    this.state = "mouseover";
	});
	this.shape.form.children[0].child.c_svg.addEventListener("mouseleave", () => {
	    this.state = "";
	});
    }
}
