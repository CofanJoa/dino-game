const player = document.getElementById("player")
const cactus = document.getElementById("cactus");
const background = document.getElementById("background");
const buttonPlayStop = document.getElementById("buttonPlayStop");
const restartButton = document.getElementById("restartGame");
const board = document.getElementById("board");



function checkCollision() {
    const playerWidth = 70;
    const playerHeight = 70;
    const playerX = player.offsetLeft;
    const playerY = player.offsetTop;
    const cactusWidth = 55;
    const cactusHeight = 80;
    const cactusX = cactus.offsetLeft;
    const cactusY = cactus.offsetTop;

    if (playerX + playerWidth > cactusX &&
        playerX < cactusX + cactusWidth &&
        playerY + playerHeight > cactusY &&
        playerY < cactusY + cactusHeight) {
      // Colisión detectada
    alert("¡Perdiste! Presiona aceptar para volver a jugar.");
    resetScore();
    pauseGame();
    resumeGame();
    } else {
      // No hay colisión
    console.log("No hay colisión.");
    }
}

setInterval(checkCollision, 10);


window.addEventListener("load", function() {
    // Detener animación y conteo de puntos
    pauseGame();
    // Reiniciar el juego
    restartGame();
});




let scoreInterval;
let score = 0;

//Dino jump
board.addEventListener("click", function(){
    playerJump();
})

function playerJump() {
    player.classList.add("playerJump");;
}

player.addEventListener('animationend', () => {
    removeJump();
})

function removeJump() {
    player.classList.remove("playerJump");;
}
//Pause game function

function pauseGame() {
    pauseAnimation();
    stopScore();
}

//Pause animation function

function pauseAnimation() {
    cactus.style.animationPlayState = 'paused';
    player.style.animationPlayState = 'paused';
    background.style.animationPlayState = 'paused';
}

//Resume Score function

function resumeScore(){
    scoreInterval = setInterval(() => {
        score++;
        document.getElementById("score").innerText = score;
    }, 1000);
    
}

//Stop score function

function stopScore(){
    clearInterval(scoreInterval);
}

//Resume animation function

function resumeAnimation() {
    cactus.style.animationPlayState = 'running';
    player.style.animationPlayState = 'running';
    background.style.animationPlayState = 'running';
}

//Resume game function

function resumeGame() {
    resumeAnimation();
    resumeScore();
    
}

//Boton play pause
buttonPlayStop.addEventListener('click', () => {
    if (buttonPlayStop.classList.contains("play")) {
        //Reanudo
        resumeGame();
        
    }
    else {
        pauseGame();
    }
    buttonPlayStop.classList.toggle("play");
})

restartButton.addEventListener('click', restartGame)

function restartGame() {
    resetScore();
    removeJump();
    cactus.classList.remove("cactusMovement");
    void cactus.offsetWidth;
    cactus.classList.add("cactusMovement");
}

function resetScore() {
    score = 0;
    document.getElementById("score").innerText = score;
}

document.addEventListener("keyup", (event) => {
    if (event.key == 'ArrowUp') {
        playerJump();
    }
})





