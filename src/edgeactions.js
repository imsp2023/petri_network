const edgeactions = {
    list : [
	{name: "deletion", path: "src/images/delete.png"}
    ],

    deletion: (target)=>{
	target.remove();
    }
}
export {edgeactions};