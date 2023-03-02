//import { abstractFactory } from "./abstractions/abstractFactory";

class Factory{
    static getShape(type, props){
	if(!type || !props)
	    throw new Error("missing parameter");
	if (type != 'place' && type != 'edge' && type != 'transition')
	    throw new Error("type isn't correct");

	if (type == 'place')
	    return new Place(props.type);
	else if (type == 'edge')
	    return new Edge(props.direction, props.src, props.dest);
	else if (type == 'transition')
	    return new Transition(props.name, props.type);
    }
}
