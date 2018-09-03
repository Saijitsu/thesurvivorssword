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

function Cell(contain, numberCase, y, x, freeCell) {
    this.contain = contain;
    this.numberCase = numberCase;
    this.y = y;
    this.x = x;
    this.freeCell = freeCell;
}

// Les caractéristiques de la Map
var myMap = new Map(10, 10, 500, 500);

// creation du tableau
var board = new Array(myMap.columns);
for (var i = 0; i < myMap.rows; i++) {
    board[i] = new Array(myMap.rows);
}

// définition du contenu du tableau

var nbCell = Number(x + y * board.length);

for (var y = 0; y < (board.length); y++) {
    for (var x = 0; x < (board.length); x++) {
        // build a algorithme to reference them
        var nbCell = Number(x + y * board.length);
        // create the object and store a reference to the cell object so you can do something with it later
        var containTypeCall = containType(x, y, board.length, board)
        var yCell = y;
        var xCell = x;
        var cellStatut = testIfFree(x, y, board.length, board)
        var cell = new Cell(containTypeCall, nbCell, yCell, xCell, cellStatut);
        // build list of references
        board[y][x] = cell
    }
}

console.log(board);



