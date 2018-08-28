function Tileset(url) {
    // Chargement de l'image dans l'attribut image
    this.image = new Image();

    this.image.referenceOfTileset = this; //on applique referenceOfTileset sur this.image

    this.image.onload = function () {

        if (!this.complete)
            throw new Error("Erreur de chargement du tileset nommé \"" + url + "\".");
        // Largeur du tileset en tiles
        this.referenceOfTileset.width = this.width / Tilewidth;
    }
    this.image.src = "../image/tilesets/" + url;
}

// Méthode de dessin du tile numéro "number" dans le contexte 2D "context" aux coordonnées x et y
Tileset.prototype.drawTile = function (number, context, xDestination, yDestination) {
    // pour X et Y
    var xSourceTiles = number % this.width;

    if (xSourceTiles == 0) xSourceTiles = this.width;
    var ySourceTiles = Math.ceil(number / this.width);

    var xSource = (xSourceTiles - 1) * Tilewidth;
    var ySource = (ySourceTiles - 1) * Tilewidth;
    // pourquoi le -1 :le tile numéro 1 est situé aux coordonnées (0, 0), pas (50, 50).
    context.drawImage(this.image, xSource, ySource, Tilewidth, Tilewidth, xDestination, yDestination, Tilewidth, Tilewidth);
}

/* souci ici: l'image n'est pas encore complètement chargée quand on lui demande de se dessiner. 
Pour remédier à ça, on va créer une fonction load qui va simplement loader l'image, 
et appeler une fonction dès qu'elle a terminé =>*/

Tileset.prototype.loadImage = function (callback) {
    this.image.onload = (function () { //ici si on passe regarde la valeur de "this" elle correspond à Tileset
        this.referenceofTileset.width = this.width / Tilewidth;
        //mais ici "this" correspond à l'image ("this.image") car on est à l'intérieur de load qui est appelée par l'image
        console.log("loadé!");
        callback();
    }).bind(this);
}

/* RAPPEL
image                     / L'image source /                             this.image

sx               / Coordonnée x du tile dans le tileset /                   xxxxx
sy              / Coordonnée y du tile dans le tileset /                    xxxxx
sw              / Largeur de l'image source /                                Tilewidth
sh               / Hauteur de l'image source /                               Tilewidth
dx           / Coordonnée x de destination /                             xDestination
dy              / Coordonnée y de destination /                          yDestination
dw               / Largeur de l'image a dessiner /                           Tilewidth
dh               / Hauteur de l'image a dessiner /                           Tilewidth
*/