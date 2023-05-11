import {Register} from '../register';

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
        if(props.cond || props.cond == "")
            this.cond = props.cond;

        if(props.direction == 'ca'){
            props.subtype =  'optimal';
            props.end_start = 'circle';
            props.end_dest = 'circle';
        }

	    this.shape = paya.link(src.comp.shape.uuid,
			                  dest.comp.shape.uuid,
                              props);
        if (this.cond != undefined){
            //this.shape.addText(this.cond, "top");
            if (this.cond == '')
                //this.shape.line.setStyles({strokedasharray: "2"});
		this.shape.line.setStyles({stroke: "red"});
	    else
		this.shape.line.setStyles({stroke: "blue"});
        }
        this.shape.line.children.map(({child})=>{
            child.setStyles({"fill": "black"});
        });
        this.shape.redraw();
    }

    setCond(cond){
	this.cond = cond;
	if (this.cond == '')
            this.shape.line.setStyles({stroke: "red"});
	else
	    this.shape.line.setStyles({stroke: "blue"});
    }

    redraw(){
	this.shape.redraw();
    }
}

export {Edge};