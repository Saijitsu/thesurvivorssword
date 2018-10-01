////////////////////////////////////// BOARD CREATION: GAME'S MAP //////////////////////////////////////////

/* Creation du BOARD N*N ----------------------------------------------------------------------
 NOTICE DU BOARD:
The convention when talking about a matrix is the use of "generic" variable names x and y.  
In such discussions, x is always the column index (distance from the left) 
and y is the row index (distance from the top).  
So a y,x of [0][0] identifies the item at the top left.  
[0][1] is the second item on the top row, [1][n] is on the second row and so forth.
*/

function Map(rows, columns, width, height) {
    this.rows = rows;
    this.columns = columns;
    this.width = width;
    this.height = height;
    this.totalCells = this.rows * this.columns;
}

function Cell(contain, numberCell, y, x, freeCell, design, highLightning) {
    this.contain = contain;
    this.numberCell = numberCell;
    this.y = y;
    this.x = x;
    this.freeCell = freeCell; // true by defaut
    this.design = design;
    this.highLightning = false; // false by defaut
    
}

// Les caractéristiques de la Map
var myMap = new Map(rows, columns, width, height);

// creation du tableau
var board = new Array(myMap.columns);
for (var i = 0; i < myMap.rows; i++) {
    board[i] = new Array(myMap.rows);
}

// définition du contenu du tableau
for (var y = 0; y < (board.length); y++) {
    for (var x = 0; x < (board.length); x++) {

        // create the object and store a reference to the cell object so you can do something with it later
        var currentCellPosition = x + y * board.length;
        var containTypeCell = containType(x, y, board.length, board, currentCellPosition)
        board[y][x] = containTypeCell
    }
}
console.log(board);