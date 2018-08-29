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
    this.numberCase = null;
}

// Les caractéristiques de la Map
var myMap = new Map(10, 10, 500, 500);

// Création du board
var board = new Array(myMap.columns);
for (var i = 0; i < myMap.rows; i++) {
    board[i] = new Array(myMap.rows);
}
console.log(board)

// Les Cell sur la Map
function Cell(contain) {
    this.contain = contain;
    //this.numberCase = null;
}


var emptyCase = new Cell(0);
var obstacleCase = new Cell(1);
var chestCase = new Cell(3);
var player1Case = new Cell(101);
var player2Case = new Cell(102);

// Les Terrains -------------------------------------------------------------------------------
// RAPPEL: rows = Y values /Columns = X values
                                       // Map.prototype.creation = function () {}
                                       //Map.prototype.creation()

for (var y = 0; y < (board.length); y++) {
    for (var x = 0; x < (board.length); x++) {
        board[y][x] = emptyCase // Affectation par défaut de cellules vides
        if ((x + y * board.length) == randomList[0] || (x + y * board.length) == randomList[1] || (x + y * board.length) == randomList[2] ||
            (x + y * board.length) == randomList[3] || (x + y * board.length) == randomList[4] || (x + y * board.length) == randomList[5] ||
            (x + y * board.length) == randomList[6] || (x + y * board.length) == randomList[7] || (x + y * board.length) == randomList[8] ||
            (x + y * board.length) == randomList[9]) {
            board[y][x] = obstacleCase; // Affectation des cellules obstacles
        };
        if ((x + y * board.length) == randomList[10] || (x + y * board.length) == randomList[11] || (x + y * board.length) == randomList[12] ||
            (x + y * board.length) == randomList[13]) {
            board[y][x] = chestCase; // Affectation des cellules coffres
        };
        if ((x + y * board.length) == randomList[14]) {
            board[y][x] = player1Case; // Affectation du Joueur 1
            player1LocationY = (valueof = y);
            player1LocationX = (valueof = x);
        };
        if ((x + y * board.length) == randomList[15]) {
            board[y][x] = player2Case; // Affectation du Joueur 2 => RESTE A RENDRE FONCTIONNEL L'ALGORITHME DE COLLISION
            player2LocationY = (valueof = y);
            player2LocationX = (valueof = x);
        }
    }
}

/*Map.prototype.numberCase = function () {
    return x + y * board.length
}*/