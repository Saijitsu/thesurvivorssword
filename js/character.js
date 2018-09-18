////////////////////////////////////// CHARACTER AND WEAPONS //////////////////////////////////////////
// Les Personnages-------------------------------------------------------------------------------------

function Character(name, heal, weapons, position, remainingMove, y, x) { //Constructeur
    this.name = name;
    this.heal = heal;
    this.weapons = weapons;
    this.position = position;
    this.remainingMove = remainingMove;
    this.y = y;
    this.x = x;
};
// Les fonctions applicables à l'ensemble des Character 
Character.prototype.describe = function () {
    var description = this.name + " est sur la case n°" + this.id().position + " et dispose de " +
        this.heal + " points de vie, il est équipé de l'arme : \"" +
        this.equipedWeapons() + "\" et peut infliger " +
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
    return this.weapons.power
};

// Le joueur équipe une arme du nom de:
Character.prototype.equipedWeapons = function () {
    return this.weapons.name
};

// methode in progress =>
Character.prototype.playerMove = function () {
    var startingCell = this.position
    var highLightning = [] // A alimenter avec les cellules a mettre en surbrillance.
    var valueToTest = [1, 2, 3, -1, -2, -3, 10, 20, 30, -10, -20, -30]
    for (var i = 0; i < valueToTest.length; i++) {
        var valueToAdd = valueToTest[i]
        var cellWhereToDrop = (startingCell + valueToAdd)
        if (cellWhereToDrop >= 0 && cellWhereToDrop <= 99) {
            chaineTransform = cellWhereToDrop.toString() //chn.substr(début[, longueur])
            //La méthode substr() retourne la partie d'une chaîne de caractères comprise entre l'indice de départ et un certain nombre de caractères après celui-ci.
            if (cellWhereToDrop < 10) {
                var dropY = 0
                var dropX = cellWhereToDrop;
            } else if (cellWhereToDrop > 10) {
                var dropY = parseInt(chaineTransform.substr(0, 1))
                var dropX = parseInt(chaineTransform.substr(1, 1))
            }
            if (board[dropY][dropX].freeCell == true) {
                var line = this.y;
                if (i <= 5 && dropY == line ) {
                    highLightning.push(cellWhereToDrop)
                }
                if (i > 5) {
                    highLightning.push(cellWhereToDrop)
                }
            }
        }
    }
    console.log(this.name + " can move to this places: " + highLightning)
    return highLightning
}

// Objet joueur premier
var player1 = new Character("Joueur 1", 100, weapons[0]);

// Objet joueur second
var player2 = new Character("Joueur 2", 100, weapons[0]);

// Character Array!
var players = [player1, player2];


/*
// Character move methode with:
Character.prototype.playerMove = function (e) {
    e.preventDefault(); // No scrolling with keyboard.
    // The function will check if key is push or not.
    if (e.keyCode == "37") {
        if (this.remainingMove > 0) {
            cellWhereToDrop = (this.position - 1);
            var result = testNearlyCell(cellWhereToDrop, board, this);
            if (result == true) {
                return this.remainingMove - 1
            }
        }
    } // Right
    else if (e.keyCode == "38") {
        if (this.remainingMove > 0) {
            cellWhereToDrop = (this.position - 10);
            var result = testNearlyCell(cellWhereToDrop, board, this);
            if (result == true) {
                return this.remainingMove - 1
            }
        }
    } // Upper
    else if (e.keyCode == "39") {
        if (this.remainingMove > 0) {
            cellWhereToDrop = (this.position + 1);
            var result = testNearlyCell(cellWhereToDrop, board, this);
            if (result == true) {
                return this.remainingMove - 1
            }
        }
    } // Left
    else if (e.keyCode == "40") {
        if (this.remainingMove > 0) {
            cellWhereToDrop = (this.position + 10);
            var result = testNearlyCell(cellWhereToDrop, board, this);
            if (result == true) {
                return this.remainingMove - 1
            }
        }
    } // Lower 
}*/