//import { abstractFactory } from "./abstractions/abstractFactory";

class ComponentFactory{
    static getComponent(type, props){
	if (type == 'place')
	    return new PlaceComponent(props);
	else if (type == 'edge')
	    return new EdgeComponent(props);
	else if (type == 'transition')
	    return new TransitionComponent(props);
	else
	    return null;
    }
}
