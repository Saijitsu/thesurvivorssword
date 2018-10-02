////////////////////////////////////// CHARACTER AND WEAPONS //////////////////////////////////////////
// Les Personnages-------------------------------------------------------------------------------------

function Character(name, heal, weapon, weaponToDeposited, position, y, x) { //Constructeur
    this.name = name;
    this.heal = heal;
    this.weapon = weapon;
    this.weaponToDeposited = weaponToDeposited;
    this.position = position;
    this.y = y;
    this.x = x;
};
// Les fonctions applicables à l'ensemble des Character 
Character.prototype.describe = function () {
    var description = this.name + " est sur la case n°" + this.id().position + " et dispose de " +
        this.heal + " points de vie, il est équipé de l'arme : \"" +
        this.equipedWeapon() + "\" et peut infliger " +
        this.dommageDeal() + " dégâts à chaque attaque au " + this.opponent().name +
        " qui est installé sur la case n°" + this.opponent().position + ".";
    return description;
}
// Identification du personnage.
Character.prototype.id = function () {
    var id = this.name; // a modifier
    switch (this.name) {
        case player1.name:
            id = players[0]
            break;
        case player2.name:
            id = players[1]
            break;
    }
    return id
};

// Identification de l'adversaire.
Character.prototype.opponent = function () {
    var opponentIs = this.name; // a modifier
    switch (this.name) {
        case player1.name:
            opponentIs = players[1]
            break;
        case player2.name:
            opponentIs = players[0]
            break;
    }
    return opponentIs
};

// Le joueur équipe une arme et profite d'un bonus de puissance en conséquence.
Character.prototype.dommageDeal = function () {
    return this.weapon.power
};

// Le joueur équipe une arme du nom de:
Character.prototype.equipedWeapon = function () {
    return this.weapon.name
};

Character.prototype.characterNear = function () {
    var firstCellNumber = randomList[obstacleCell + chestCell]
    var secondCellNumber = numberToTest

    var valueToTest = [-rows * 4, -(rows * 3 - 1), -rows * 3, -(rows * 3 + 1), -(rows * 2 - 1), -rows * 2,
        -(rows * 2 + 1), -(rows - 3), -(rows - 2), -(rows - 1), -rows, -(rows * 3 + 1), -(rows + 1), -(rows + 2), -(rows + 3),
        -1, -2, -3, -4, 1, 2, 3, 4, rows * 4, (rows * 3 - 1), rows * 3, (rows * 3 + 1), (rows * 2 - 1), rows * 2, (rows * 2 + 1),
        (rows - 3), (rows - 2), (rows - 1), rows, (rows * 3 + 1), (rows + 1), (rows + 2), (rows + 3)
    ]
    for (var i = 0; i < valueToTest.length; i++) {
        var valueToAdd = valueToTest[i]
        if (secondCellNumber != (firstCellNumber + valueToAdd)) {} else if (secondCellNumber = (firstCellNumber + valueToAdd)) {
            return true;
        }
    }
    return false;
}

// Appel le joueur 2 sur la carte s'il n'a pas pu être placé à la création de la carte.
Character.prototype.changeDropArea = function () {
    console.log("Il n'y eu un contact entre les joueurs à la création du terrain! \nL'emplacement Joueur 2 a été réinitialisé")
        var min = obstacleCell + chestCell + numbersOfPlayers;
        var max = totalCells - 1
        var numberDropTry = getRandomIntInclusive(min, max);
        if (players[1].characterNear(x, y, board.length, board, numberToTest = randomList[numberDropTry]) == false) {
            var cellWhereToDrop = randomList[numberDropTry]
            chaineTransform = cellWhereToDrop.toString() //chn.substr(début[, longueur])
            //La méthode substr() retourne la partie d'une chaîne de caractères comprise entre l'indice de départ et un certain nombre de caractères après celui-ci.
            if (cellWhereToDrop < 10) {
                var deduceY = 0
                var deduceX = cellWhereToDrop;
            } else if (cellWhereToDrop >= 10) {
                var deduceY = parseInt(chaineTransform.substr(0, 1))
                var deduceX = parseInt(chaineTransform.substr(1, 1))
            }
        var cell = new Cell(this, cellWhereToDrop, deduceY, deduceX, false);
        // build list of references
        board[deduceY][deduceX] = cell;
        this.position = cell.numberCell;
        this.y = deduceY;
        this.x = deduceX;
        console.log("Le Joueur 2 à trouvé ou attérir!")
        return cell
    } else {
        players[1].changeDropArea()
    }
}

Character.prototype.tripArea = function () {
    var startingCell = board[this.y][this.x].numberCell
    leftDirection = [-1, -2, -3]
    downDirection = [rows, (rows * 2), (rows * 3)]
    rightDirection = [1, 2, 3]
    upDirection = [-rows, -(rows * 2), -(rows * 3)]
    directionToTest = [leftDirection, downDirection, rightDirection, upDirection]

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

Character.prototype.changeOfPlayerSTour = function () {
    if (currentPlayer == players[0]) {
        currentPlayer = players[1]
    } else {
        currentPlayer = players[0]
    }
    highLightning = []
    currentPlayer.tripArea() // Trip Area of current player.
}

// Objet joueur premier
var player1 = new Character("Joueur 1", 100, weapons[0]);

// Objet joueur second
var player2 = new Character("Joueur 2", 100, weapons[0]);

// Character Array!
var players = [player1, player2];