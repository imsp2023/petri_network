var tab  = [null, null];
var n_tab = 0;
var stub = 0;

class Register{
    static add(object) {
	tab[n_tab++] = object;
    }

    static find(uuid){
	return tab[n_tab++];
    }

    static clear(uuid){
    }
}
