//Game Variables
let alienX = 80;
let alienY = 20;
let guessX = 0;
let guessY = 0;
let shotsRemaining = 8;
let shotsMade = 0;
let gameState = "";
let gameWon = false;

//Game Objects
let cannon = document.querySelector("#cannon");
let alien = document.querySelector("#alien");
let missile = document.querySelector("#missile");

//Input and output fields
let inputX = document.querySelector("#inputX");
let inputY = document.querySelector("#inputY");
let output = document.querySelector("#output");

//button
let button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler);

function render() {
    //Position the alien
    alien.style.left = alienX + "px";
    alien.style.top = alienY + "px";

    //position the cannon
    cannon.style.left = guessX + "px";

    //Position the missile
    missile.style.left = guessX + "px";
    missile.style.top = guessY + "px";
}

function clickHandler() {
    playGame();
}

function playGame() {
    shotsRemaining = shotsRemaining - 1;
    shotsMade = shotsMade + 1;
    gameState = "Shots: " + shotsMade + ", Remaining: " + shotsRemaining;

    guessX = parseInt(inputX.value);
    guessY = parseInt(inputY.value);

    //Find out whether the player's x and y guesses are inside the alien area
    if (guessX >= alienX && guessX <= alienX + 20) {
        //Yes, it's within the X range, so now let's check the Y range
        if (guessY >= alienY && guessY <= alienY + 20) {
            //It's in both the X and Y range, so it's a hit
            gameWon = true;
            endGame();
        }
        else {
            output.innerHTML = "Miss! " + gameState;
            if (shotsRemaining < 1) {
                endGame();
            }
        }
    }
    else {
        output.innerHTML = "Miss! " + gameState;

        //Check for the end of the game
        if (shotsRemaining < 1) {
            endGame();
        }
    }
    if (!gameWon) {
        //Update the alien's X position
        alienX = Math.floor(Math.random() * 280);
        //Add 30 to the new Y position so that the alien moves down
        //toward each shot
        alienY += 30;
    }

    render();
    console.log("X: " + alienX);
    console.log("Y: " + alienY);
}

function endGame() {
    if (gameWon) {
        output.innerHTML = `
            Hit! You saved the earth! <br> 
            It only took you ${shotsMade} shots.
        `;
    } else {
        output.innerHTML = `
            You lost <br> The earth has been invaded!
        `;
    }
}