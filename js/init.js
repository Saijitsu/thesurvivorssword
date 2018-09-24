// Variables gobales et variables définies par l'utilisateur
var numbersOfPlayers = 2;
var currentPlayer = null;
var highLightning = [] // A alimenter avec les cellules a mettre en surbrillance.
var rows = 10;
var columns = 10;
var width = columns * 50;
var height = rows * 50;
var totalCells = rows * columns;
var tilePixelCut = 50;

function newBackgroundColor() {
    var valuesOfHex = ["#9dc183", "#708238", "#00A86B", "#00A572", "#00A572", "#00A572", "#00A572]"];
    var firstColor = valuesOfHex[Math.floor(Math.random()*valuesOfHex.length)];
    var secondColor = valuesOfHex[Math.floor(Math.random()*valuesOfHex.length)];
    var angle = Math.round(Math.random() * 360);

    var value = "linear-gradient(" + angle + "deg, " + firstColor + ", " + secondColor + ")";
    return value
}

var lineargradient = newBackgroundColor();

// modify CSS elements
var elmt = document.getElementById("canvas");

// modify style
elmt.style.background = lineargradient;
elmt.style.border = "1px solid #ccc";
elmt.style.width = "\"" + width + "\"";
elmt.style.height = "\"" + height + "\"";
