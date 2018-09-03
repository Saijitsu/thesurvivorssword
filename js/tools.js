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

// Attribution de l'entrée pour chaques cellules
var numberToUpgrade = -1; // numéro de la case de départ moins 1 unité.
function nbCase() {
    numberToUpgrade++;
    return numberToUpgrade
}
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
        return 101; // Affectation du Joueur 1
    } else if ((x + y * board.length) == randomList[15]) {
        return 102; // Affectation du Joueur 2    
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


////// brouillon ///////
// Algorithme de collision: il va chercher la valeur des cellules proches
// characterCollision(x, y, board.length)
function characterCollision() { //En brouillon
    CaseNb = board[x][y].numberCase
    while (CaseNb < 99) {
        var i = CaseNb - (y * board.length);
        var j = ((CaseNb - x) / board.length);
        var CaseNb = board[i][j].numberCase;

        var nbBas = (CaseNb + 10);
        var nbHaut = (CaseNb - 10);
        var nbGauche = (CaseNb + 1);
        var nbDroite = (CaseNb - 1);
        var nbDiagonaleHautGauche = caseNb - 9;
        var nbDiagonaleHautDroite = caseNb - 11;
        var nbDiagonaleBasGauche = caseNb + 9;
        var nbDiagonaleBasDroite = caseNb + 11;


        if (board[yNbBas][xNbBas].contain != 101 && board[yNbHaut][xNbHaut].contain != 101 &&
            board[yNbGauche][xNbGauche].contain != 101 && board[yNbDroite][xNbDroite].contain != 101 &&
            board[ynbDiagonaleHautGauche][xnbDiagonaleHautGauche].contain != 101 && board[ynbDiagonaleHautDroite][xnbDiagonaleHautDroite].contain != 101 &&
            board[ynbDiagonaleBasGauche][xnbDiagonaleBasGauche].contain != 101 && board[ynbDiagonaleBasDroite][xnbDiagonaleBasDroite].contain != 101) {
            return safePlace;
        } else {
            CaseNb++;
            return unsafePlace;
        }
    }
}