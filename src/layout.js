const space = 3
var layout = {
    grid: [],
    cellW: 0,
    cellH: 0
};

layout.init = function(cellW, cellH, gridW, gridH){
    var i;
    if(!cellW || !cellH || !gridW || !gridH)
	return false;

    layout.cellW = cellW;
    layout.cellH = cellH;
    layout.ncols = Math.floor(gridW/cellW);
    layout.nligs = Math.floor(gridH/cellH);

    for(i = 0; i < layout.ncols*layout.nligs; i++)
	layout.grid.push(0);
    return true;
};

layout.getClosestPosition = (originX, originY)=>{
    var obj = {}, pos1, pos2, i, j, coef;

    if(originX == undefined || originY == undefined ||
       originX < 0 || originY < 0 || originX >= layout.ncols || originY >= layout.nligs)
	return null;
    
    for(j=0, coef=1; j < 2 /*east, west oritentation*/; j++, coef*=-1){
	if(originX+coef*space >= layout.ncols || originX+coef*space < 0)
	    continue;
	
	for(i=0; i < layout.nligs-originY; i++){
	    pos1 = originY-i;
	    pos2 = originY+i;

	    obj.x = originX+coef*space;
	    if(pos1 >= 0){
		pos1 = layout.ncols*pos1+originX+coef*space;
		if(!layout.grid[pos1]){
		    obj.y = originY-i;
		    return obj;
		}
	    }				

	    if(pos2 < layout.nligs){
		pos2 = layout.ncols*pos2+originX+coef*space;
		
		if(!layout.grid[pos2]){
		    obj.y = originY+i;
		    return obj;
		}
	    }
	}
    }
    
    return null;
};


layout.clear = ()=>{
    var i;
    for(i=0; i< layout.grid.length; i++)
	layout.grid[i] = 0;
};

layout.mark = (col, lig)=>{
    layout.grid[lig*layout.ncols+col] = 1;
};

layout.umark = (col, lig)=>{
    layout.grid[lig*layout.ncols+col] = 0;
};

layout.fixPoint = (x, y)=>{
    if(x == undefined || y == undefined ||
       x < 0 || x >= layout.ncols*layout.cellW ||
       y < 0 || x >= layout.nligs*layout.cellH)
	return {x: 0, y: 0};
    return {x: (x/layout.cellW)*layout.cellW, y: (x/layout.cellH)*layout.cellH};
};

layout.markEdge = (x1, y1, x2, y2)=>{
    var step, val;
    if(y1 < y2)
	step = 1;
    else
	step = -1;

    val = y1;
    while(val != y2){
	layout.mark(x1, val+step);
	val+=step;
    }
    
    if(x1 < x2)
	step = 1;
    else
	step = -1;

    val = x1;
    while(val != x2){
	layout.mark(val+step, y2);
	val+=step;
    }
};
