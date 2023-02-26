var store = {};
class Register{
    static add(object) {
        store[object.type == 'link' ? object.comp.shape.line.uuid : object.comp.shape.uuid] = object;
    }

    static find(uuid){
        return store[uuid] ? store[uuid] : null;
    }

    static clear(uuid){
        delete store[uuid];
    }

    static findAllEdges(object){
	var result = [];
        Object.keys(store).map((id) => {
            var obj = Register.find(id);
            if(obj.type == "edge"){
                if(object.comp.shape.uuid == obj.comp.shape.source.ref || object.comp.shape.uuid == obj.comp.shape.destination.ref)
                    result.push(obj);
            }
        });
        return result;
    }
}
