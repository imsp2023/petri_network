class LassoComponent{
    addAllEvents() {
	this.comp.shape.shape.addEvent('mouseover', (e)=>{
	    Event.onmouseover(this, lassoactions.list,
			      this.comp.shape.shape.x + this.comp.shape.shape.width,
			      this.comp.shape.shape.y);
	});
	this.comp.shape.shape.addEvent('mousedown', (e)=>{
	    Event.onmousedown(this);
	    Event.state += '_lasso'
	    Event.src = this;
	    Event.x = e.clientX;
	    Event.y = e.clientY;
	    this.oldX = this.comp.shape.shape.x;
	    this.oldY = this.comp.shape.shape.y;
	});
	this.comp.shape.shape.addEvent('mouseleave', (e)=>{
	    Event.onmouseleave(this);
	});
	this.comp.shape.shape.addEvent('mouseup', (e)=>{
	    //Event.onmouseup(this);
	    Event.state = null;
	    Event.x = null;
	    Event.y = null;
	});
    }

    constructor(props={}){
	this.type = 'lasso';
	this.panelPos = -1;
	this.selectedComp = [];
	
	this.comp = new Lasso(props);

	this.actions = lassoactions;
	Register.add(this.comp.shape.uuid, this);
    }

    lockComponent() {
	var ids = [], cp;
	layout.getMarkedCells(Math.floor(this.comp.shape.shape.x/layout.cellW),
			      Math.floor(this.comp.shape.shape.y/layout.cellH),
			      Math.floor((this.comp.shape.shape.x+
					  this.comp.shape.shape.width)/layout.cellW),
			      Math.floor((this.comp.shape.shape.y+
					 this.comp.shape.shape.height)/layout.cellH),
			      ids);
	//console.log(ids);

	if(ids.length == 0){
	    this.remove();
	    return;
	}
	
	ids.map((i)=>{
	    if((cp=Register.find(i))){
		
		if(cp.comp.shape.shape.x > this.comp.shape.shape.x &&
		   cp.comp.shape.shape.y > this.comp.shape.shape.y &&
		   cp.comp.shape.shape.x < this.comp.shape.shape.x+this.comp.shape.shape.width &&
		   cp.comp.shape.shape.y < this.comp.shape.shape.y+ this.comp.shape.shape.height){
		    cp.comp.shape.shape.deleteAllEvents();
		    this.selectedComp.push(cp);
		}
	    }
	})

	this.addAllEvents();
    }

    move(dx, dy){
	this.selectedComp.map((c)=>{
	    c.move(dx, dy);
	    c.comp.redraw();
	});
    }
    
    save(){
	return null;
    }

    resize(dx, dy){
	if(this.comp.shape.shape.width+dx < 0 ||
	   this.comp.shape.shape.height+dy < 0)
	    return;
	this.comp.shape.shape.width += dx;
	this.comp.shape.shape.height += dy;
	this.comp.redraw();
    }
    
    remove(){
	console.log('remove');
	console.log(this.comp.shape);

	this.selectedComp.map((c)=>{
	    c.addAllEvents();
	});
	
	this.comp.shape.shape.removeFromDOM();
        Register.clear(this.comp.shape.uuid);
    }
}
