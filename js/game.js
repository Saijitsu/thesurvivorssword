// Initialisation du jeu:

function start(){
Console.log("Welcome to Sword of Survivor! There can be only one!");
var starters = playerStartingTheGame(numbersOfPlayers);

}
// Selectionne un nombre entre 0 est le nombre maximun de joueurs defini (débutant à 0):
function playerStartingTheGame(numbersOfPlayers){
    return Math.floor(Math.random() * Math.floor(numbersOfPlayers));
}

