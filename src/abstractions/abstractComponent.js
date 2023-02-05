class abstractComponent{
        constructor(){
            if (this.constructor === "abstractComponent")
                throw new Error("Can't instanciate abstract class");
        }

        createShape(){

        }

        removeFromDOM(){

        }

        addConnector(component){
                
        }
}

export {abstractComponent}