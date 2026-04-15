let player = document.getElementById("player");
let enemy = document.getElementById("enemy");
let game = document.getElementById("game");
let healthText = document.getElementById("health");

// PLAYER STATE
let x = 50;
let y = 260;
let velocityY = 0;
let gravity = 0.5;
let jumping = false;

let moveL = false;
let moveR = false;

let attacking = false;
let attackRange = 50;

let health = 100;

// ENEMY
let enemyX = 500;
let enemyDir = 1;

// CONTROLS
function moveLeft(state) { moveL = state; }
function moveRight(state) { moveR = state; }

function jump() {
  if (!jumping) {
    velocityY = -10;
    jumping = true;
  }
}

function attack() {
  attacking = true;
  setTimeout(() => attacking = false, 300);
}

// COLLISION CHECK
function isColliding(x1,y1,w1,h1,x2,y2,w2,h2){
  return x1 < x2+w2 && x1+w1 > x2 &&
         y1 < y2+h2 && y1+h1 > y2;
}

// GAME LOOP
function gameLoop() {

  // MOVEMENT
  if (moveL) x -= 3;
  if (moveR) x += 3;

  // GRAVITY
  velocityY += gravity;
  y += velocityY;

  if (y >= 260) {
    y = 260;
    jumping = false;
  }

  // ENEMY AI (patrol)
  enemyX += enemyDir * 2;
  if (enemyX > 700 || enemyX < 400) enemyDir *= -1;

  // PLAYER HIT ENEMY
  if (attacking && Math.abs(x - enemyX) < attackRange) {
    enemy.style.display = "none";
  }

  // ENEMY DAMAGE PLAYER
  if (isColliding(x,y,40,40,enemyX,260,40,40)) {
    health -= 0.2;
  }

  // UPDATE UI
  healthText.innerText = "Health: " + Math.floor(health);

  if (health <= 0) {
    alert("Game Over");
    location.reload();
  }

  // CAMERA FOLLOW
  game.style.left = (-x + 100) + "px";

  // APPLY POSITIONS
  player.style.left = x + "px";
  player.style.top = y + "px";

  enemy.style.left = enemyX + "px";

  requestAnimationFrame(gameLoop);
}

gameLoop();
