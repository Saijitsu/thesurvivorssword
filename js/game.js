// Start the game:
    $("#startButton").click(function () {
        $(".boardAndPlayersInfo").css("display", "flex");
    });
    $("#startButton").click(function () {
        $(".gameOptionRules").hide();
        $("#duel").hide();

        // User-defined settings
    obstacleCell = parseInt(document.getElementById("sliderObstacle").value)
    chestCell = parseInt(document.getElementById("sliderChest").value)
    boardSize = parseInt(document.getElementById("sliderMap").value)
    rows = boardSize
    columns = boardSize
    width = columns * 50;
    height = rows * 50;
    totalCells = columns * rows;

        // Who starting the game? Select the player Number
        var playerNumber = Math.floor(Math.random() * Math.floor(numbersOfPlayers));
        // the selected player can move
        currentPlayer = players[playerNumber];
        currentPlayerIs()

        randomList = new Array();
        for (i = 0; i < totalCells; i++) {
            randomList[i] = i;
        }

        randomList.shuffle();
        console.log(randomList.join());

        // New Map created

        var myMap = new Map(rows, columns, width, height);

        /*
        // New Map created
        var myMap = new Map(rows, columns, width, height);
        */
        // Board creation
        board = new Array(myMap.columns);
        for (var i = 0; i < myMap.rows; i++) {
            board[i] = new Array(myMap.rows);
        }

        // Board Contain
        for (y = 0; y < (board.length); y++) {
            for (x = 0; x < (board.length); x++) {
                currentCellPosition = x + y * board.length;
                // create the object and store a reference to the cell object so you can do something with it later
                var containTypeCell = containType(x, y, board.length, board, currentCellPosition);
                board[y][x] = containTypeCell;
                cellList.push(containTypeCell);
            }
        }
        console.log(board);

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
    });
