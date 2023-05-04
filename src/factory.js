import {EdgeComponent} from './edgeComponent';
import {PlaceComponent} from './placeComponent';
import {TransitionComponent} from './transitionComponent';
import {LassoComponent} from './lassoComponent';

class ComponentFactory{
    static getComponent(type, props){
		if (type == 'place')
			return new PlaceComponent(props);
		else if (type == 'edge')
			return new EdgeComponent(props);
		else if (type == 'transition')
			return new TransitionComponent(props);
		else if (type == 'lasso')
			return new LassoComponent(props);
		else
			return null;
		}
}
export {ComponentFactory};
