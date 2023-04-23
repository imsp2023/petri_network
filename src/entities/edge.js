//import { abstractComponent } from "../abstractions/abstractComponent";

class Edge {
    constructor(props={}){
	    var src, dest, line;
	    if (!props.direction || !props.src || !props.dest)
	        throw new Error("missing parameters");

        if ((props.direction != "p2t" && props.direction != "t2p" && props.direction != "ca") ||
	        !(src=Register.find(props.src)) ||
	        !(dest=Register.find(props.dest)) ||
	        (props.direction != 'ca' && src.comp.shape.type == dest.comp.shape.type))
	        throw new Error("wrong direction");

	    this.src = props.src;
	    this.dest = props.dest;
	    this.direction = props.direction;
        if(props.cond)
            this.cond = props.cond;

        if(props.direction == 'ca'){
            props.subtype =  'optimal';
            props.end_start = 'circle';
            props.end_dest = 'circle';
        }

	    this.shape = aya.Link(src.comp.shape.shape.uuid,
			                  dest.comp.shape.shape.uuid,
                              props);
        this.shape.line.children.map(({child})=>{
            child.setStyles({"fill": "black"});
        });
        this.shape.redraw();

        if(props.direction != 'ca')
            this.shape.line.c_svg.addEventListener("click", (e)=>{
	            var target;

	            if((target=Register.find(this.shape.line.uuid)))
		            target.onclick();
	        });

    }
}
