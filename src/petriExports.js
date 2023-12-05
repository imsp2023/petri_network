import { Register } from "./register";

let PetriExports = {
    Mode:'dev',

    edge2SQLObject: (ed) =>{
	var obj = {}, src, dst;

	if(ed.type != 'edge')
	    return null;
	
	src = Register.find(ed.comp.src);
	dst = Register.find(ed.comp.dest);

	obj.direction = ed.comp.direction;


	/* to be checked */
	if(ed.comp.shape && ed.comp.shape.altpath)
	    obj.altpath = true;

	if(ed.comp.direction == 'ca'){
	    obj.pid = src.comp.name;
	    obj.tid = dst.comp.name;
	}else if(ed.comp.direction == 'p2t'){
	    obj.pid = src.comp.name;
	    obj.tid = dst.comp.name;

	    if(dst.comp.type == 'automatic')
		obj.type = 'auto';
	    else
		obj.type = dst.comp.type;
	    
	    if(dst.comp.type == 'manual')
		obj.role = PetriExports.Mode=='dev'? 'dev' : dst.comp.role;
	    else if(dst.comp.type == 'automatic')
		obj.app = dst.comp.app;

	    if(dst.comp.ca)
		obj.ca = dst.comp.ca;
	    
	    if(dst.comp.type == 'asub' || dst.comp.type == 'ssub')
		obj.count = dst.comp.count;
	    
	    if(ed.comp.cond)
		obj.cond = ed.comp.cond;


	    if(dst.comp.gate)
		obj.gate = dst.comp.gate;
	}else if(ed.comp.direction == 't2p'){
	    obj.pid = dst.comp.name;
	    obj.tid = src.comp.name;
	    if(dst.comp.type == 'end')
		obj.type = 'end';
	}

	return obj;
    },
    
    toSQL: (name) =>{
		var data={edges:[]}, text='';
		
		Register.forEach( (c, ud)=> {
			if(c.type == 'place' && c.comp.type == 'start')
				ud.start = c.comp.name;
			else if(c.type == 'edge'){
				ud.edges.push(PetriExports.edge2SQLObject(c));
			}
		}, data);

		text += 'insert into workflow.processes(process) values(\'{"name":"'+name+
			'", "place":"'+ data.start +'"}\');';

		data.edges.forEach(e=>{
			text += '\ninsert into workflow.edges (id_processes, edge) values ((select id from workflow.processes where process->>\'name\'=\''+name+'\'),\''+JSON.stringify(e)+'\' );'
		})

		return text;
    }
};
export {PetriExports};
