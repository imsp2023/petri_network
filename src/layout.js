const space = 3;
var layout = {
    cellW: 0,
    cellH: 0,
    grid: [],
};

layout.init = function(cellW, cellH, gridW, gridH){
    var i;
    if(!cellW || !cellH || !gridW || !gridH)
	return false;

    layout.cellW = cellW;
    layout.cellH = cellH;
    layout.ncols = Math.floor(gridW/cellW);
    layout.nligs = Math.floor(gridH/cellH);
    layout.grid = [];
    for(i = 0; i < layout.ncols*layout.nligs; i++)
	layout.grid.push(false);
    return true;
};

layout.getClosestPosition = (originX, originY)=>{
    var obj = {}, pos1, pos2, i, j, coef;

    // console.log('closestposition x='+originX+' y='+originY);
    if(originX == undefined || originY == undefined ||
       originX < 0 || originY < 0 || originX >= layout.ncols || originY >= layout.nligs)
	return null;
    
    for(j=0, coef=1; j < 2 /*east, west oritentation*/; j++, coef*=-1){
	if(originX+coef*space >= layout.ncols || originX+coef*space < 0)
	    continue;
	
	for(i=0; i < layout.nligs-originY; i+=1){
	    pos1 = originY-i;
	    pos2 = originY+i;

	    obj.x = originX+coef*space;
	    if(pos1 >= 0){
		pos1 = layout.ncols*pos1+originX+coef*space;
		if(!layout.grid[pos1]){
		    obj.y = originY-i;
		    // console.log('close-1');
		    // console.log(obj);
		    return obj;
		}
	    }				

	    if(pos2 < layout.nligs){
		pos2 = layout.ncols*pos2+originX+coef*space;
		
		if(!layout.grid[pos2]){
		    obj.y = originY+i;
		    // console.log('close-2');
		    // console.log(obj);
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
	layout.grid[i] = false;
};

layout.mark = (col, lig, comp)=>{
    // console.log('LAYOUT mark x1='+col+' y1='+lig);
    layout.grid[lig*layout.ncols+col] = comp ? comp: true;
};

layout.umark = (col, lig)=>{
    // console.log('umark x1='+col+' y1='+lig);
    layout.grid[lig*layout.ncols+col] = false;
};

layout.fixPoint = (x, y)=>{
    if(x == undefined || y == undefined ||
       x < 0 || x >= layout.ncols*layout.cellW ||
       y < 0 || x >= layout.nligs*layout.cellH)
	return {x: 0, y: 0};
    return {x: Math.floor(x/layout.cellW)*layout.cellW, y: Math.floor(y/layout.cellH)*layout.cellH};
};

layout.getMarkedCells= (fromX, fromY, toX, toY, cells)=>{
    var i, j;
    for(j = fromY; j <= toY; j++)
	for(i = fromX; i <= toX; i++){
	    // console.log('LAYOUT mark x1='+i+' y1='+j+ 'value'+layout.grid[i*layout.ncols+j]);
	    if(layout.grid[j*layout.ncols+i])
		cells.push(layout.grid[j*layout.ncols+i]);
	}
}

export {layout};