// Les Armes ------------------------------------------------------------------------------------
function Weapons(name, power, id) {
    this.name = name;
    this.power = power;
    this.id = id;
}

// Fonctions applicables aux armes

Weapons.prototype.describe = function () {
    var description = this.name + " donne une force de " + this.power + " dégats d'attaque à son propriétaire!";
    return description;
};


// Objet Arme 0
var peasantSword = new Weapons("Peasant Sword", 10, 103);

// Objet Arme 1
var swordOfWind = new Weapons("Sword Of Wind", 13, 104);

// Objet Arme 2
var swordOfFire = new Weapons("Sword Of Wind", 15, 105);

// Objet Arme 3
var swordOfThunder = new Weapons("Sword Of Wind", 17, 106);

// Objet Arme 4
var magicWand = new Weapons("Magic Wand", 14, 107);

// Objet Arme 5
var bowOfLight = new Weapons("Bow Of Light", 18, 108);

// Objet Arme 6
var ironHammer = new Weapons("Iron Hammer", 19, 109);