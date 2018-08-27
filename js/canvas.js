var imgEmptyCase = new Image(); // Crée un nouvel élément img
imgEmptyCase.src = "../image/freeCasev3.png"; // Définit le chemin vers sa source
var imgObstacleCase = new Image(); // Crée un nouvel élément img
imgObstacleCase.src = "../image/blockCasev3.png"; // Définit le chemin vers sa source
var imgChestCase = new Image(); // Crée un nouvel élément img
imgChestCase.src = "../image/chestV2.gif"; // Définit le chemin vers sa source
var imgPlayer1 = new Image(); // Crée un nouvel élément img
imgPlayer1.src = "../image/playerNaked1v2.jpg"; // Définit le chemin vers sa source
var imgPlayer2 = new Image(); // Crée un nouvel élément img
imgPlayer2.src = "../image/player2Naked1v2.jpg"; // Définit le chemin vers sa source 

window.onload = function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    // Variables utiles au canvas
    // vérifier la présence du canvas:
    console.log(canvas)
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            // attribution d'un ID/CELL
            var dx = j * 50;
            var dy = i * 50;
            switch (board[i][j]) {
                case emptyCase:
                    ctx.drawImage(imgEmptyCase, dx, dy);
                    break;
                case obstacleCase:
                    ctx.drawImage(imgObstacleCase, dx, dy);
                    break;
                case chestCase:
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
    }
}