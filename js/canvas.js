var Tilewidth = 50;
var ts = new Tileset("basicImage.png");

window.onload = function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    // Variables utiles au canvas
    // vérifier la présence du canvas:
    console.log(canvas)
    ts.loadImage(start);

    function start(){
    ts.drawTile(1, ctx, Tilewidth, Tilewidth);
    ts.drawTile(2, ctx, Tilewidth*2, Tilewidth);
    ts.drawTile(3, ctx, Tilewidth*3, Tilewidth);
    ts.drawTile(4, ctx, Tilewidth*4, Tilewidth);
    ts.drawTile(5, ctx, Tilewidth*5, Tilewidth);
    }

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var dx = j * Tilewidth;
            var dy = i * Tilewidth;
            switch (board[i][j]) {
                case "emptyCase":
                    ctx.drawImage(1, ctx, dx, dy);
                    break;
                case "obstacleCase":
                    ctx.drawImage(2, ctx, dx, dy);
                    break;
                case "chestCase":
                    ctx.drawImage(3, ctx, dx, dy);
                    break;
                case "player1Case":
                    ctx.drawImage(4, ctx, dx, dy);
                    break;
                case "player2Case":
                    ctx.drawImage(5, ctx, dx, dy);
                    break;
            }
        }
    }
}
Map.prototype.dessinerMap = function(context) {
    for(var i = 0, l = this.terrain.length ; i < l ; i++) {
        var ligne = this.terrain[i];
        var y = i * tailleTuile;
        for(var j = 0, k = ligne.length ; j < k ; j++) {
            this.tileset.dessinerTile(ligne[j], context, j * tailleTuile, y);
        }
    }
}