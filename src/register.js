class Register{
    static store = {};

    static add(object) {
        Register.store[object.type == 'edge' ? object.comp.shape.line.uuid : object.comp.shape.uuid] = object;
    }

    static find(uuid){
        return Register.store[uuid] ? store[uuid] : null;
    }

    static clear(uuid){
        delete Register.store[uuid];
    }

    static findAllEdges(object){
	var result = [];
        Object.keys(Register.store).map((id) => {
            var obj = Register.find(id);
            if(obj.type == "edge"){
                if(object.comp.shape.uuid == obj.comp.shape.source.ref || object.comp.shape.uuid == obj.comp.shape.destination.ref)
                    result.push(obj);
            }
        });
        return result;
    }
}
