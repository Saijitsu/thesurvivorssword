// Start the game:
$(document).ready(function () {
    $("#startButton").click(function () {
        $(".boardAndPlayersInfo").css("display", "flex");
    });
    $("#startButton").click(function () {
        $(".gameOptionRules").hide();
        // Who starting the game? Select the player Number
        var playerNumber = Math.floor(Math.random() * Math.floor(numbersOfPlayers));
        // the selected player can move
        currentPlayer = players[playerNumber];
        currentPlayerIs()
        console.log("Welcome to Sword of Survivor! There can be only one! The player " +
            players[playerNumber].name + " can start the game. Good luck!")
        currentPlayer.tripArea();
        updateStatistics()
    });
});