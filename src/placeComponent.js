import {Event} from "./event";
import {layout} from "./layout";
import {Register} from './register';
import { Place } from "./entities/place";
import { placactions } from "./placactions";

class PlaceComponent{
    addAllEvents() {
		this.comp.shape.addEvent('mouseover', (e)=>{
			Event.onmouseover(this, placactions.list,
				this.comp.shape.x + this.comp.shape.r,
				this.comp.shape.y - this.comp.shape.r);
		});
		this.comp.shape.addEvent('mousedown', (e)=>{
			Event.onmousedown(this)
			layout.umark(Math.floor(this.comp.shape.x/layout.cellW),
				Math.floor(this.comp.shape.y/layout.cellH));
		});
		this.comp.shape.addEvent('mouseleave', (e)=>{
			Event.onmouseleave(this);
		});
		this.comp.shape.addEvent('mouseup', (e)=>{
			console.log("mouseupppppppppppppppppppppppppppppppp");
			Event.onmouseup(this);
		});
		this.comp.shape.addEvent('click', (e)=>{
			Event.onclick(this);
		});
    }

    centerComponent(comp){
		comp.x += layout.cellW/2;
		comp.y += layout.cellH/2;
	}
    
    constructor(props){
		var lyt = {x: 0, y :0}, dim;
		
		this.type = 'place';
		this.panelPos = -1;
	
		if(props.x >= 0 && props.y >= 0){
			var lyt = layout.fixPoint(props.x, props.y);

			props.x = lyt.x;
			props.y = lyt.y;
		}else{
			props.x = 0;
			props.y = 0;
		}

		this.centerComponent(props);
		this.comp = new Place(props);

		layout.mark(Math.floor(lyt.x/layout.cellW),
						Math.floor(lyt.y/layout.cellH),
						this.comp.shape.uuid);
	
		this.addAllEvents();
		this.actions = placactions;
		Register.add(this.comp.shape.uuid, this);
    }

    move(dx, dy) {
		var edges = [];

		layout.umark(Math.floor(this.comp.shape.x/layout.cellW),
				Math.floor(this.comp.shape.y/layout.cellH));
		
		this.comp.shape.shift(dx, dy);

		layout.mark(Math.floor(this.comp.shape.x/layout.cellW),
				Math.floor(this.comp.shape.y/layout.cellH),
				this.comp.shape.uuid);
		this.comp.redraw();
		Register.forEach(
			(item, data)=>{
			if(item.type=='edge' &&
			(item.comp.src == this.comp.shape.uuid ||
				item.comp.dest == this.comp.shape.uuid))
				data.push(item);
			},
			edges
		);

		edges.map((e)=>{
			e.comp.redraw();
		});
    }
    
    save(){
		var obj = {};
		Object.keys(this.comp).map((e)=>{
			if(e != 'shape' && e!= 'panelPos' && e!= 'state') {
				obj[e] = this.comp[e];

			}
			else if(e == 'shape'){
				obj.uuid = this.comp[e].uuid
				obj.x = this.comp[e].x;
				obj.y = this.comp[e].y;
			}
		});
		return obj;
    }

    remove(){
		layout.umark(Math.floor(this.comp.shape.x/layout.cellW),
				Math.floor(this.comp.shape.y/layout.cellH));
		this.comp.shape.removeFromDOM();
			Register.clear(this.comp.shape.uuid);
    }

}
export {PlaceComponent};