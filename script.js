
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const WIDTH = 600;
const HEIGHT = 400;
const CELL_SIZE = 20;


const DARK_BG = '#141414';
const SNAKE_COLOR = '#00c800';
const FOOD_COLOR = '#c80000';
const TEXT_COLOR = '#ffffff';

let snake;
let food;
let dx, dy;
let length;
let score;
let highScore = 0;
let gameRunning = false;
let gameOver = false;


highScore = localStorage.getItem('snakeHighScore') || 0;

/**
 * Draw centered text at Y position
 */
function drawText(text, y) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = '28px Consolas';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle'; // Proper vertical centering
  ctx.fillText(text, WIDTH / 2, y);
}

/**
 * Show start screen
 */
function startScreen() {
  ctx.fillStyle = DARK_BG;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  drawText("Sparsh's Snake Game", HEIGHT / 2 - 30);
  drawText("Press S to Start", HEIGHT / 2 + 20);
}

/**
 * Show game over screen
 */
function gameOverScreen() {
  ctx.fillStyle = DARK_BG;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  drawText(`Game Over! Score: ${score}`, HEIGHT / 2 - 50);
  drawText(`High Score: ${highScore}`, HEIGHT / 2 - 10);
  drawText(`Press C to Play Again or Q to Quit`, HEIGHT / 2 + 30);
}

/**
 * Show score and high score during game
 */
function showScore() {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = '20px Consolas';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Score: ${score}`, 10, 10);
  ctx.fillText(`High Score: ${highScore}`, 10, 35);
}

/**
 * Initialize or restart game state
 */
function init() {
  dx = CELL_SIZE;
  dy = 0;
  snake = [{ x: WIDTH / 2, y: HEIGHT / 2 }];
  length = 1;
  score = 0;
  placeFood();
  gameRunning = true;
  gameOver = false;
}

/**
 * Place food at random position
 */
function placeFood() {
  food = {
    x: Math.floor(Math.random() * WIDTH / CELL_SIZE) * CELL_SIZE,
    y: Math.floor(Math.random() * HEIGHT / CELL_SIZE) * CELL_SIZE
  };
}

/**
 * Update game state
 */
function update() {
  if (!gameRunning) return;

  // Calculate new head
  const head = { x: snake[snake.length - 1].x + dx, y: snake[snake.length - 1].y + dy };
  snake.push(head);

  if (snake.length > length) {
    snake.shift();
  }

  // Check wall collision
  if (head.x < 0 || head.x >= WIDTH || head.y < 0 || head.y >= HEIGHT) {
    endGame();
  }

  // Check self collision
  for (let i = 0; i < snake.length - 1; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      endGame();
    }
  }

  // Check food collision
  if (head.x === food.x && head.y === food.y) {
    length++;
    score++;
    placeFood();
  }
}

/**
 * Draw game
 */
function draw() {
  if (!gameRunning && !gameOver) {
    startScreen();
    return;
  }

  if (gameOver) {
    gameOverScreen();
    return;
  }

  // Draw background
  ctx.fillStyle = DARK_BG;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Draw snake
  ctx.fillStyle = SNAKE_COLOR;
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, CELL_SIZE, CELL_SIZE);
  });

  // Draw food
  ctx.fillStyle = FOOD_COLOR;
  ctx.fillRect(food.x, food.y, CELL_SIZE, CELL_SIZE);

  // Draw score
  showScore();
}

/**
 * Handle game over: save high score
 */
function endGame() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('snakeHighScore', highScore);
  }
  gameRunning = false;
  gameOver = true;
}

/**
 * Main game loop
 */
function gameLoop() {
  update();
  draw();
}

/**
 * Keyboard controls
 */
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (!gameRunning && !gameOver && key === 's') {
    init();
  } else if (gameOver) {
    if (key === 'c') {
      init();
    } else if (key === 'q') {
      window.close();
    }
  } else if (gameRunning) {
    if (e.key === 'ArrowUp' && dy === 0) {
      dx = 0; dy = -CELL_SIZE;
    } else if (e.key === 'ArrowDown' && dy === 0) {
      dx = 0; dy = CELL_SIZE;
    } else if (e.key === 'ArrowLeft' && dx === 0) {
      dx = -CELL_SIZE; dy = 0;
    } else if (e.key === 'ArrowRight' && dx === 0) {
      dx = CELL_SIZE; dy = 0;
    }
  }
});

// Run the game loop at 12 FPS
setInterval(gameLoop, 1000 / 12);

// Show start screen
startScreen();
