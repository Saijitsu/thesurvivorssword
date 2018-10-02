// Variables gobales et variables définies par l'utilisateur
var numbersOfPlayers = 2;
var obstacleCell = 10;
var chestCell = 4;
var currentPlayer = null;
var highLightning = [];
var rows = 10;
var columns = 10;
var width = columns * 50;
var height = rows * 50;
var totalCells = rows * columns;
var cellList = [];
var tilePixelCut = 50;
var yOnClick = null;
var xOnClick = null;

// modify CSS elements
var elmt = document.getElementById("canvas");

// modify style
elmt.style.background = getGradiantBackground();
elmt.style.border = "1px solid white";
elmt.width = width;
elmt.height = height;

function getGradiantBackground() {
    var valuesOfHex = ["#9dc183", "#708238", "#00A86B", "#00A572", "#66FF66", "#B4D7BF", "#66CDAA", "#36DBCA", "#0AC92B", "#BCED91", "#8CDD81", "#90FEFB"];
    var firstColor = valuesOfHex[Math.floor(Math.random() * valuesOfHex.length)];
    var secondColor = valuesOfHex[Math.floor(Math.random() * valuesOfHex.length)];
    var angle = Math.round(Math.random() * 360);

    var value = "linear-gradient(" + angle + "deg, " + firstColor + ", " + secondColor + ")";
    return value
}

// TOOLS SECTION : OUTILS POUR CREER L'ALEA DU BOARD
// Board de 100 Cellules rangées dans un ordre aléatoire (entre 0 et 99).
function randomInt(mini, maxi) {
    var nb = mini + (maxi + 1 - mini) * Math.random();
    return Math.floor(nb);
}

Array.prototype.shuffle = function (n) {
    if (!n)
        n = this.length;
    if (n > 1) {
        var i = randomInt(0, n - 1);
        var tmp = this[i];
        this[i] = this[n - 1];
        this[n - 1] = tmp;
        this.shuffle(n - 1);
    }
}
var randomList = new Array();
for (i = 0; i < totalCells; i++) {
    randomList[i] = i;
}

randomList.shuffle(); // on mélange les éléments du tableau
console.log(randomList.join());

function containType() { // Contain of the board!
    for (var i = 0; i < obstacleCell; i++) {
        if (currentCellPosition == randomList[i]) {
            var designIs = getRandomIntInclusive(1, 3);
            var cell = new Cell(1, currentCellPosition, y, x, false, designIs);
            return cell; // Affectation des cellules obstacles 
        }
    }
    for (var j = obstacleCell; j < obstacleCell + chestCell; j++) {
        if (currentCellPosition == randomList[j]) {
            var selectEntry = Math.floor(Math.random() * weaponsEntry.length);
            weaponsId = weaponsEntry[selectEntry];
            var cell = new Cell(weapons[weaponsId], currentCellPosition, y, x, true);
            weaponsEntry.splice(selectEntry, 1);
            return cell; // Affectation des coffres   
        }
    }
    if (currentCellPosition == randomList[obstacleCell + chestCell]) {
        var cell = new Cell(players[0], currentCellPosition, y, x, false);
        players[0].position = cell.numberCell;
        players[0].y = y;
        players[0].x = x;
        return cell; // Affectation du Joueur 1
    } else if (currentCellPosition == randomList[obstacleCell + chestCell + 1]) {
        if (players[1].characterNear(x, y, board.length, board, numberToTest = randomList[obstacleCell + chestCell + 1]) == false) {
            var cell = new Cell(players[1], currentCellPosition, y, x, false);
            players[1].position = cell.numberCell;
            players[1].y = y;
            players[1].x = x;
            return cell; // Safe zone: Affectation du Joueur 2
        } else if (players[1].characterNear(x, y, board.length, board, numberToTest = randomList[obstacleCell + chestCell + 1]) == true) {
            players[1].changeDropArea() // Unsafe zone: Nouvelle Affectation du Joueur 2
            var cell = new Cell(0, currentCellPosition, y, x, true);
            return cell; // Joueur 1 proche: Affectation d'une cellule vide.
        }
    } else {
        if (board[y][x] !== undefined) {
            var cell = new Cell(players[1], currentCellPosition, y, x, false);
            players[1].position = cell.numberCell;
            players[1].y = y;
            players[1].x = x;
            return cell; // Confirmation de la Cellule Joueur 2{
        } else {
            var designIs = getRandomIntInclusive(1, 3);
            var cell = new Cell(0, currentCellPosition, y, x, true, designIs);
            return cell; // Affectation par défaut de cellules vides
        }
    }
};

