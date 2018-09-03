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


        // : calcul le reste de la division euclidienne
        var yNbBas = ((nbBas - xNbBas) / board.length);
        var yNbHaut = ((nbHaut - xNbHaut) / board.length);
        var yNbGauche = ((nbGauche - xNbGauche) / board.length);
        var yNbDroite = ((nbDroite - xNbDroite) / board.length);
        var ynbDiagonaleHautGauche = ((nbDiagonaleHautGauche - xnbDiagonaleHautGauche) / board.length);
        var ynbDiagonaleHautDroite = ((nbDiagonaleHautDroite - xnbDiagonaleHautDroite) / board.length);
        var ynbDiagonaleBasGauche = ((nbDiagonaleBasGauche - xnbDiagonaleBasGauche) / board.length);
        var ynbDiagonaleBasDroite = ((nbDiagonaleBasDroite - xnbDiagonaleBasDroite) / board.length);

        var xNbBas = nbBas - (yNbBas * board.length);
        var xNbHaut = nbHaut - (yNbHaut * board.length);
        var xNbGauche = nbGauche - (yNbGauche * board.length);
        var xNbDroite = nbDroite - (yNbDroite * board.length);
        var xnbDiagonaleHautGauche = nbDiagonaleHautGauche - (ynbDiagonaleHautGauche * board.length);
        var xnbDiagonaleHautDroite = nbDiagonaleHautDroite - (ynbDiagonaleHautDroite * board.length);
        var xnbDiagonaleBasGauche = nbDiagonaleBasGauche - (ynbDiagonaleBasGauche * board.length);
        var xnbDiagonaleBasDroite = nbDiagonaleBasDroite - (ynbDiagonaleBasDroite * board.length);

        var bas = (xNbBas + yNbBas * board.length);
        var haut = (xNbHaut + yNbHaut * board.length);
        var gauche = (xNbGauche + yNbGauche * board.length);
        var droite = (xNbDroite + yNbDroite * board.length);
        var diagonaleHautGauche = (xnbDiagonaleHautGauche + ynbDiagonaleHautGauche * board.length);
        var diagonaleHautDroite = (xnbDiagonaleHautDroite + ynbDiagonaleHautDroite * board.length);
        var diagonaleBasGauche = (xnbDiagonaleBasGauche + ynbDiagonaleBasGauche * board.length);
        var diagonaleBasDroite = (xnbDiagonaleBasDroite + ynbDiagonaleBasDroite * board.length);


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