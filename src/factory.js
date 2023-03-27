//import { abstractFactory } from "./abstractions/abstractFactory";

class Factory{
    static getShape(type, props){
	var obj;
	
	if(!type ||
	   (type != 'place' && type != 'edge' && type != 'transition') ||
	   !props || typeof props != 'object')
	    return null;
	
	try{
	    if (type == 'place')
		obj = new Place(props);
	    else if (type == 'edge')
		obj = new Edge(props);
	    else if (type == 'transition')
		obj = new Transition(props);
	}catch(e){
        console.log(e);
	    return null;
	}

	return obj;
    }
}
