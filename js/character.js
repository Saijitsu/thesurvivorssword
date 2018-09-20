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
Character.prototype.tripArea = function () {
    var startingCell = this.position
    var highLightning = [] // A alimenter avec les cellules a mettre en surbrillance.
    leftDirection = [-1, -2, -3]
    downDirection = [10, 20, 30]
    rightDirection = [1, 2, 3]
    upDirection = [-10, -20, -30]
    directionToTest = [leftDirection, downDirection, rightDirection, upDirection]

    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 3; i++) {
            var valueToAdd = directionToTest[j][i];
            var tryIfFreeCell = (startingCell + valueToAdd);
            if (tryIfFreeCell >= 0 && tryIfFreeCell <= 99) {
                var chaineTransform = tryIfFreeCell.toString() //chn.substr(début[, longueur])
                //La méthode substr() retourne la partie d'une chaîne de caractères comprise entre l'indice de départ et un certain nombre de caractères après celui-ci.
                if (tryIfFreeCell <= 9) {
                    numberTodeduceYX = "0" + chaineTransform
                    var dropY = parseInt(numberTodeduceYX.substr(0, 1))
                    var dropX = parseInt(numberTodeduceYX.substr(1, 1))
                } else if (tryIfFreeCell >= 10) {
                    var dropY = parseInt(chaineTransform.substr(0, 1))
                    var dropX = parseInt(chaineTransform.substr(1, 1))
                }
                if (board[dropY][dropX].freeCell == true) {
                    var line = this.y;
                    if (dropY == line) {
                        highLightning.push(tryIfFreeCell);
                        board[dropY][dropX].highLightning = true;
                    } else {
                        highLightning.push(tryIfFreeCell);
                        board[dropY][dropX].highLightning = true;
                    }
                } else {
                    i = 3
                }
            }
        }
    }
    draw();
    console.log(this.name + " can move to this places: " + highLightning)
    return highLightning
}
  
// changement de position du joueur sur la carte
Character.prototype.changeOfPosition = function (){
var highLightningArray = this.tripArea();

//////////////////////////////////////////////////////test a transferer
// Return where user click on canvas.
canvas.addEventListener("click", function (e) {
    var mousePosition = getMousePosition(canvas, e);
    var deduceY = (Math.floor(mousePosition.y / 50));
    var deduceX = (Math.floor(mousePosition.x / 50));
    var message = 'Mouse click position is: ' + deduceY + ',' + deduceX;
    writeMessage(message);
    if (board[deduceY][deduceX].highLightning == true){
        var position = String(deduceY)+ String(deduceX);
        parseInt(position)

        if(board[deduceY][deduceX].contain == 0){
            board[deduceY][deduceX].contain = currentPlayer;
            board[deduceY][deduceX].freeCell = false;

            board[currentPlayer.y][currentPlayer.x].contain == 0;
            board[currentPlayer.y][currentPlayer.x].freeCell = true;
             currentPlayer.position = parseInt(position);
             currentPlayer.y = deduceX
             currentPlayer.x = deduceY
        }
        if(board[deduceY][deduceX].contain == 2){
            board[deduceY][deduceX].contain = currentPlayer;
            board[deduceY][deduceX].freeCell = false;

            board[currentPlayer.y][currentPlayer.x].contain == 0;
            board[currentPlayer.y][currentPlayer.x].freeCell = true;
             currentPlayer.position = parseInt(position);
             currentPlayer.y = deduceX
             currentPlayer.x = deduceY
        }
        

         currentPlayer.changeOfPlayerSTour()

    }
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
/////////////////////////////////////////////////////////////test a transferer
}

Character.prototype.changeOfPlayerSTour = function () {

}

// Objet joueur premier
var player1 = new Character("Joueur 1", 100, weapons[0]);

// Objet joueur second
var player2 = new Character("Joueur 2", 100, weapons[0]);

// Character Array!
var players = [player1, player2];
