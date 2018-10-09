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

// Object Weapon 0
var peasantSword = new Weapons("Peasant Sword", 10, true);
// Object Weapon 1
var swordOfWind = new Weapons("Sword Of Wind", 11, false);
// Object Weapon 2
var swordOfFire = new Weapons("Sword Of Fire", 13, false);
// Object Weapon 3
var swordOfThunder = new Weapons("Sword Of Thunder", 17, false);
// Object Weapon 4
var magicWand = new Weapons("Magic Wand", 19, false);
// Object Weapon 5
var bowOfLight = new Weapons("Bow Of Light", 21, false);
// Object Weapon 6
var ironHammer = new Weapons("Iron Hammer", 23, false);

// Weapons Array!
var weapons = [peasantSword, swordOfWind, swordOfFire, swordOfThunder, 
    magicWand, bowOfLight, ironHammer]

// Array of entry in weapons Array (less the first one):
var weaponsEntry = []
for (var entry = 1; entry < weapons.length; entry++) {
    weaponsEntry.push(entry)
}
weaponsEntry.shuffle();