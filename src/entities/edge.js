//import { abstractComponent } from "../abstractions/abstractComponent";

class Edge {
    constructor(props={}){
	    var src, dest, line;
	    if (!props.direction || !props.src || !props.dest)
	        throw new Error("missing parameters");

	    if ((props.direction != "p2t" && props.direction != "t2p") ||
	        !(src=Register.find(props.src)) ||
	        !(dest=Register.find(props.dest)) ||
	        src.comp.shape.type == dest.comp.shape.type)
	        throw new Error("wrong direction");

	    this.src = props.src;
	    this.dest = props.dest;
	    this.direction = props.direction;

	    this.shape = aya.Link(src.comp.shape.shape.uuid,
			                  dest.comp.shape.shape.uuid,
                              props.altpath);
        this.shape.line.children.map(({child})=>{
            child.setStyles({"fill": "black"});
        });
        this.shape.redraw();
    }
}
