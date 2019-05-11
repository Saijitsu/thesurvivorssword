// Global Variable (no ALL_CAPS standard at the moment)
var numbersOfPlayers = 2;
var obstacleCell = null;
var chestCell = null;
var highLightning = [];
var boardSize = null;
var rows = boardSize;
var columns = boardSize;
var width = columns * 50;
var height = rows * 50;
var totalCells = rows * columns;
var cellList = [];
var tilePixelCut = 50;
var currentPlayer = null;
var opponentPlayer = null;
var yOnClick = null;
var xOnClick = null;
var oneHundredDeduceY = null;
var oneHundredDeduceX = null;
var currentCellPosition = 0;
var randomList = [];

var sliderMapValue = document.getElementById("slider-map");
var outputMap = document.getElementById("slider-map-value");
outputMap.innerHTML = sliderMapValue.value// Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderMapValue.oninput = function() {
    outputMap.innerHTML = this.value;
}
var sliderObstacleValue = document.getElementById("slider-obstacle");
var outputObstacle = document.getElementById("slider-obstacle-value");
outputObstacle.innerHTML = sliderObstacleValue.value// Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderObstacleValue.oninput = function() {
    outputObstacle.innerHTML = this.value;
}
var sliderChestValue = document.getElementById("slider-chest");
var outputChest = document.getElementById("slider-chest-value");
outputChest.innerHTML = sliderChestValue.value// Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sliderChestValue.oninput = function() {
    outputChest.innerHTML = this.value;
}

// User-defined settings
function userDefinedSettings() {
    obstacleCell = parseInt(document.getElementById("slider-obstacle").value)
    chestCell = parseInt(document.getElementById("slider-chest").value)
    boardSize = parseInt(document.getElementById("slider-map").value)
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
}


function containType() { // Contain of the board!
    for (var i = 0; i < obstacleCell; i++) {
        if (currentCellPosition === randomList[i]) {
            var cell = createObstacleCell()
            return cell
        }
    }
    for (var j = obstacleCell; j < obstacleCell + chestCell; j++) {
        if (currentCellPosition === randomList[j]) {
            var cell = createChestCell()
            return cell
        }
    }
    if (currentCellPosition === randomList[obstacleCell + chestCell]) {
        var cell = createPlayer1Cell()
        return cell
    } else if (currentCellPosition === randomList[obstacleCell + chestCell + 1]) {
        var cell = createPlayer2Cell()
        return cell
    } else {
        var cell = createEmptyCell()
        return cell
    }
};

