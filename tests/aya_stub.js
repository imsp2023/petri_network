class Aya{
    constructor(){
	this.ttype = null;
    }

    settype(type){
	this.ttype = type;
    }

    Component(type, props){
	var Obj = {
	    type : this.ttype ? this.ttype : type,
	    form : {
		c_svg: {
		    setAttribute: (tag, value) =>{
			Obj.form[tag] = value;
		    }
		},
		r: props ? props.r : null
	    }
	}
	return Obj;
    }
}
