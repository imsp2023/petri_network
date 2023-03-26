var tab  = [null, null, null, null];
var n_tab = 0, registerUserData;
var stub = 0;
var registerForEach = 0;
var registerClear = 0;
class Register{
    static add(id, object) {
	tab[n_tab++] = object;
    }

    static find(uuid){
        return tab[n_tab++];
    }

    static clear(uuid){
	registerClear++;
    }

    static forEach(func, userdata){
	registerForEach++;
	if(registerUserData)
	    registerUserData.forEach((e)=>{
		userdata.push(e);
	    });
    }
}
