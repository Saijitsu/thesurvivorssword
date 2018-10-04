function Character(name, heal, weapon, weaponToDeposited, position, y, x, defensiveStance) {
    this.name = name;
    this.heal = heal;
    this.weapon = weapon;
    this.weaponToDeposited = weaponToDeposited;
    this.position = position;
    this.y = y;
    this.x = x;
    this.defensiveStance = defensiveStance;
};

Character.prototype.describe = function () {
    var description = this.name + " is on cell n°" + this.id().position + " has " +
        this.heal + " points of life, it is equipped with the weapon : \"" +
        this.equipedWeapon() + "\" he can inflict " +
        this.dommageDeal() + " damage per hit to " + this.opponent().name +
        " locate on cell n°" + this.opponent().position + ".";
    return description;
}

Character.prototype.id = function () {
    var id = this.name;
    switch (this.name) {
        case player1.name:
            id = players[0]
            break;
        case player2.name:
            id = players[1]
            break;
    }
    return id;
};

Character.prototype.opponent = function () {
    var opponentIs = this.name;
    switch (this.name) {
        case player1.name:
            opponentIs = players[1]
            break;
        case player2.name:
            opponentIs = players[0]
            break;
    }
    return opponentIs;
};

Character.prototype.dommageDeal = function () {
    return this.weapon.power;
};

Character.prototype.equipedWeapon = function () {
    return this.weapon.name;
};

Character.prototype.characterNear = function () {
    var firstCellNumber = randomList[obstacleCell + chestCell];
    var secondCellNumber = numberToTest;

    var valueToTest = [-rows * 4, -(rows * 3 - 1), -rows * 3, -(rows * 3 + 1), -(rows * 2 - 1),
        -rows * 2, -(rows * 2 + 1), -(rows - 3), -(rows - 2), -(rows - 1), -rows, -(rows * 3 + 1),
        -(rows + 1), -(rows + 2), -(rows + 3), -1, -2, -3, -4, 1, 2, 3, 4, rows * 4, (rows * 3 - 1),
        rows * 3, (rows * 3 + 1), (rows * 2 - 1), rows * 2, (rows * 2 + 1), (rows - 3), (rows - 2),
        (rows - 1), rows, (rows * 3 + 1), (rows + 1), (rows + 2), (rows + 3)
    ]
    for (var i = 0; i < valueToTest.length; i++) {
        var valueToAdd = valueToTest[i];
        if (secondCellNumber != (firstCellNumber + valueToAdd)) {} else if (secondCellNumber = (firstCellNumber + valueToAdd)) {
            return true;
        }
    }
    return false;
}

// New player 2 location
Character.prototype.changeDropArea = function () {
    console.log("There was a contact between the players at the creation of the field! Player 2 location has been reset.")

    if (totalCells <= 100) {
        var deduceYXandCell = lessThanOneHundredCells();
        var deduceY = deduceYXandCell[0];
        var deduceX = deduceYXandCell[1];
        var cellWhereToDrop = deduceYXandCell[2]
    } else if (totalCells > 100) {
        var deduceYXandCell = moreThanOneHundredCells();
        var deduceY = deduceYXandCell[0];
        var deduceX = deduceYXandCell[1];
        var cellWhereToDrop = deduceYXandCell[2]
    }
    var cell = new Cell(this, cellWhereToDrop, deduceY, deduceX, false);
    board[deduceY][deduceX] = cell;
    this.position = cell.numberCell;
    this.y = deduceY;
    this.x = deduceX;
    console.log("Player 2 found his land!");
    return cell;
}

