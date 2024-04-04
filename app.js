let canvas = document.querySelector('canvas');// board
let ctx = canvas.getContext('2d'); // brush

let cellSize = 50;
let boardHeight = 600;
let boardWidth = 1200;
let direction = "right";

//Snae ke cells jiski vajah se snake rectangle bann raha hai
let snakeCells = [[0,0],[50,0],[100,0]];
//let snakeCells = [[0,0] , [50,0]];

// food generation 
function foodGeneration(){
    return[
        Math.round((Math.random()*(boardWidth- cellSize))/cellSize)*cellSize,
        Math.round((Math.random()*(boardHeight- cellSize))/cellSize)*cellSize
    ]
}
let food = foodGeneration();

// Snake draw
function draw(){
    // erase puri board
    ctx.clearRect(0 , 0 , boardWidth , boardHeight);
    //draw
    for (let cell of snakeCells){
        ctx.fillStyle = 'red';
        ctx.fillRect(cell[0],cell[1], cellSize, cellSize);
    }
    ctx.fillStyle = 'green';
    ctx.fillRect(food[0],food[1],cellSize,cellSize)
}

// har thodi der baad snake update hoga
function update(){
    let headX = snakeCells[snakeCells.length - 1][0];
    let headY = snakeCells[snakeCells.length - 1][1];

    //let newheadX = headX + cellSize;
    //let newheadY = headY;
    let newheadX;
    let newheadY;

    if(direction ==="right"){
        newheadX = headX + cellSize;
        newheadY = headY;
    }
    else if(direction ==="left"){
        newheadX = headX - cellSize;
        newheadY = headY;
    }
    else if(direction ==="up"){
        newheadX = headX;
        newheadY = headY - cellSize;
    }
    else if(direction ==="down"){
        newheadX = headX;
        newheadY = headY + cellSize;
    }
    snakeCells.push([newheadX, newheadY]);

    // food bite karna hoga

    if (food[0] === newheadX && food[1] === newheadY){
        food = foodGeneration();
    }
    else{
        snakeCells.shift();
    }
    //snakeCells.shift();
}

document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowUp'){
        direction = 'up'
    }
    else if(e.key === 'ArrowRight'){
        direction ='right'
    }
    else if(e.key === 'ArrowDown'){
        direction ='down'
    }
    else if(e.key === 'ArrowLeft'){
        direction ='left'
    }
})

setInterval(function(){
    update();
    draw();
},300)
