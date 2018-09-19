////////////////////LE CANVAS////////////////////////////

var Tilewidth = 50;
var ts = new Tileset("basicImage.png");

function draw() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Variables utiles au canvas
    // vérifier la présence du canvas:
    console.log(canvas);

    for (var i = 0; i < myMap.rows; i++) {
        for (var j = 0; j < myMap.rows; j++) {
            var dx = j * Tilewidth;
            var dy = i * Tilewidth;
            switch (board[i][j].contain) {
                case 0: // Empty Case (like grass)
                    ts.drawTile(1, ctx, dx, dy);
                    if (board[i][j].highLightning == true) {
                        ctx.fillStyle = "rgba(233, 56, 63, 0.3)";
                        ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    } else {}
                    break;
                case 1: // Obstacle Case
                    ts.drawTile(2, ctx, dx, dy);
                    break;
                case 2: // Chest
                    ts.drawTile(3, ctx, dx, dy);
                    if (board[i][j].highLightning == true) {
                        ctx.fillStyle = "rgba(233, 56, 63, 0.3)";
                        ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    } else {}
                    break;
                case players[0]: // Player 1
                    ts.drawTile(4, ctx, dx, dy);
                    break;
                case players[1]: // Player 2
                    ts.drawTile(5, ctx, dx, dy);
                    break;
            }
        }
    }
}