// On renvoie un entier aléatoire entre une valeur min (incluse)
// et une valeur max (incluse).
// Attention : si on utilisait Math.round(), on aurait une distribution
// non uniforme !
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Return where user click on canvas.*
////////////////////LE CANVAS////////////////////////////
// Return where user click on canvas.
canvas.addEventListener("click", function (e) {
    var getMousePositionYX = getMousePosition(canvas, e);
    var getMousePositionY = getMousePositionYX[0];
    var getMousePositionX = getMousePositionYX[1];
    yOnClick = (Math.floor(getMousePositionY / tilePixelCut));
    xOnClick = (Math.floor(getMousePositionX / tilePixelCut));
    var message = 'Mouse click position is: ' + yOnClick + ',' + xOnClick;
    writeMessage(message);
    if (board[yOnClick][xOnClick].highLightning == true) {
        if (board[yOnClick][xOnClick].contain == 0) { // Empty Cell
            clickEmptyCell(yOnClick, xOnClick)
        } else { // Chest Cell
            clickChestCell(yOnClick, xOnClick)
        }
        currentPlayer.position = parseInt(String(yOnClick) + String(xOnClick));
        currentPlayer.y = yOnClick;
        currentPlayer.x = xOnClick;

        clearCurrentPlayerHighLightning(); // Clear High Lightning Cell

        draw(); // Update canvas

        currentPlayer.changeOfPlayerSTour();
    }
}, false);

function getMousePosition(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left
    var y = e.clientY - rect.top
    return [y, x]
}

function clickEmptyCell() {
    board[yOnClick][xOnClick].contain = currentPlayer;
    board[yOnClick][xOnClick].freeCell = false;

    if (currentPlayer.weaponToDeposited == undefined) { // If no weapon to drop
        board[currentPlayer.y][currentPlayer.x].contain = 0;
        board[currentPlayer.y][currentPlayer.x].freeCell = true;
    } else { // If weapon to drop
        board[currentPlayer.y][currentPlayer.x].contain = currentPlayer.weaponToDeposited;
        currentPlayer.weaponToDeposited = undefined;
        board[currentPlayer.y][currentPlayer.x].freeCell = true;
    }
    board[currentPlayer.y][currentPlayer.x].contain == 0;
    board[currentPlayer.y][currentPlayer.x].freeCell = true;
}

function clickChestCell() {
    for (var weaponId = 0; weaponId < weapons.length; weaponId++) {
        if (board[yOnClick][xOnClick].contain == weapons[weaponId]) {
            board[yOnClick][xOnClick].contain = currentPlayer;
            board[yOnClick][xOnClick].freeCell = false;

            if (currentPlayer.weaponToDeposited == undefined) { // If no weapon to drop
                board[currentPlayer.y][currentPlayer.x].contain = 0;
                board[currentPlayer.y][currentPlayer.x].freeCell = true;
                currentPlayer.weaponToDeposited = currentPlayer.weapon;
            } else { // If already a weapon to drop
                board[currentPlayer.y][currentPlayer.x].contain = currentPlayer.weaponToDeposited;
                currentPlayer.weaponToDeposited = currentPlayer.weapon;
                board[currentPlayer.y][currentPlayer.x].freeCell = true;
            }
            currentPlayer.weapon = weapons[weaponId]; // New weapon equiped
            currentPlayer.weapon.worn = true;
        }
    }
}

function clearCurrentPlayerHighLightning() {
    for (var checkElement = 0; checkElement < highLightning.length; checkElement++) {
        deduceYX = highLightning[checkElement]
        var deduceY = cellList[deduceYX].y
        var deduceX = cellList[deduceYX].x
        board[deduceY][deduceX].highLightning = false;
    }
}
/*method which returns the mouse coordinates based on the position 
 of the client mouse and the position of the canvas obtained from 
 the getBoundingClientRect() method of the window object:
 The Element.getBoundingClientRect() method returns 
 the size of an element and its position relative to the viewport*/

function writeMessage(message) {
    console.log(message)
}