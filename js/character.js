////////////////////////////////////// CHARACTER AND WEAPONS //////////////////////////////////////////
// Les Personnages-------------------------------------------------------------------------------------

function Character(name, heal, weapons) { //Constructeur
    this.name = name;
    this.heal = heal;
    this.weapons = weapons;
};

// Objet joueur premier
var player1 = new Character("Joueur 1", 100, 103);

// Objet joueur second
var player2 = new Character("Joueur 2", 100, 103);

// Les fonctions applicables à l'ensemble des Character 
Character.prototype.describe = function () {
    var description = this.name + " a " + this.heal + " points de vie et peut infliger " +
        this.equipedWeapons() + " dégâts à chaque attaque. Son identifant de guerre est le " + this.id;
    return description;
}
// Identification de l'adversaire.
Character.prototype.opponent = function () {
    var opponentIs = this.id;
    switch (this.id) {
        case player1.name:
            opponentIs = player2Case.name
            break;
        case player2.name:
            opponentIs = player1Case.name
            break;
    }
    return opponentIs
};

// Le joueur équipe une arme et profite d'un bonus de puissance en conséquence.
Character.prototype.equipedWeapons = function () {
    var equipedWeapons = this.weapons
    switch (equipedWeapons) {
        case 103:
            power = 10
            break;
        case 104:
            power = 13
            break;
        case 105:
            power = 15
            break;
        case 106:
            power = 17
            break;
        case 107:
            power = 14
            break;
        case 108:
            power = 18
            break;
        case 109:
            power = 19
            break;
    }
    return power
};
