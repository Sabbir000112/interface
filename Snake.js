function criarCobrinha() {
    for (let i = 0; i < snake.length; i++) {
        // Adjust the size of each segment based on its position in the snake
        let segmentSize = box - (i * 2); // Tapering effect
        if (segmentSize < 10) segmentSize = 10; // Minimum size for the tail

        // Set colors for the head and body
        context.fillStyle = i === 0 ? "darkgreen" : "green";

        // Create rounded segments using arcs
        context.beginPath();
        context.arc(
            snake[i].x + box / 2, 
            snake[i].y + box / 2, 
            segmentSize / 2, 
            0, 
            Math.PI * 2
        );
        context.fill();
        context.closePath();
    }
}
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [{ x: 8 * box, y: 8 * box }];
let direction = "right";
let food = spawnFood();
let score = 0;
let highScore = 0;
let level = 1;
let speed = 300;
let multiplayer = false;
let obstacles = [];
let powerUps = [];

function spawnFood() {
    return {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box,
        type: Math.random() > 0.8 ? "power-up" : "normal",
    };
}

function criarBG() {
    context.fillStyle = "white"; // Change to white
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (let i = 0; i < snake.length; i++) {
        let segmentSize = box - (i * 2); // Tapering effect
        if (segmentSize < 10) segmentSize = 10; // Minimum size for the tail

        context.fillStyle = i === 0 ? "darkgreen" : "green";

        context.beginPath();
        context.arc(
            snake[i].x + box / 2, 
            snake[i].y + box / 2, 
            segmentSize / 2, 
            0, 
            Math.PI * 2
        );
        context.fill();
        context.closePath();
    }
}

function drawFood() {
    context.fillStyle = food.type === "power-up" ? "blue" : "red";
    context.fillRect(food.x, food.y, box, box);
}

function drawObstacles() {
    context.fillStyle = "brown";
    for (let i = 0; i < obstacles.length; i++) {
        context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }
}

function drawPowerUps() {
    context.fillStyle = "yellow";
    for (let i = 0; i < powerUps.length; i++) {
        context.fillRect(powerUps[i].x, powerUps[i].y, box, box);
    }
}

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Game Over :(');
            resetGame();
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();
    drawObstacles();
    drawPowerUps();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        if (food.type === "power-up") {
            speed -= 20;
            level++;
            document.getElementById("level").innerText = "Level: " + level;
        }
        food = spawnFood();
        score++;
        document.getElementById("score").innerText = score;
        if (score > highScore) {
            highScore = score;
            document.getElementById("highScore").innerText = highScore;
        }
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    snake.unshift(newHead);
}

function resetGame() {
    snake = [{ x: 8 * box, y: 8 * box }];
    direction = "right";
    score = 0;
    level = 1;
    speed = 200;
    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = "Level: " + level;
    jogo = setInterval(iniciarJogo, speed);
}

function toggleMultiplayer() {
    multiplayer = !multiplayer;
    alert(multiplayer ? "Multiplayer Mode Activated!" : "Multiplayer Mode Deactivated!");
}

let jogo = setInterval(iniciarJogo, speed);
