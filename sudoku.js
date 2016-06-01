// Sudoku

var _gridSize = 9;
var _boxWidth = 3;
var _defaultBoxes = [];
var _boxes = _boxes || false;

function init_sudoku(){
  for (var i = 0; i < _gridSize; i++){
    _defaultBoxes[i] = boxFromQuad(i);
  }
  _boxes = _boxes || _defaultBoxes;
}

function boxFromQuad(quad){
  var rowStart = _boxWidth*(quad%_boxWidth);
  var colStart = _boxWidth*Math.floor(quad/_boxWidth);
  var box = [];
  for (var i = 0; i < _gridSize/_boxWidth; i++){
    for (var j = 0; j < _boxWidth; j++){
      box[_boxWidth*i+j] = [rowStart+i, colStart+j];
    }
  }
  return box;
}

function arrEq(arr1, arr2){
  if (arr1.length !== arr2.length){
    return false;
  }
  for (var i = 0; i < arr1.length; i++){
    if (arr1[i] !== arr2[i]){
      return false;
    }
  }
  return true;
}

function checkRow(row){
  rowSet = new Set(row);
  console.log(rowSet.size);
  if (rowSet.size != _gridSize) return false;
  for (var i = 1; i <= _gridSize; i++){
    if (!rowSet.has(i)){
     console.log("Doesn't have " + i);
     return false;
    }
  }
  return true;
}

function check(grid){
  // var valid = true;
  var error = [];

  // Row check. Row error is type 0.
  for (var i=0; i<_gridSize; i++){
    var row = grid[i].slice(0);
    if (!checkRow(row)){
     // console.log("Row " + i);
     // valid = false;
     error.push([0,i]);
    }
  }

  // Column check. Column error is type 1.
  for (var i=0; i < _gridSize; i++){
    var col=[];
    for (var j=0; j < _gridSize; j++){
      col[j] = grid[j][i];
    }
    if (!checkRow(col)) {
      // console.log("Column " + i);
      // valid = false;
      error.push([1,i]);
    }
  }

  // Box check
  for (var i = 0; i < _gridSize; i++){
    var box = [];
    for (var j = 0; j < _gridSize; j++){
      box[j] = grid[_boxes[i][j][0]][_boxes[i][j][1]]; // Something breaks here
    }
    if (!checkRow(box)){
      // console.log("Box "+i+" failed");
      // valid = false;
      error.push([2,i]);
    }
  }

  if (error.length == 0){
    return true;
  } else {
    return error;
  }
}

var sudoku = [
  [1,2,3,4,5,6,7,8,9],
  [4,5,6,7,8,9,2,1,3],
  [7,8,9,2,1,3,4,5,6],
  [1,3,4,5,6,7,8,9,2],
  [5,6,7,8,9,2,1,3,4],
  [8,9,2,1,3,4,5,6,7],
  [3,4,5,6,7,8,9,2,1],
  [6,7,8,9,2,1,3,4,5],
  [9,2,1,3,4,5,6,7,8]
];

init_sudoku();
