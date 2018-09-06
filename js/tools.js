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
for (i = 0; i < 100 /*myMap.totalCells*/ ; i++) {
    randomList[i] = i;
}

randomList.shuffle(); // on mélange les éléments du tableau
console.log(randomList.join());

// Outils de création du contenu: this.contain 
// Les Terrains -------------------------------------------------------------------------------
// RAPPEL: rows = Y values /Columns = X values
function containType() {
    if ((x + y * board.length) == randomList[0] || (x + y * board.length) == randomList[1] || (x + y * board.length) == randomList[2] ||
        (x + y * board.length) == randomList[3] || (x + y * board.length) == randomList[4] || (x + y * board.length) == randomList[5] ||
        (x + y * board.length) == randomList[6] || (x + y * board.length) == randomList[7] || (x + y * board.length) == randomList[8] ||
        (x + y * board.length) == randomList[9]) {
        var nbCell = x + y * board.length
        var cell = new Cell(1, nbCell, y, x, false);
        // build list of references
        return cell; // Affectation des cellules obstacles
    } else if ((x + y * board.length) == randomList[10] || (x + y * board.length) == randomList[11] || (x + y * board.length) == randomList[12] ||
        (x + y * board.length) == randomList[13]) {
        var nbCell = x + y * board.length
        var cell = new Cell(2, nbCell, y, x, true);
        return cell; // Affectation des coffres
    } else if ((x + y * board.length) == randomList[14]) {
        var nbCell = x + y * board.length
        var cell = new Cell(101, nbCell, y, x, false);
        player1.position = cell.numberCell
        return cell; // Affectation du Joueur 1
    } else if ((x + y * board.length) == randomList[15]) {
        if (characterNear(x, y, board.length, board, numberToTest = randomList[15]) == false) {
            var nbCell = x + y * board.length
            var cell = new Cell(102, nbCell, y, x, false);
            player2.position = cell.numberCell
            return cell; // Safe zone: Affectation du Joueur 2
        } else if (characterNear(x, y, board.length, board, numberToTest = randomList[15]) == true) {
            DropPlayer2() // Unsafe zone: Nouvelle Affectation du Joueur 2
            var nbCell = x + y * board.length
            var cell = new Cell(0, nbCell, y, x, true);
            return cell; // Joueur 1 proche: Affectation d'une cellule vide.
        }
    } else {
        if (board[y][x] !== undefined) {
            var nbCell = x + y * board.length
            var cell = new Cell(102, nbCell, y, x, false);
            player2.position = cell.numberCell
            return cell; // Confirmation de la Cellule Joueur 2{
        } else {
            var nbCell = x + y * board.length
            var cell = new Cell(0, nbCell, y, x, true);
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

// Appel le joueur 2 sur la carte s'il n'a pas pu être placé à la création de la carte.
function DropPlayer2() {
    console.log("Il n'y eu un contact entre les joueurs à la création du terrain! \nL'emplacement Joueur 2 a été réinitialisé")
    var min = 16;
    var max = 99;
    var numberDropTry = getRandomIntInclusive(min, max);
    if (characterNear(x, y, board.length, board, numberToTest = randomList[numberDropTry]) == false) {
        var numberToDrop = randomList[numberDropTry]
        numberDropTryChaine = numberToDrop.toString() //chn.substr(début[, longueur])
        //La méthode substr() retourne la partie d'une chaîne de caractères comprise entre l'indice de départ et un certain nombre de caractères après celui-ci.
        if (numberToDrop < 10) {
            var dropY = 0
            var dropX = parseInt(numberDropTryChaine.substr(1, 1))
        } else if (numberToDrop > 10) {
            var dropY = parseInt(numberDropTryChaine.substr(0, 1))
            var dropX = parseInt(numberDropTryChaine.substr(1, 1))
        }
        var cell = new Cell(102, numberToDrop, dropY, dropX, false);
        // build list of references
        board[dropY][dropX] = cell
        player2.position = cell.numberCell
        console.log("Le Joueur 2 à trouvé ou attérir!")
        return cell
    } else {
        DropPlayer2()
    }
}

function characterNear() {
    var p1CellNumber = randomList[14]
    var p2CellNumber = numberToTest

    var valueToTest = [1, 2, 3, 4, 7, 8, 9, 11, 12, 13, 21, 31, 7, 8, 9, 10, 19, 20, 29, 30, 40, -1, -2, -3, -4, -7, -8, -9, -10, -11, -12, -13, -19, -20, -21, -31, -29, -30, -40]
    for (var i = 0; i < valueToTest.length; i++) {
        var valueToAdd = valueToTest[i]
        if (p2CellNumber != (p1CellNumber + valueToAdd)) {} else if (p2CellNumber = (p1CellNumber + valueToAdd)) {
            return true;
        }
    }
    return false;
}

/*  Algo collides
   // Coordonnées de Tile1
    var p1CellNumber = randomList[14]
    p1CellNumber = p1CellNumber.toString() //chn.substr(début[, longueur])
    //La méthode substr() retourne la partie d'une chaîne de caractères comprise entre l'indice de départ et un certain nombre de caractères après celui-ci.

    if (randomList[14] < 10) {
        var p1CellNumberY = 0
        var p1CellNumberX = parseInt(p1CellNumber.substr(1))
    }
    if (randomList[14] > 10) {
        var p1CellNumberY = parseInt(p1CellNumber.substr(0, 1))
        var p1CellNumberX = parseInt(p1CellNumber.substr(1, 1))
    }
    // Coordonnées de Tile2

    var p2CellNumber = randomList[15]
    p2CellNumber = p2CellNumber.toString() //chn.substr(début[, longueur])
    if (randomList[15] < 10) {
        var p2CellNumberY = 0
        var p2CellNumberX = parseInt(p2CellNumber.substr(1))
    }
    if (randomList[15] > 10) {
        var p2CellNumberY = parseInt(p2CellNumber.substr(0, 1))
        var p2CellNumberX = parseInt(p2CellNumber.substr(1, 1))
    }

    var tile1 = {
        x: p1CellNumberX,
        y: p1CellNumberY,
        width: 50,
        height: 50
    }
    var tile2 = {
        x: p2CellNumberX,
        y: p2CellNumberY,
        width: 50,
        height: 50
    }
    if (tile1.x < tile2.x + tile2.width &&
        tile1.x + tile1.width > tile2.x &&
        tile1.y < tile2.y + tile2.height &&
        tile1.height + tile1.y > tile2.y) {
        return "collision";
        // collision détectée !
    } else {
        return "safePlace";
        // pas de collision détectée !
    }
}*/