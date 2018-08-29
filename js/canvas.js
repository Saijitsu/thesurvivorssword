var Tilewidth = 50;
var ts = new Tileset("basicImage.png");

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    // Variables utiles au canvas
    // vérifier la présence du canvas:
    console.log(canvas);

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var dx = j * Tilewidth;
            var dy = i * Tilewidth;
            switch (board[i][j]) {
                case emptyCase:
                    ts.drawTile(1, ctx, dx, dy);
                    break;
                case obstacleCase:
                    ts.drawTile(2, ctx, dx, dy);
                    break;
                case chestCase:
                    ts.drawTile(3, ctx, dx, dy);
                    break;
                case player1Case:
                    ts.drawTile(4, ctx, dx, dy);
                    break;
                case player2Case:
                    ts.drawTile(5, ctx, dx, dy);
                    break;
            }
        }
    }
}
