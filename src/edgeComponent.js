class EdgeComponent{
    addAllEvents() {
	if(!this.comp.shape.ca)
	    this.comp.shape.line.addEvent('click', (e)=>{
		Event.onclick(this);
	    });
    }
    
    constructor(props){
	this.type = 'edge';
	this.comp = new Edge(props);
	
	this.addAllEvents();
	this.actions = edgeactions;
        Register.add(this.comp.shape.line.uuid, this);
	
    }

    save(){
	// var obj = {};
	// Object.keys(this.comp.shape).map((e)=>{
	//     if(e != 'shape')
	// 	obj[e] = this.comp[e];
	//     else {
	// 	obj.uuid = this.comp[e].shape.uuid
	// 	obj.x = this.comp[e].shape.x;
	// 	obj.y = this.comp[e].shape.y;
	//     }
	// });

	return this.comp.shape.save();
    }

    remove(){
	this.comp.shape.removeFromDOM();
	Register.clear(this.comp.shape.line.uuid);
    }
}
