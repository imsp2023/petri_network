var factoryFailed=false;
var removePanel=0;
var removeChild = 0;
class Factory{
    static getShape(type, props){
	if(factoryFailed)
	    return null;
	return {
	    redraw: ()=>{},
        setGate: ()=>{},
	    shape : {
            redraw: ()=>{},
		line:{uuid: ''},
		    shape: {
		    children: [],
		    x: props.x,
		    y: props.y,
		    c_points: [{x:0,y:0}, {x:0,y:0}, {x:0,y:0}, {x:0,y:0}],
		    redraw: ()=>{},
		    svg: {
			removeChild: ()=>{
			    removeChild++;
			},
			addEventListener: (a, b)=>{
			    if(events[a])
				events[a]++;
			    else
				events[a] = 1;
			}
		    }
		}
	    },
	    removePanel: ()=>{
		removePanel++;
	    }
	};
    }
}

