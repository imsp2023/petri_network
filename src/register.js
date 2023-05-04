class Register{
    static store = {};
    
    static add(id, obj) {
	if(id)
	    Register.store[id] = obj;
    }

    static find(id){
        return Register.store[id] ? Register.store[id] : null;
    }

    static clear(id){
        delete Register.store[id];
    }

    static forEach(func, userdata){
	Object.keys(Register.store).map((e)=>{
	    func(Register.store[e], userdata);
	});
    }
}
export {Register};
