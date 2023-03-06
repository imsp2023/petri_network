var factoryFailed=false;
var removePanel=0;
class Factory{
    static getShape(type, props){
	if(factoryFailed)
	    return null;
	return {
	    shape : {
		form: {
		    x: 0,
		    y: 0,
		    c_points: [{x:0,y:0}],
		    redraw: ()=>{},
		    svg: {
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

