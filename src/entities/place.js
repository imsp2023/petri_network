class Place{
    static Radius = 20;
    static IStroke = '1px';
    static SStroke = '2px';
    static EStroke = '2px';
    static IColor = 'black';
    static SColor = 'green';
    static EColor = 'red';

    static getShapeDimension(type){
        return {};
    }
    
    constructor(props = {}){

		var color = Place.IColor;
		var pixel = Place.IStroke;
		var x, y;

		this.panelPos = -1;
		this.state = '';
		
		Object.keys(props).map((e)=>{
			if(e != 'x' && e != 'y')
			this[e] = props[e];
		});

		if(this.type == undefined)
			this.type = "intermediary";
		
		if(!this.name)
			this.name = 'p_' + paya.id();
		
		if (this.type == "start"){
			color = Place.SColor;
			pixel = Place.SStroke;;
		}else if (this.type == "end"){
			color = Place.EColor;
			pixel = Place.EStroke;
		}
		else if (this.type != "intermediary")
			throw new Error("wrong parameter");

		this.shape = paya.circle(props.x, props.y, Place.Radius, true, true, props.uuid);
		if(this.shape && this.shape.type != 'circle')
			throw new Error("the shape isn't a circle");

		this.shape.removeBoxFromDOM();

		this.shape.setStyles({fill: "white", strokewidth: pixel, stroke: color});

		this.shape.makeHiddenCpoints();
		this.shape.makeHiddenVertex();
    }

    redraw(){
		this.shape.redraw();
    }
    
    setType(type){
		var color = Place.IColor;
		var pixel = Place.IStroke;

		if(this.type == type)
				return;

		this.type = type;
		if (this.type == "start"){
			color = Place.SColor;
			pixel = Place.IStroke;
		}
		else if (this.type == "end"){
			color = Place.EColor;
			pixel = Place.EStroke;
		}
		
		this.shape.c_points.map((pt) => {
			pt.setStyles({fill: color});
		});
		this.shape.setStyles({strokewidth: pixel, stroke: color});
		this.shape.redraw();
    }
}
export {Place};