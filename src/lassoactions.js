const lassoactions = {
    list : [
	{name: "break", path: "src/images/break.png"},
	{name: "deletion", path: "src/images/delete.png"}
    ],
    break: (target)=>{
	target.remove();
    },
    
    deletion: (target)=>{
	target.selectedComp.map((c)=>{
	    c.actions['deletion'](c);
	});
	target.remove();
    }
}
export {lassoactions};
