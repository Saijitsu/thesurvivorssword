// Global Variable
var numbersOfPlayers = 2;
var obstacleCell = 10;
var chestCell = 4;
var highLightning = [];
var boardSize = 10;
var rows = boardSize;
var columns = boardSize;
var width = columns * 50;
var height = rows * 50;
var totalCells = rows * columns;
var cellList = [];
var tilePixelCut = 50;
var currentPlayer = null;
var yOnClick = null;
var xOnClick = null;
var oneHundredDeduceY = null;
var oneHundredDeduceX = null;

// Modify CSS elements
var elmt = document.getElementById("canvas");

// Modify style
elmt.style.background = getGradiantBackground();
elmt.style.border = "1px solid white";
elmt.width = width;
elmt.height = height;

function getGradiantBackground() {
    var valuesOfHex = ["#9dc183", "#708238", "#00A86B", "#00A572", "#66FF66",
        "#B4D7BF", "#66CDAA", "#36DBCA", "#0AC92B", "#BCED91", "#8CDD81", "#90FEFB"
    ];
    var firstColor = valuesOfHex[Math.floor(Math.random() * valuesOfHex.length)];
    var secondColor = valuesOfHex[Math.floor(Math.random() * valuesOfHex.length)];
    var angle = Math.round(Math.random() * 360);

    var value = "linear-gradient(" + angle + "deg, " + firstColor + ", " + secondColor + ")";
    return value
}

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

randomList.shuffle();
console.log(randomList.join());

function containType() { // Contain of the board!
    for (var i = 0; i < obstacleCell; i++) {
        if (currentCellPosition == randomList[i]) {
            var designIs = getRandomIntInclusive(1, 3);
            var cell = new Cell(1, currentCellPosition, y, x, false, designIs);
            return cell; // obstacle cell 
        }
    }
    for (var j = obstacleCell; j < obstacleCell + chestCell; j++) {
        if (currentCellPosition == randomList[j]) {
            var selectEntry = Math.floor(Math.random() * weaponsEntry.length);
            weaponsId = weaponsEntry[selectEntry];
            var cell = new Cell(weapons[weaponsId], currentCellPosition, y, x, true);
            weaponsEntry.splice(selectEntry, 1);
            return cell; // Chest cell  
        }
    }
    if (currentCellPosition == randomList[obstacleCell + chestCell]) {
        var cell = new Cell(players[0], currentCellPosition, y, x, false);
        players[0].position = cell.numberCell;
        players[0].y = y;
        players[0].x = x;
        return cell; // player 1 confirmed
    } else if (currentCellPosition == randomList[obstacleCell + chestCell + 1]) {
        if (players[1].characterNear(x, y, board.length, board,
                numberToTest = randomList[obstacleCell + chestCell + 1]) == false) {
            var cell = new Cell(players[1], currentCellPosition, y, x, false);
            players[1].position = cell.numberCell;
            players[1].y = y;
            players[1].x = x;
            return cell; // Safe zone: player 2 confirmed
        } else if (players[1].characterNear(x, y, board.length, board,
                numberToTest = randomList[obstacleCell + chestCell + 1]) == true) {
            players[1].changeDropArea() // Unsafe zone: Player 2 need new location.
            var cell = new Cell(0, currentCellPosition, y, x, true);
            return cell; // Player 1 near, Empty cell dropped.
        }
    } else {
        if (board[y][x] !== undefined) {
            var cell = new Cell(players[1], currentCellPosition, y, x, false);
            players[1].position = cell.numberCell;
            players[1].y = y;
            players[1].x = x;
            return cell; // player 2 confirmed
        } else {
            var designIs = getRandomIntInclusive(1, 3);
            var cell = new Cell(0, currentCellPosition, y, x, true, designIs);
            return cell; // Empty Cells by default.
        }
    }
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*Return where user click on canvas: 
method which returns the mouse coordinates based on the position 
 of the client mouse and the position of the canvas obtained from 
 the getBoundingClientRect() method of the window object:
 The Element.getBoundingClientRect() method returns 
 the size of an element and its position relative to the viewport*/
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
        currentPlayer.position = xOnClick + yOnClick * board.length;
        currentPlayer.y = yOnClick;
        currentPlayer.x = xOnClick;

        clearCurrentPlayerHighLightning(); // Clear High Lightning Cell

        draw(); // Update canvas

        currentPlayer.changeOfPlayerSTurn();
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

function writeMessage(message) {
    console.log(message)
}

function moreThanOneHundredCells() { // New Player 2 drop location
    var min = obstacleCell + chestCell + 1;
    oneHundredDeduceY = getRandomIntInclusive(0, boardSize - 1);
    oneHundredDeduceX = getRandomIntInclusive(0, boardSize - 1);
    var cellWhereToDrop = oneHundredDeduceX + oneHundredDeduceY * board.length;
    for (i = 0; i < min; i++) {
        if (randomList[i] == randomList[cellWhereToDrop]) {
            return moreThanOneHundredCells();
        }
    }
    if (players[1].characterNear(oneHundredDeduceX, oneHundredDeduceY, board.length, board, numberToTest = randomList[cellWhereToDrop]) == false) {
        return [oneHundredDeduceY, oneHundredDeduceX, cellWhereToDrop]
    } else {
        return moreThanOneHundredCells();
    }
}

function lessThanOneHundredCells() { // New Player 2 drop location
    var min = obstacleCell + chestCell + numbersOfPlayers;
    var max = totalCells - 1;
    var numberDropTry = getRandomIntInclusive(min, max);
    if (players[1].characterNear(x, y, board.length, board, numberToTest = randomList[numberDropTry]) == false) {
        var cellWhereToDrop = randomList[numberDropTry];
        chaineTransform = cellWhereToDrop.toString()
        /*chn.substr(early[, length])
                   The substr() method extracts parts of a string, beginning at the character 
                   at the specified position, and returns the specified number of characters.*/
        if (cellWhereToDrop < 10) {
            var deduceY = 0;
            var deduceX = cellWhereToDrop;
        } else if (cellWhereToDrop >= 10) {
            var deduceY = parseInt(chaineTransform.substr(0, 1));
            var deduceX = parseInt(chaineTransform.substr(1, 1));
        }
        return [deduceY, deduceX, cellWhereToDrop]
    } else {
        return lessThanOneHundredCells()
    }
}