Character.prototype.tripArea = function () {
    var startingCell = board[this.y][this.x].numberCell
    var leftDirection = [-1, -2, -3]
    var downDirection = [rows, (rows * 2), (rows * 3)]
    var rightDirection = [1, 2, 3]
    var upDirection = [-rows, -(rows * 2), -(rows * 3)]
    var directionToTest = [leftDirection, downDirection, rightDirection, upDirection]

    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 3; i++) {
            var valueToAdd = directionToTest[j][i];
            var tryIfFreeCell = (startingCell + valueToAdd);
            if (tryIfFreeCell >= 0 && tryIfFreeCell <= totalCells - 1) {
                var deduceY = cellList[tryIfFreeCell].y
                var deduceX = cellList[tryIfFreeCell].x
                if (board[deduceY][deduceX].freeCell == true) {
                    if (j == 0 || j == 2) {
                        var line = this.y;
                        if (deduceY == line) {
                            highLightning.push(tryIfFreeCell);
                            board[deduceY][deduceX].highLightning = true;
                        } else {
                            i = 3
                        }
                    }
                    if (j == 1 || j == 3) {
                        highLightning.push(tryIfFreeCell);
                        board[deduceY][deduceX].highLightning = true;
                    }
                } else {
                    i = 3
                }
            }
        }
    }
    draw();
    console.log(this.name + " can move to this places: " + highLightning)
}

// changement de position du joueur sur la carte
//Character.prototype.changeOfPosition = function () {
//    var highLightningArray = this.tripArea();
//}

Character.prototype.changeOfPlayerSTurn = function () {
    if (this.playersCollision() == false) {
        $("#chatText").text("No fight this turn!");
        console.log("No fight this turn!");
        if (currentPlayer == players[0]) {
            currentPlayer = players[1]
        } else {
            currentPlayer = players[0]
        }
        highLightning = [];
        currentPlayer.tripArea() // Trip Area of current player.
    } else {
        currentPlayer.duel()
    }
}

Character.prototype.changeOfPlayerSDuelTurn = function () {
    if (currentPlayer == players[0]) {
        currentPlayer = players[1]
    } else {
        currentPlayer = players[0]
    }
    currentPlayer.opponent().defensiveStance =
        currentPlayer.duel()
}

Character.prototype.playersCollision = function () {
    if (this.opponent().position == this.position - 1 || this.opponent().position == this.position + 1 ||
        this.opponent().position == this.position - rows || this.opponent().position == this.position + rows) {
        return true; // Vertical or horizontal collision détected  
    } else {
        return false;
    }
}

Character.prototype.duel = function () {
    console.log("Fight this turn!");
    var opponentPlayer = currentPlayer.opponent();
    var duelIsEnd = false;
    while (duelIsEnd == false) {
        if (opponentPlayer.heal > 0) {
            if (opponentPlayer.defensiveStance == true) {
                opponentPlayer.heal = opponentPlayer.heal - currentPlayer.dommageDeal() / 2;
                opponentPlayer.defensiveStance == false
            } else if (opponentPlayer.defensiveStance == undefined || opponentPlayer.defensiveStance == false) {
                opponentPlayer.heal = opponentPlayer.heal - currentPlayer.dommageDeal();
            }
            if (opponentPlayer.heal > 0) {
                console.log(opponentPlayer.name + " has " + opponentPlayer.heal + " heal points!")
            } else {
                console.log(opponentPlayer.name + " was overhit!");
            }
        }
        if (opponentPlayer.heal <= 0) {
            console.log(opponentPlayer.name + " is unconscious! " + currentPlayer.name + " is the winner!");
            duelIsEnd = true;
            break;
        }
        currentPlayer.changeOfPlayerSDuelTurn()
        break;
    }
}

Character.prototype.defensiveStance = function () {
    var txt;
    if (confirm("Press OK to adopt a defensive stance!")) {
        txt = "You adopt a defensive stance!";
    } else {
        txt = "Defensive stance";
    }
    document.getElementById("buttonDefensive").innerHTML = txt;
}

Character.prototype.offensiveStance = function () {
    var txt;
    if (confirm("Press OK to adopt an offensive stance!")) {
        txt = "You adopt an offensive stance!";
    } else {
        txt = "Offensive stance";
    }
    document.getElementById("buttonOffensive").innerHTML = txt;
}

// Objet joueur premier
var player1 = new Character("Player 1", 100, weapons[0]);

// Objet joueur second
var player2 = new Character("Player 2", 100, weapons[0]);

// Character Array!
var players = [player1, player2];