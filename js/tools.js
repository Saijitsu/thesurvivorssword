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
function characterCollision() {
    var nb = 14
    while (nb < 99) {
        nb++;
        var nbBas = (nb + 10);
        var nbHaut = (nb - 10);
        var nbGauche = (nb + 1);
        var nbDroite = (nb - 1);

        var yNbBas = nbBas - (nb + 10);
        var yNbHaut = (nb - 10);
        var yNbGauche = (nb + 1);
        var yNbDroite = (nb - 1);

        var xNbBas = nbBas - (yNbBas * board.length);
        var xNbHaut = nbHaut - (yNbHaut * board.length);
        var xNbGauche = nbGauche - (yNbGauche * board.length);
        var xNbDroite = nbDroite - (yNbDroite * board.length);

        var bas = (xNbBas + yNbBas * board.length);
        var haut = (xNbHaut + yNbHaut * board.length);
        var gauche = (xNbGauche + yNbGauche * board.length);
        var droite = (xNbDroite + yNbDroite * board.length);

        if (randomList[bas] != player1Case || randomList[haut] != player1Case ||
            randomList[gauche] != player1Case || randomList[droite] != player1Case) {
            return board[y][x] = player2Case;
        }
    }
}