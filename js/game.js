// Start the game:
$("#startButton").click(function () {
    $(".boardAndPlayersInfo").css("display", "flex");
});
$("#startButton").click(function () {
    $(".gameOptionRules").hide();
    $("#duel").hide();
    $("#victory").hide()
    userDefinedSettings()
    // Who starting the game? Select the player Number
    var playerNumber = Math.floor(Math.random() * Math.floor(numbersOfPlayers));
    currentPlayer = players[playerNumber]; //Selected starting Player
    currentPlayerIs()
    createRandomCellList()
    boardCreation() //create the board
    // Modify CSS elements
    var elmt = document.getElementById("canvas");
    // Modify style
    elmt.style.background = getGradiantBackground();
    elmt.style.border = "1px solid #EEC965";
    elmt.width = width;
    elmt.height = height;
    console.log("Welcome to Sword of Survivor! There can be only one! The player " +
        players[playerNumber].name + " can start the game. Good luck!")
    draw()
    currentPlayer.tripArea();
    updateStatistics()
    change_track(adventureMusic)
});