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
        var cell = new Cell(players[0], nbCell, y, x, false);
        player1.position = cell.numberCell;
        player1.y = y;
        player1.x = x;
        return cell; // Affectation du Joueur 1
    } else if ((x + y * board.length) == randomList[15]) {
        if (characterNear(x, y, board.length, board, numberToTest = randomList[15]) == false) {
            var nbCell = x + y * board.length
            var cell = new Cell(players[1], nbCell, y, x, false);
            player2.position = cell.numberCell;
            player2.y = y;
            player2.x = x;
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
            var cell = new Cell(players[1], nbCell, y, x, false);
            player2.position = cell.numberCell
            player2.y = y;
            player2.x = x;
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
        var cellWhereToDrop = randomList[numberDropTry]
        chaineTransform = cellWhereToDrop.toString() //chn.substr(début[, longueur])
        //La méthode substr() retourne la partie d'une chaîne de caractères comprise entre l'indice de départ et un certain nombre de caractères après celui-ci.
        if (cellWhereToDrop < 10) {
            var dropY = 0
            var dropX = cellWhereToDrop;
        } else if (cellWhereToDrop > 10) {
            var dropY = parseInt(chaineTransform.substr(0, 1))
            var dropX = parseInt(chaineTransform.substr(1, 1))
        }
        var cell = new Cell(players[1], cellWhereToDrop, dropY, dropX, false);
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

    var valueToTest = [1, 2, 3, 4, 7, 8, 9, 11, 12, 13, 21, 31, 7, 8, 9, 10,
        19, 20, 29, 30, 40, -1, -2, -3, -4, -7, -8, -9, -10, -11, -12, -13, -19, -20, -21, -31, -29, -30, -40
    ]
    for (var i = 0; i < valueToTest.length; i++) {
        var valueToAdd = valueToTest[i]
        if (p2CellNumber != (p1CellNumber + valueToAdd)) {} else if (p2CellNumber = (p1CellNumber + valueToAdd)) {
            return true;
        }
    }
    return false;
}

// Return where user click on canvas.
canvas.addEventListener("click", function (e) {
    var mousePosition = getMousePosition(canvas, e);
    var message = 'Mouse click position is: ' + (Math.floor(mousePosition.y / 50)) + ',' + (Math.floor(mousePosition.x / 50));
    writeMessage(message);
    // this = 
    // this.changeOfPosition(x, y);
}, false);

function getMousePosition(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}
/*method which returns the mouse coordinates based on the position 
 of the client mouse and the position of the canvas obtained from 
 the getBoundingClientRect() method of the window object:
 The Element.getBoundingClientRect() method returns 
 the size of an element and its position relative to the viewport*/

function writeMessage(message) {
    console.log(message)
}

//////////////////////////// test: brouillon, non efficiant, devenu obsolète ///////////////////////////////////////
// test le contenu des cases.
function testContainType() {
    var valueToTest = containType().contain;
    if (valueToTest === 1) {
        console.log("Ceci est un arbre");
        return false
    } else if (valueToTest === 2) {
        console.log("Ceci est un coffre");
        return true
    } else if (valueToTest === players[0]) {
        console.log("Ceci est le Joueur 1");
        return false
    } else if (valueToTest === players[1]) {
        console.log("Ceci est le Joueur 2");
        return false
    } else {
        console.log("Ceci est un terrain vide");
        return true
    }
}

// place were selected player can move: //brouillon
function testNearlyCell() {
    var valueToTest = cellWhereToMove;
    if (valueToTest >= 0 && valueToTest <= 99) {
        deduceYX(valueToTest);
        if (board[dropY][dropX].freeCell == true) {
            return true
        }
    } else {
        return false
    }
}