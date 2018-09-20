// Initialisation du jeu:

function start() {
    Console.log("Welcome to Sword of Survivor! There can be only one!");
    // Who starting the game? Select the player Number
    var playerNumber = Math.floor(Math.random() * Math.floor(numbersOfPlayers));
    // the selected player can move
    currentPlayer = players[playerNumber];
    currentPlayer.changeOfPosition()
}