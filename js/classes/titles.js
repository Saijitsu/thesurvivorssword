function Tileset(url) {
    // Chargement de l'image dans l'attribut image
    this.image = new Image();
    this.image.src = "tilesets/" + url;
    this.image.referenceOfTileset = this; //on applique referenceofTileset sur this.image
    
}

// Méthode de dessin du tile numéro "number" dans le contexte 2D "context" aux coordonnées x et y
Tileset.prototype.drawTile = function (number, context, xDestination, yDestination) {

// Largeur du tileset en tiles
    this.referenceDuTileset.width = this.width / 50;

// pour X
    var xSourceEnTiles = number % this.width;
if(xSourceEnTiles == 0) xSourceEnTiles = this.width;
// Pour Y
var ySourceEnTiles = Math.ceil(number / this.width);

var xSource = (xSourceEnTiles - 1) * 50;
var ySource = (ySourceEnTiles - 1) * 50;
// pourquoi le -1 :le tile numéro 1 est situé aux coordonnées (0, 0), pas (50, 50).
context.drawImage(this.image, xSource, ySource, 50, 50, xDestination, yDestination, 50, 50);

Tileset.prototype.loadImage = function(callback){
    this.image.onload = (function(){//ici 'this' c'est Tileset
      this.referenceofTileset.width = this.width / 50;
      //mais ici 'this' c'est l'image (this.image) car on est à l'intérieur de load qui est appelée par l'image
      console.log("loadé!");
      callback();
    }).bind(this);
}
}

// Callback cf. bind

/* RAPPEL
image                     / L'image source /                             this.image

sx               / Coordonnée x du tile dans le tileset /                   xxxxx
sy              / Coordonnée y du tile dans le tileset /                    xxxxx
sw              / Largeur de l'image source /                                50
sh               / Hauteur de l'image source /                               50
dx           / Coordonnée x de destination /                             xDestination
dy              / Coordonnée y de destination /                          yDestination
dw               / Largeur de l'image a dessiner /                           50
dh               / Hauteur de l'image a dessiner /                           50
*/