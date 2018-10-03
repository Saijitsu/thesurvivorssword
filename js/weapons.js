function Weapons(name, power, worn) {
    this.name = name;
    this.power = power;
    this.worn = worn; // already equiped
}

Weapons.prototype.describe = function () {
    var description = this.name + " gives a strength of " + this.power + 
    " attack damage to its owner!";
    return description;
};

// Objet Weapon 0
var peasantSword = new Weapons("Peasant Sword", 10, true);
// Objet Weapon 1
var swordOfWind = new Weapons("Sword Of Wind", 13, false);
// Objet Weapon 2
var swordOfFire = new Weapons("Sword Of Fire", 15, false);
// Objet Weapon 3
var swordOfThunder = new Weapons("Sword Of Thunder", 17, false);
// Objet Weapon 4
var magicWand = new Weapons("Magic Wand", 14, false);
// Objet Weapon 5
var bowOfLight = new Weapons("Bow Of Light", 18, false);
// Objet Weapon 6
var ironHammer = new Weapons("Iron Hammer", 19, false);

// Weapons Array!
var weapons = [peasantSword, swordOfWind, swordOfFire, swordOfThunder, 
    magicWand, bowOfLight, ironHammer]

// Array of entry in weapons Array (less the first one):
var weaponsEntry = []
for (var entry = 1; entry < weapons.length; entry++) {
    weaponsEntry.push(entry)
}
weaponsEntry.shuffle();
