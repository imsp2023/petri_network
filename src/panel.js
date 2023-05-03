const ImSZ = 22;
const Panel = {
    path2name: (actions, path)=>{
	var a;
	for(a=0; a < actions.length; a++){
	    if(path == actions[a].path){
		return actions[a].name;
	    }
	}
	return '';
    },
    add: (target, actions, posx, posy)=>{
	var x = posx;
	var y = posy;
	var wid, hei, panel, img, cp;

	wid = 2*ImSZ+2*5/*spacing*/;
	hei = Math.floor(actions.length/2);
	if(actions.length % 2)
	    hei++;

	hei = hei*ImSZ+ hei*5;
	panel = aya.Rectangle(x, y, wid, hei);

	target.comp.shape.addChild(panel, {x: -2, y: 0}, null, true);
	panel.c_svg.setAttribute("stroke-width", "0px");
	panel.c_svg.setAttribute("opacity", 0);

	target.panelPos = target.comp.shape.shape.children.length-1;

        for (var i = 0, j = 0; i < actions.length; i++, j++){
	    if (i && !(i%3)){
		j = 0;
		y += ImSZ+5/* spacing */;
	    }

	    img = aya.Image(x +ImSZ * j, y, ImSZ, ImSZ,
			    actions[i].path, actions[i].name);
	    target.comp.shape.addChild(img, {x: 5, y: 0}, null, true);
	    img.c_svg.setAttribute("width", ImSZ);
	    img.c_svg.setAttribute("height", ImSZ);

	    img.addEvent("mouseover", (e)=>{
		target.state = 'panel';
	    });
	    img.addEvent("mouseleave", (e)=>{
		target.state = null;
	    });
	    img.addEvent("mousedown", (e)=>{
		Panel.remove(target);
		target.actions[Panel.path2name(actions, e.target.href.baseVal)](target);
	    });
	}

	panel.addEvent("mouseover", (e)=>{
	    target.state = 'panel';
	});
	panel.addEvent("mouseleave", (e)=>{
	    target.state = null;
	});

	target.comp.shape.shape.svg.addEventListener("mouseover", () => {
	    console.log('mouseover SVG state='+target.state + ' panelpos='+target.panelPos);
	    if (target.state == null && target.panelPos >= 0){
		Panel.remove(target);
		target.comp.shape.shape.svg.removeEventListener("mouseover",()=>{});
	    }
	});
    },

    remove: (target)=>{
	var i, len;

        if(target.panelPos < 0)
            return;

	len = target.comp.shape.shape.children.length;
        for(i = target.panelPos; i < target.comp.shape.shape.children.length; i++)
	    target.comp.shape.shape.children[i].child.removeFromDOM();
	target.comp.shape.shape.children.splice(target.panelPos, len);

	target.panelPos = -1;
	target.comp.shape.shape.svg.removeEventListener("mouseover", () => {});
    }
}
