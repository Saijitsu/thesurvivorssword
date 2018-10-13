// Global Variable
var numbersOfPlayers = 2;
var obstacleCell = parseInt(document.getElementById("sliderObstacle").value);
var chestCell = parseInt(document.getElementById("sliderChest").value);
var highLightning = [];
var boardSize = parseInt(document.getElementById("sliderMap").value);
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
var currentCellPosition = 0;
var randomList = [];

// User-defined settings
function userDefinedSettings() {
    obstacleCell = parseInt(document.getElementById("sliderObstacle").value)
    chestCell = parseInt(document.getElementById("sliderChest").value)
    boardSize = parseInt(document.getElementById("sliderMap").value)
    rows = boardSize
    columns = boardSize
    width = columns * 50;
    height = rows * 50;
    totalCells = columns * rows;
}

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


function createRandomCellList() { // Arry of random list of total cells.
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
    randomList = new Array();
    for (i = 0; i < totalCells; i++) {
        randomList[i] = i;
    }

    randomList.shuffle();
    console.log(randomList.join());
}


function containType() { // Contain of the board!
    obstacleCell = parseInt(document.getElementById("sliderObstacle").value)
    chestCell = parseInt(document.getElementById("sliderChest").value)
    boardSize = parseInt(document.getElementById("sliderMap").value)
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
    var oneHundredY = getRandomIntInclusive(0, boardSize - 1);
    var oneHundredX = getRandomIntInclusive(0, boardSize - 1);
    oneHundredDeduceY = oneHundredY
    oneHundredDeduceX = oneHundredX

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

function currentPlayerIs() {
    if (currentPlayer == players[0]) {
        currentPlayer = players[1]
        $("#player2").addClass("currentPlayerIs2");
        $("#player1").removeClass("currentPlayerIs1");
        $(".naviGif").empty()
        $(".naviGif").append("<img src='../image/shadowNavi.gif'></img>")
        $("#duel").css("background", "linear-gradient(180deg, rgb(106, 47, 243) 20%, rgb(180, 49, 241) 30%, rgb(255, 255, 255) 60%, transparent 62%, transparent 100%), url('../image/DuelBackground.gif') no-repeat bottom")
        return currentPlayer
    } else {
        currentPlayer = players[0]
        $("#player1").addClass("currentPlayerIs1");
        $("#player2").removeClass("currentPlayerIs2");
        $(".naviGif").empty()
        $(".naviGif").append("<img src='../image/navi.gif'></img>")
        $("#duel").css("background", "linear-gradient(180deg, rgb(61, 189, 248) 20%, rgb(66, 212, 248) 30%, rgb(255, 255, 255) 60%, transparent 62%, transparent 100%), url('../image/DuelBackground.gif') no-repeat bottom")
        return currentPlayer
    }
}

function updateStatistics() {
    for (i = 0; i < 2; i++) {
        var valueToTransform = players[i].weapon.name;
        var regex = / /gi;
        var weaponIcon = (valueToTransform.replace(regex, "_"));
        var heart = "#";
        var emptyHeart = "*";
        var nbHeart = Math.max(0, Math.round(players[i].heal / 10));
        // if value < 0, return 0 as the max value of this method.
        var nbEmptyHeart = 10 - nbHeart

        $("#player" + i + "Heal").empty();
        $("#player" + i + "HealStat2").empty();
        $("#player" + i + "Weapon").empty();
        $("#player" + i + "ImgWeapon").empty();
        $("#player" + i + "WeaponPower").empty();
        $("#player" + i + "Heal").append(heart.repeat(nbHeart) + emptyHeart.repeat(nbEmptyHeart));
        $("#player" + i + "HealStat2").append(Math.max(0, players[i].heal) + "/100");
        $("#player" + i + "Weapon").append(players[i].weapon.name);
        $("#player" + i + "ImgWeapon").append("<div class=\"" + weaponIcon + " imageRotate\"></div>");
        $("#player" + i + "WeaponPower").append(players[i].weapon.power);
    }
};

var sliderMap = document.getElementById("sliderMap");
var outputMap = document.getElementById("sliderMapValue");
outputMap.innerHTML = sliderMap.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
sliderMap.oninput = function () {
    outputMap.innerHTML = this.value;
}

var sliderObstacle = document.getElementById("sliderObstacle");
var outputObstacle = document.getElementById("sliderObstacleValue");
outputObstacle.innerHTML = sliderObstacle.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
sliderObstacle.oninput = function () {
    outputObstacle.innerHTML = this.value;
}

var sliderChest = document.getElementById("sliderChest");
var outputChest = document.getElementById("sliderChestValue");
outputChest.innerHTML = sliderChest.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
sliderChest.oninput = function () {
    outputChest.innerHTML = this.value;
}

function shakeBottleImage() {
    $(".naviGif").parent().addClass("vibrate");
    setTimeout(function () {
    $(".naviGif").parent().removeClass("vibrate");
}, 1600); //animation time, waiting to remove.
}

//Game music
$("#menuMusicButton").click(function () {
    change_track(menuMusic);
    var audio = document.getElementById("myAudio");
    audio.volume = 0.1;
});

$("#muteMusicButton").click(function () {
    var audio = document.getElementById("myAudio");
    audio.volume = 0.0;
});

$(function () { //Low audio volume
    var audio = document.getElementById("myAudio");
    audio.volume = 0.1;
});

function heyListen() {
    var audio = new Audio("../audio/heyListen.mp3");
    audio.play();
    audio.volume = 0.2;
}
var menuMusic = src = "http://66.90.93.122/ost/legend-of-zelda-ocarina-of-time-original-sound-track/onwohiey/05%20-%20House.mp3"
//menuMusic create because autoplay doesn't work on Google Chrome since version 66: change_track(adventureMusic)
var adventureMusic = src = "http://66.90.93.122/ost/legend-of-zelda-ocarina-of-time-original-sound-track/nuyjimms/06%20-%20Kokiri%20Forest.mp3"
var fightMusic = src = "http://66.90.93.122/ost/legend-of-zelda-ocarina-of-time-original-sound-track/hlcsbajc/79%20-%20Last%20Battle.mp3"
var victoryMusic = src = "http://66.90.93.122/ost/legend-of-zelda-ocarina-of-time-original-sound-track/ikoatnrm/49%20-%20Medal%20Get%20Fanfare.mp3"

function change_track(sourceUrl) {
    var audio = $("#myAudio");
    $("#mp3_src").attr("src", sourceUrl);
    audio[0].pause();
    audio[0].load(); //suspends and restores all audio element
    audio[0].oncanplaythrough = audio[0].play();
}

// CODE IN PROGRESS
function fight() {
    var opponentPlayer = currentPlayer.opponent();
    if (currentPlayer.defensiveStance == true) {
        return currentPlayer.changeOfPlayerSDuelTurn()
    }
    var duelIsEnd = false;
    while (duelIsEnd == false) {
        if (opponentPlayer.heal > 0) {
            if (opponentPlayer.defensiveStance == true) {
                opponentPlayer.heal = opponentPlayer.heal - currentPlayer.dommageDeal() / 2;
                opponentPlayer.defensiveStance == false;
                updateStatistics()
            } else if (opponentPlayer.defensiveStance == undefined || opponentPlayer.defensiveStance == false) {
                opponentPlayer.heal = opponentPlayer.heal - currentPlayer.dommageDeal();
                updateStatistics();
            }
            if (opponentPlayer.heal > 0) {
                setTimeout(function () {
                    shakeBottleImage()
                    $("#chatText").text(opponentPlayer.name + " has " + opponentPlayer.heal + " heal points!")
                }, 1200);
            } else {
                setTimeout(function () {
                    shakeBottleImage()
                    $("#chatText").text(opponentPlayer.name + " was overhit!")
                }, 1000);
            }
        }
        if (opponentPlayer.heal <= 0) {
            updateStatistics()
            change_track(victoryMusic)
            setTimeout(function () {
                shakeBottleImage()
                $("#chatText").text(opponentPlayer.name + " is unconscious! " + currentPlayer.name + " is the winner!")
            }, 2000);
            duelIsEnd = true;
            break;
        }
        opponentPlayer.defensiveStance == false
        currentPlayer.changeOfPlayerSDuelTurn()
        break;
    }
}