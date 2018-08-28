window.onload = function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    // Variables utiles au canvas
    // vérifier la présence du canvas:
    console.log(canvas)
    var ts = new Tileset("basicImage.png");
    ts.loadImage(demarrer);
    function demarrer(){
    ts.drawTile(1, ctx, 50, 50);
    ts.drawTile(2, ctx, 100, 50);
    ts.drawTile(3, ctx, 150, 50);
    ts.drawTile(4, ctx, 200, 50);
    ts.drawTile(5, ctx, 250, 50);
    }
/*
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var dx = j * 50;
            var dy = i * 50;
            switch (board[i][j]) {
                case "emptyCase":
                    ctx.drawImage(imgEmptyCase, dx, dy);
                    break;
                case "obstacleCase":
                    ctx.drawImage(imgObstacleCase, dx, dy);
                    break;
                case "chestCase":
                    ctx.drawImage(imgChestCase, dx, dy);
                    break;
                case player1Case:
                    ctx.drawImage(imgPlayer1, dx, dy);
                    break;
                case player2Case:
                    ctx.drawImage(imgPlayer2, dx, dy);
                    break;
            }
        }
    }*/
}
