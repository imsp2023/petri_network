const space = 3
class Layout{
    constructor(cellW, cellH, gridW, gridH){
	var i;
	if(!cellW || !cellH || !gridW || !gridH)
	    throw new Error("wrong parameters");

	this.cellW = cellW;
	this.cellH = cellH;
	this.ncols = Math.floor(gridW/cellW);
	this.nligs = Math.floor(gridH/cellH);
	this.grid = [];
	for(i = 0; i < this.ncols*this.nligs; i++)
	    this.grid.push(0);
    }

    getClosestPosition(originX, originY) {
	var obj = {}, pos1, pos2, i, j, coef;

	if(originX == undefined || originY == undefined ||
	   originX < 0 || originY < 0 || originX >= this.ncols || originY >= this.nligs)
	    return null;
	
	for(j=0, coef=1; j < 2 /*east, west oritentation*/; j++, coef*=-1){
	    console.log('coef='+coef+' originX='+originX+' origin+space='+(originX+coef*space));
	    if(originX+coef*space >= this.ncols || originX+coef*space < 0)
		continue;
	
	    for(i=0; i < this.nligs-originY; i++){
		pos1 = originY-i;
		pos2 = originY+i;

		obj.x = originX+coef*space;
		if(pos1 >= 0){
		    pos1 = this.ncols*pos1+originX+coef*space;
		    if(!this.grid[pos1]){
			obj.y = originY-i;
			return obj;
		    }
		}				

		if(pos2 < this.nligs){
		    pos2 = this.ncols*pos2+originX+coef*space;
				    
		    if(!this.grid[pos2]){
			obj.y = originY+i;
			return obj;
		    }
		}
	    }
	}
	
	return null;
    }

    clear (){
	var i;
	for(i=0; i< this.grid.length; i++)
	    this.grid[i] = 0;
    }

    mark(col, lig){
	this.grid[lig*this.ncols+col] = 1;
    }

    umark(col, lig){
	this.grid[lig*this.ncols+col] = 0;
    }
}
