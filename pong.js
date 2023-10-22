const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    dx: 4,
    dy: 4
};

let playerPaddle = {
    x: 0,
    y: canvas.height / 2 - 60,
    width: 10,
    height: 120,
    dy: 4,
    score: 0
};

let aiPaddle = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 60,
    width: 10,
    height: 120,
    dy: 4,
    color: "red",
    score: 0
};

function movePaddle(paddle, upKey, downKey) {
    document.addEventListener("keydown", function (event) {
        switch (event.keyCode) {
            case upKey:
                paddle.y -= paddle.dy;
                break;
            case downKey:
                paddle.y += paddle.dy;
                break;
        }
    });
}

movePaddle(playerPaddle, 38, 40);  // ArrowUp and ArrowDown for player

function aiMovement() {
    let middleOfPaddle = aiPaddle.y + aiPaddle.height / 2;
    if (middleOfPaddle < ball.y) {
        aiPaddle.y += aiPaddle.dy;
    } else {
        aiPaddle.y -= aiPaddle.dy;
    }
}

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    if ((ball.dx > 0 && ball.x + ball.radius > aiPaddle.x && ball.y + ball.radius > aiPaddle.y && ball.y - ball.radius < aiPaddle.y + aiPaddle.height)
        || (ball.dx < 0 && ball.x - ball.radius < playerPaddle.x + playerPaddle.width && ball.y + ball.radius > playerPaddle.y && ball.y - ball.radius < playerPaddle.y + playerPaddle.height)) {
        ball.dx = -ball.dx;
    }

    if (ball.x - ball.radius < 0) {
        aiPaddle.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        playerPaddle.score++;
        resetBall();
    }

    aiMovement();
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    ctx.fillStyle = aiPaddle.color;
    ctx.fillRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();

    // Scoreboard
    ctx.font = "30px Arial";
    ctx.fillText("HUMAN: " + playerPaddle.score, 20, 30);
    ctx.fillText("ESKOM: " + aiPaddle.score, canvas.width - 170, 30);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();