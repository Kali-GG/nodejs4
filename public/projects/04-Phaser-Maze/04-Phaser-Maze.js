var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-div', { preload: preload, create: create });



  //game.renderer.renderSession.roundPixels = true;
  //stage.backgroundColor = '#204090';

var cellSize, cols, rows, current, bmd = null;
var cells = [];
var exploredPath = [];

function preload() {
}



function create() {
  game.stage.backgroundColor = '#123';
  bmd = game.add.bitmapData(game.width, game.height);
  bmd.addToWorld();

  cellSize = 20;
  cols = Math.floor(game.width / cellSize);
  rows = Math.floor(game.height / cellSize);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      cells.push(new cell(x, y));
    }
  }

  for (let i=0; i< cells.length; i++) {
    cells[i].show();
    cells[i].checkNeighbours();
  }

  current = 0;
  game.time.events.repeat(Phaser.Timer.SECOND * 0.001, 5000, update, this);
}



function update() {
  bmd.clear();
  let next = null;

  cells[current].getUnvisitedNeigbours();

  if(cells[current].unvisitedNeighbours.length >= 1) {
    next = cells[current].unvisitedNeighbours[getRandomIntInclusive(0, cells[current].unvisitedNeighbours.length-1)];

    if (current-cols == next) {
      cells[current].walls[0] = 0;
      cells[next].walls[2] = 0;
    }
    if (current+1 == next) {
      cells[current].walls[1] = 0;
      cells[next].walls[3] = 0;
    }
    if (current+cols == next) {
      cells[current].walls[2] = 0;
      cells[next].walls[0] = 0;
    }
    if (current-1 == next) {
      cells[current].walls[3] = 0;
      cells[next].walls[1] = 0;
    }
    exploredPath.push(current);
  }
  else {
    //next is last from exploredPath
    next = exploredPath[exploredPath.length-1];
    exploredPath.pop();
  }

  if (cells[current].visited == false) {
    cells[current].visited = true;
  }


  for (let i=0; i< cells.length; i++) {
    cells[i].show();
  }
  bmd.rect(cells[current].x * cellSize, cells[current].y * cellSize, cellSize, cellSize, '#2196F3');


  current = next;
}

function cell(x,y) {
  this.x = x;
  this.y = y;
  this.visited = false;
  this.walls = [1, 1, 1, 1]; //top, right, bottom, left
  this.neighbours = [];

  this.show = function() {
    if (this.visited == true) {
      bmd.rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize, '#009688');
    }
    if (this.walls[0]) {
      bmd.line(this.x * cellSize, this.y * cellSize, (this.x+1) * cellSize, this.y * cellSize, '#aaa', 2);
    }
    if (this.walls[1]) {
      bmd.line((this.x+1) * cellSize, this.y * cellSize, (this.x+1) * cellSize, (this.y+1)  *cellSize, '#aaa', 2);
    }
    if (this.walls[2]) {
      bmd.line((this.x) * cellSize, (this.y+1) * cellSize, (this.x+1) * cellSize, (this.y+1) * cellSize, '#aaa', 2);
    }
    if (this.walls[3]) {
      bmd.line(this.x * cellSize, this.y * cellSize, this.x * cellSize, (this.y+1) * cellSize, '#aaa', 2);
    }
  }

  this.checkNeighbours = function() {
    let index = this.x + this.y * cols;

    if (this.y > 0) {this.neighbours.push(index - cols);}
    if (this.x < cols-1) {this.neighbours.push(index + 1);}
    if (this.y < rows-1) {this.neighbours.push(index + cols);}
    if (this.x > 0) {this.neighbours.push(index - 1);}
    /*
     neighbours.push((this.y > 0) ? index - cols : 0);
     neighbours.push((this.x < cols) ? index + 1: 0);
     neighbours.push((this.y < rows) ? index + cols : 0);
     neighbours.push((this.x > 0) ? index - 1 : 0);
     */
  }

  this.getUnvisitedNeigbours = function() {
    this.unvisitedNeighbours = [];
    for (let i = 0; i< this.neighbours.length; i++) {
      if (cells[this.neighbours[i]].visited == false) {
        this.unvisitedNeighbours.push(this.neighbours[i]);
      }
    }
  }

}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
