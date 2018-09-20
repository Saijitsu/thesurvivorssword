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
////// Zone A réduire début /////////////
                case weapons[0]: // Tresure Chest
                    ctx.fillStyle = "red";
                    ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    if (board[i][j].highLightning == true) {
                        ctx.fillStyle = "rgba(233, 56, 63, 0.3)";
                        ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    } else {}
                    break;
                case weapons[1]: // Tresure Chest
                    if (weapons[1].worn == false) {
                        ts.drawTile(3, ctx, dx, dy);
                    } else if (weapons[1].worn == true) {
                        ctx.fillStyle = "red";
                        ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    }
                    if (board[i][j].highLightning == true) {
                        ctx.fillStyle = "rgba(233, 56, 63, 0.3)";
                        ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    } else {}
                    break;
                    case weapons[2]: // Tresure Chest
                    if (weapons[2].worn == false) {
                        ts.drawTile(3, ctx, dx, dy);
                    } else if (weapons[2].worn == true) {
                        ctx.fillStyle = "red";
                        ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    }
                    if (board[i][j].highLightning == true) {
                        ctx.fillStyle = "rgba(233, 56, 63, 0.3)";
                        ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    } else {}
                    break;
                    case weapons[3]: // Tresure Chest
                    if (weapons[3].worn == false) {
                        ts.drawTile(3, ctx, dx, dy);
                    } else if (weapons[3].worn == true) {
                        ctx.fillStyle = "red";
                        ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    }
                    if (board[i][j].highLightning == true) {
                        ctx.fillStyle = "rgba(233, 56, 63, 0.3)";
                        ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    } else {}
                    break;
                    case weapons[4]: // Tresure Chest
                    if (weapons[4].worn == false) {
                        ts.drawTile(3, ctx, dx, dy);
                    } else if (weapons[4].worn == true) {
                        ctx.fillStyle = "red";
                        ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    }
                    if (board[i][j].highLightning == true) {
                        ctx.fillStyle = "rgba(233, 56, 63, 0.3)";
                        ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    } else {}
                    break;
                    case weapons[5]: // Tresure Chest
                    if (weapons[5].worn == false) {
                        ts.drawTile(3, ctx, dx, dy);
                    } else if (weapons[5].worn == true) {
                        ctx.fillStyle = "red";
                        ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    }
                    if (board[i][j].highLightning == true) {
                        ctx.fillStyle = "rgba(233, 56, 63, 0.3)";
                        ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    } else {}
                    break;
                    case weapons[6]: // Tresure Chest
                    if (weapons[6].worn == false) {
                        ts.drawTile(3, ctx, dx, dy);
                    } else if (weapons[6].worn == true) {
                        ctx.fillStyle = "red";
                        ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    }
                    if (board[i][j].highLightning == true) {
                        ctx.fillStyle = "rgba(233, 56, 63, 0.3)";
                        ctx.fillRect(dx, dy, Tilewidth, Tilewidth);
                    } else {}
                    break;
////// Zone A réduire fin /////////////
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