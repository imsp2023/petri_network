var factoryFailed=false;
var removePanel=0;
var removeChild = 0;

class Factory{
    static getShape(type, props){
	if(factoryFailed)
	    return null;
	var Obj = {
	    redraw: ()=>{},
            setGate: ()=>{},
	    shape : {
		events: [],
		addChild: (child, translate, rotate, drawing) => {
		    if (translate){
			child.offsetX = translate.x;
			child.offsetY = translate.y;
		    }
		    Obj.shape.shape.children.push({child});
		},
		removeFromDOM: ()=>{
		    removeFromDom++;
		},
                redraw: ()=>{},
                altpath: props.altpath,
		line:{uuid: ''},
		shape: {
                    shift: (dx, dy)=>{},
                    children: [],
		    x: props.x,
		    y: props.y,
		    width: 0,
		    height: 0,
		    c_points: [{x:0,y:0}, {x:0,y:0}, {x:0,y:0}, {x:0,y:0}],
		    redraw: ()=>{},
		    addEvent: (e, callback) => {
			var ev = {};
			ev[e] = callback;
			Obj.shape.events.push(ev);
		    },
		    svg: {
			removeChild: ()=>{
			    removeChild++;
			},
			addEventListener: (a, b)=>{
			    // if(events[a])
			    // 	events[a]++;
			    // else
			    // 	events[a] = 1;
			}
		    }
		}
	    },
	    removePanel: ()=>{
		removePanel++;
	    }
	};

	return Obj;
    }
}