function createEmptyCell() {
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

function createObstacleCell() {
    var designIs = getRandomIntInclusive(1, 3);
    var cell = new Cell(1, currentCellPosition, y, x, false, designIs);
    return cell; // obstacle cell
}

function createChestCell() {
    var selectEntry = Math.floor(Math.random() * weaponsEntry.length);
    weaponsId = weaponsEntry[selectEntry];
    var cell = new Cell(weapons[weaponsId], currentCellPosition, y, x, true);
    weaponsEntry.splice(selectEntry, 1);
    return cell; // Chest cell
}

function createPlayer1Cell() {
    var cell = new Cell(players[0], currentCellPosition, y, x, false);
    players[0].position = cell.numberCell;
    players[0].y = y;
    players[0].x = x;
    return cell; // player 1 confirmed
}

function createPlayer2Cell() {
    if (players[1].characterNear(x, y, board.length, board,
            numberToTest = randomList[obstacleCell + chestCell + 1]) === false) {
        var cell = new Cell(players[1], currentCellPosition, y, x, false);
        players[1].position = cell.numberCell;
        players[1].y = y;
        players[1].x = x;
        return cell; // Safe zone: player 2 confirmed
    } else if (players[1].characterNear(x, y, board.length, board,
            numberToTest = randomList[obstacleCell + chestCell + 1]) === true) {
        players[1].changeDropArea() // Unsafe zone: Player 2 need new location.
        var cell = new Cell(0, currentCellPosition, y, x, true);
        return cell; // Player 1 near, Empty cell dropped.
    }
}

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
    if (board[yOnClick][xOnClick].highLightning === true) {
        if (board[yOnClick][xOnClick].contain === 0) { // Empty Cell
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

    if (currentPlayer.weaponToDeposited === undefined) { // If no weapon to drop
        board[currentPlayer.y][currentPlayer.x].contain = 0;
        board[currentPlayer.y][currentPlayer.x].freeCell = true;
    } else { // If weapon to drop
        board[currentPlayer.y][currentPlayer.x].contain = currentPlayer.weaponToDeposited;
        currentPlayer.weaponToDeposited = undefined;
        board[currentPlayer.y][currentPlayer.x].freeCell = true;
    }
    board[currentPlayer.y][currentPlayer.x].contain === 0;
    board[currentPlayer.y][currentPlayer.x].freeCell = true;
}

function clickChestCell() {
    for (var weaponId = 0; weaponId < weapons.length; weaponId++) {
        if (board[yOnClick][xOnClick].contain === weapons[weaponId]) {
            board[yOnClick][xOnClick].contain = currentPlayer;
            board[yOnClick][xOnClick].freeCell = false;

            if (currentPlayer.weaponToDeposited === undefined) { // If no weapon to drop
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

function moreThanOneHundredCells() { // New Player 2 drop location
    var min = obstacleCell + chestCell + 1;
    var oneHundredY = getRandomIntInclusive(0, boardSize - 1);
    var oneHundredX = getRandomIntInclusive(0, boardSize - 1);
    oneHundredDeduceY = oneHundredY
    oneHundredDeduceX = oneHundredX

    var cellWhereToDrop = oneHundredDeduceX + oneHundredDeduceY * board.length;
    for (i = 0; i < min; i++) {
        if (randomList[i] === randomList[cellWhereToDrop]) {
            return moreThanOneHundredCells();
        }
    }
    if (players[1].characterNear(oneHundredDeduceX, oneHundredDeduceY, board.length, board, numberToTest = randomList[cellWhereToDrop]) === false) {
        return [oneHundredDeduceY, oneHundredDeduceX, cellWhereToDrop]
    } else {
        return moreThanOneHundredCells();
    }
}

function lessThanOneHundredCells() { // New Player 2 drop location
    var min = obstacleCell + chestCell + numbersOfPlayers;
    var max = totalCells - 1;
    var numberDropTry = getRandomIntInclusive(min, max);
    if (players[1].characterNear(x, y, board.length, board, numberToTest = randomList[numberDropTry]) === false) {
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
    if (currentPlayer === players[0]) {
        currentPlayer = players[1]
        $("#player-2").addClass("current-player-is-2");
        $("#player-1").removeClass("current-player-is-1");
        $("#avatar-player-1").addClass("image-spin");
        $("#avatar-player-0").removeClass("image-spin");
        $(".navi-gif").empty()
        $(".navi-gif").append("<img src='https://zupimages.net/up/18/42/dbpt.gif'></img>")
        $("#duel").css("background", "linear-gradient(180deg, rgb(106, 47, 243) 20%, rgb(180, 49, 241) 30%, rgb(255, 255, 255) 60%, transparent 62%, transparent 100%), url('https://zupimages.net/up/18/42/xq1b.gif') no-repeat bottom")
        return currentPlayer
    } else {
        currentPlayer = players[0]
        $("#player-1").addClass("current-player-is-1");
        $("#player-2").removeClass("current-player-is-2");
        $("#avatar-player-0").addClass("image-spin");
        $("#avatar-player-1").removeClass("image-spin");
        $(".navi-gif").empty()
        $(".navi-gif").append("<img src='https://zupimages.net/up/18/42/ueit.gif'></img>")
        $("#duel").css("background", "linear-gradient(180deg, rgb(61, 189, 248) 20%, rgb(66, 212, 248) 30%, rgb(255, 255, 255) 60%, transparent 62%, transparent 100%), url('https://zupimages.net/up/18/42/xq1b.gif') no-repeat bottom")
        return currentPlayer
    }
}

function fight() {
    opponentPlayer = currentPlayer.opponent();
    if (currentPlayer.defensiveStance === true) {
        return currentPlayer.changeOfPlayerSDuelTurn()
    }
    var duelIsEnd = false;
    while (duelIsEnd === false) {
        if (opponentPlayer.heal > 0) {
            livingOpponent();
        }
        if (opponentPlayer.heal <= 0) {
            deadOpponent();
            duelIsEnd = true;
            victory()
            break;
        }
        opponentPlayer.defensiveStance === false
        currentPlayer.changeOfPlayerSDuelTurn()
        break;
    }
}

function livingOpponent() {
    if (opponentPlayer.defensiveStance === true) {
        opponentPlayer.heal = opponentPlayer.heal - currentPlayer.dommageDeal() / 2;
        opponentPlayer.defensiveStance === false;
        updateStatistics()
    } else if (opponentPlayer.defensiveStance === undefined || opponentPlayer.defensiveStance === false) {
        opponentPlayer.heal = opponentPlayer.heal - currentPlayer.dommageDeal();
        updateStatistics();
    }
    if (opponentPlayer.heal > 0) {
        setTimeout(function () {
            shakeBottleImage()
            $("#chat-text").text(opponentPlayer.name + " has " + opponentPlayer.heal + " heal points!")
        }, 1200);
    } else if (opponentPlayer.heal < 0) {
        setTimeout(function () {
            shakeBottleImage()
            $("#chat-text").text(opponentPlayer.name + " was overhit!")
        }, 1000);
    }
}

function deadOpponent() {
    updateStatistics()
    changeTrack(victoryMusic)
    setTimeout(function () {
        shakeBottleImage()
        $("#chat-text").text(opponentPlayer.name + " is unconscious! " + currentPlayer.name + " is the winner!")
    }, 2000);
}

function victory() {
    $("#duel").hide();
    $("#victory").show();
    if (currentPlayer === players[1]) {
        $("#victory").css("background", "linear-gradient(180deg, rgb(106, 47, 243) 20%, rgb(180, 49, 241) 30%, rgb(255, 255, 255) 100%)")
        $("#victory").append("<h1>Dark Link</h1> <h1>is the WINNER!</h1><img src='https://zupimages.net/up/18/42/qhw6.gif'>")
    } else {
        $("#victory").css("background", "linear-gradient(180deg, rgb(61, 189, 248) 20%, rgb(66, 212, 248) 30%, rgb(255, 255, 255) 100%)")
        $("#victory").append("<h1>Link</h1> <h1>is the WINNER!</h1><img src='https://zupimages.net/up/18/42/qhv2.gif'>")
    }
}

function updateStatistics() {
    for (i = 0; i < 2; i++) {
        var valueToTransform = players[i].weapon.name.toLowerCase();
        var regex = / /gi;
        var weaponIcon = (valueToTransform.replace(regex, "-"));
        var heart = "#";
        var emptyHeart = "*";
        var nbHeart = Math.max(0, Math.round(players[i].heal / 10));
        // if value < 0, return 0 as the max value of this method.
        var nbEmptyHeart = 10 - nbHeart

        $("#player-" + i + "-heal").empty();
        $("#player-" + i + "-heal-stat-2").empty();
        $("#player-" + i + "-weapon").empty();
        $("#player-" + i + "-img-weapon").empty();
        $("#player-" + i + "-weapon-power").empty();
        $("#player-" + i + "-heal").append(heart.repeat(nbHeart) + emptyHeart.repeat(nbEmptyHeart));
        $("#player-" + i + "-heal-stat-2").append(Math.max(0, players[i].heal) + "/100");
        $("#player-" + i + "-weapon").append(players[i].weapon.name);
        $("#player-" + i + "-img-weapon").append("<div class=\"" + weaponIcon + " image-rotate\"></div>");
        $("#player-" + i + "-weapon-power").append(players[i].weapon.power);
    }
};

function shakeBottleImage() {
    $(".navi-gif").parent().addClass("vibrate");
    setTimeout(function () {
        $(".navi-gif").parent().removeClass("vibrate");
    }, 1600); //animation time, waiting to remove.
}

//Game music
$("#menu-music-button").click(function () {
    changeTrack(menuMusic);
    var audio = document.getElementById("my-audio");
    audio.volume = 0.1;
});

$("#mute-music-button").click(function () {
    var audio = document.getElementById("my-audio");
    audio.volume = 0.0;
});

$(function () { //Low audio volume
    var audio = document.getElementById("my-audio");
    audio.volume = 0.1;
});

function heyListen() {
    var audio = new Audio("https://www.myinstants.com/media/sounds/hey_listen.mp3");
    audio.play();
    audio.volume = 0.1;
}
var menuMusic = src = "https://vignette.wikia.nocookie.net/zelda/images/2/2e/Maison_de_Link_%28Ocarina_of_Time%29.ogg/revision/latest?cb=20130401143058&path-prefix=fr"
//menuMusic create because autoplay doesn't work on Google Chrome since version 66: changeTrack(adventureMusic)
var adventureMusic = src = "https://vignette.wikia.nocookie.net/zelda/images/a/a8/For%C3%AAt_Kokiri.ogg/revision/latest?cb=20130304194658&path-prefix=fr"
var fightMusic = src = "https://vignette.wikia.nocookie.net/zelda/images/f/f3/Ganon_%28OoT%29.ogg/revision/latest?cb=20130313230720&path-prefix=fr"
var victoryMusic = src = "https://vignette.wikia.nocookie.net/zelda/images/4/42/Boss_battu_%28Ocarina_of_Time%29.ogg/revision/latest?cb=20130602122858&path-prefix=fr"

function changeTrack(sourceUrl) {
    var audio = $("#my-audio");
    $("#mp3-src").attr("src", sourceUrl);
    audio[0].pause();
    audio[0].load(); //suspends and restores all audio element
    audio[0].oncanplaythrough = audio[0].play();
}
