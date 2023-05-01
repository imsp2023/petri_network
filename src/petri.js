class Petri{
    constructor(){
        try{
            this.aya = new aya.Init(2000, 2000);
            this.aya.config.link.end_start = ' ';
            this.aya.config.link.end_dest = 'triangle';
    
            this.aya.svg.addEventListener("mousemove", (e)=>{
                if(Event.line){
                    Event.line.dest_x = e.clientX;
                    Event.line.dest_y = e.clientY;
                    Event.line.redraw();
                }
                });
            
                this.aya.svg.addEventListener("mouseup", (e)=>{
                console.log('mouseUP SVG');
                if(Event.line){
                    Event.line.removeFromDOM();
                    Event.line = null;
                    Event.src = null;
                    Event.state = null;
                }
                });
                layout.init(40, 80, 2000, 2000);
        }
        catch(e){
            console.error(e);
        }
    }

    new_diag(){
        Register.forEach(comp => {
            if (comp.type != "edge")
                comp.addConnector('deletion');
        });
    
        Register.clear();
    
        
        var cps = [];
        var p = ComponentFactory.getComponent("place", { type: 'start', x: 100, y: 350 });
        // var l = new Lasso({x: 0, y: 0, width: 150, height: 150});
        var t = ComponentFactory.getComponent('transition', {type: 'dummy', x: 100, y: 250});
    }

    load_diag() {
        console.log("Call load_diag");
    }
    save_as_svg() {
        const svg = document.getElementById("viewport").children[0];
        saveFile(svg.outerHTML,"diagram.svg","image/svg+xml")
    }
    save_diag() {
        var data = { edges: [], places: [], transitions: [] };
        Register.forEach(comp => {
            data[comp.type + 's'].push(comp.save())
        }, data);
        saveFile(JSON.stringify(data), "diagram.aya", 'text/plain')
    }


    saveFile(data, name, type) {
        let blob = new Blob([data], { type });
        if (typeof navigator.msSaveBlob == "function")
            return navigator.msSaveBlob(blob, file_name);

        var saver = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
        var blobURL = saver.href = URL.createObjectURL(blob),
            body = document.body;

        saver.download = name;

        body.appendChild(saver);
        saver.dispatchEvent(new MouseEvent("click"));
        body.removeChild(saver);
        URL.revokeObjectURL(blobURL);
    }
}