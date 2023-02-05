class abstractFactory{
    constructor(){
        if (this.constructor === "abstractFactory")
            throw new Error("Can't instanciate abstract class");
    }
}
export {abstractFactory};