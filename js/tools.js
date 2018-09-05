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
        return 1; // Affectation des cellules obstacles
    } else if ((x + y * board.length) == randomList[10] || (x + y * board.length) == randomList[11] || (x + y * board.length) == randomList[12] ||
        (x + y * board.length) == randomList[13]) {
        return 2; // Affectation des coffres
    } else if ((x + y * board.length) == randomList[14]) {
        player1.position = cell.numberCell
        return 101; // Affectation du Joueur 1
    } else if ((x + y * board.length) == randomList[15]) {
        if (characterNear(x, y, board.length, board) == true) {
            return 0; // Joueur 1 proche: Affectation d'une cellule vide.
        }
        if (characterNear(x, y, board.length, board) == false) {
            player2.position = cell.numberCell
            return 102; // Safe zone: Affectation du Joueur 2
        }
    } else {
        return 0; // Affectation par défaut de cellules vides
    }
};

function testIfFree() {
    var testContainType = containType();
    if (testContainType === 1) {
        console.log("Ceci est un arbre");
        return false
    } else if (testContainType === 2) {
        console.log("Ceci est un coffre");
        return true
    } else if (testContainType === 101) {
        console.log("Ceci est le Joueur 1");
        return false
    } else if (testContainType === 102) {
        console.log("Ceci est le Joueur 2");
        return false
    } else {
        console.log("Ceci est un terrain vide");
        return true
    }
}


// On renvoie un entier aléatoire entre une valeur min (incluse)
// et une valeur max (incluse).
// Attention : si on utilisait Math.round(), on aurait une distribution
// non uniforme !
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var testCharacterNear = characterNear(x, y, board.length, board);
// Appel le joueur 2 sur la carte s'il n'a pas pu être placé à la création de la carte.
function verifyDropPlayer2() {
    var numberDropTry = 16
    if (testCharacterNear === false) {
        console.log("Il n'y a pas eu de contact entre les joueurs à la création du terrain!");
    }
    if (testCharacterNear === true) {
        var min = 16;
        var max = 99;
        var numberDropTry = getRandomIntInclusive(min, max);
        numberDropTryChaine = numberDropTry.toString() //chn.substr(début[, longueur])
        //La méthode substr() retourne la partie d'une chaîne de caractères comprise entre l'indice de départ et un certain nombre de caractères après celui-ci.
        if (randomList[numberDropTry] < 10) {
            var dropY = 0
            var dropX = parseInt(numberDropTryChaine.substr(1))
        }
        if (randomList[numberDropTry] > 10) {
            var dropY = parseInt(numberDropTryChaine.substr(0, 1))
            var dropX = parseInt(numberDropTryChaine.substr(1, 1))
        }
        if (board[dropY][dropX].freeCell == true) {
            console.log("Il n'y eu un contact entre les joueurs à la création du terrain! \nEmplacement Joueur 2 réinitialisé")
            return numberDropTry;
        } else {
            verifyDropPlayer1()
        }
    }
}

function characterNear() {
    var p1CellNumber = randomList[14]
    var p2CellNumber = randomList[15]

    var nbBas = p2CellNumber + 10;
    var nbHaut = p2CellNumber - 10;
    var nbGauche = p2CellNumber + 1;
    var nbDroite = p2CellNumber - 1;
    var nbDiagonaleHautGauche = p2CellNumber - 9;
    var nbDiagonaleHautDroite = p2CellNumber - 11;
    var nbDiagonaleBasGauche = p2CellNumber + 9;
    var nbDiagonaleBasDroite = p2CellNumber + 11;

    if (nbBas == p1CellNumber || nbHaut == p1CellNumber || nbGauche == p1CellNumber || nbDroite == p1CellNumber ||
        nbDiagonaleBasDroite == p1CellNumber || nbDiagonaleHautGauche == p1CellNumber ||
        nbDiagonaleHautDroite == p1CellNumber || nbDiagonaleBasGauche == p1CellNumber) {
        return true;
    } else {
        return false;
    }
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