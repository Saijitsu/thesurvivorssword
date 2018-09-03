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

// Algorithme de collision:
// il va chercher la valeur des cellules proches
function characterCollision() { //En brouillon
    while (nb < 99) {
        var CaseNb = (x + y * board.length);
        var i = nb - (y * board.length);
        var j = ((nb - x) / board.length);

        var nbBas = (nb + 10);
        var nbHaut = (nb - 10);
        var nbGauche = (nb + 1);
        var nbDroite = (nb - 1);

        /* // : calcul le reste de la division euclidienne
         var yNbBas = ((nbBas - xNbBas) % board.length);
         var yNbHaut = ((nbHaut - xNbHaut) % board.length);
         var yNbGauche = ((nbGauche - xNbGauche) % board.length);
         var yNbDroite = ((nbDroite - xNbDroite) % board.length);*/
        var yNbBas = 0
        var yNbHaut = 0
        var yNbGauche = 0
        var yNbDroite = 0

        var xNbBas = nbBas - (yNbBas * board.length);
        var xNbHaut = nbHaut - (yNbHaut * board.length);
        var xNbGauche = nbGauche - (yNbGauche * board.length);
        var xNbDroite = nbDroite - (yNbDroite * board.length);

        var bas = (xNbBas + yNbBas * board.length);
        var haut = (xNbHaut + yNbHaut * board.length);
        var gauche = (xNbGauche + yNbGauche * board.length);
        var droite = (xNbDroite + yNbDroite * board.length);

        if (board[yNbBas][xNbBas] != player1Case && board[yNbHaut][xNbHaut] != player1Case &&
            board[yNbGauche][xNbGauche] != player1Case && board[yNbDroite][xNbDroite] != player1Case) {
            return board[i][j] = player2Case;
        }
        /*if (board[bas] != player1Case && board[haut] != player1Case &&
            board[gauche] != player1Case && board[droite] != player1Case) {
            return board[i][j] = player2Case;
        }*/
        else {
            nb++;
        }

    }
}

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