////////////////////////////////////// CHARACTER AND WEAPONS //////////////////////////////////////////
// Les Personnages-------------------------------------------------------------------------------------

function Character(name, heal, weapons, position) { //Constructeur
    this.name = name;
    this.heal = heal;
    this.weapons = weapons;
    this.position = position;
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

// place were selected player can move:

/*Character.protocole.freeCaseToMove = function(){
    if (this.position >= 0 && this.position <= 99){
        var numberToDrop = this.position;
        var valueToTest = numberToDrop;
        if (testContainType(valueToTest) == true ){
            numberToDrop(numberToDrop);
            board[dropY][dropX].contain == this.id

        }



    }
    else{
        return false
    }
}*/
    
// Character move methode:
Character.prototype.playerMove = function () {
    // The function will check if key is push or not.
    if (e.keyCode == "37") {
        this.position = (this.position - 1);
    } // Right
    else if (e.keyCode == "38") {
        this.position = (this.position - 10);
    } // Upper
    else if (e.keyCode == "39") {
        this.position = (this.position + 1);
    } // Left
    else if (e.keyCode == "40") {
        this.position = (this.position +10);
    } // Lower 
}

// Objet joueur premier
var player1 = new Character("Joueur 1", 100, weapons[0]);

// Objet joueur second
var player2 = new Character("Joueur 2", 100, weapons[0]);

// Character Array!
var players = [player1, player2]