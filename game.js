let player = document.getElementById("player");
let game = document.getElementById("game");
let healthText = document.getElementById("health");

let x = 100;
let y = window.innerHeight - 120;
let velocityY = 0;
let gravity = 0.6;
let jumping = false;

let moveL = false;
let moveR = false;

let attacking = false;

let health = 100;

// OBSTACLES
let obstacles = [];

// CONTROLS
function moveLeft(state) { moveL = state; }
function moveRight(state) { moveR = state; }

function jump() {
  if (!jumping) {
    velocityY = -12;
    jumping = true;
  }
}

function attack() {
  attacking = true;
  player.classList.add("attacking");
  setTimeout(() => {
    attacking = false;
    player.classList.remove("attacking");
  }, 200);
}

// CREATE OBSTACLES
function spawnObstacle() {
  let obs = document.createElement("div");
  obs.classList.add("obstacle");

  let obsX = x + window.innerWidth + Math.random()*300;
  let obsY = window.innerHeight - 120;

  obs.style.left = obsX + "px";
  obs.style.top = obsY + "px";

  game.appendChild(obs);

  obstacles.push({element: obs, x: obsX, y: obsY});
}

// COLLISION
function isColliding(a, b) {
  return (
    a.x < b.x + 50 &&
    a.x + 50 > b.x &&
    a.y < b.y + 50 &&
    a.y + 50 > b.y
  );
}

// GAME LOOP
function gameLoop() {

  // MOVEMENT
  if (moveL) {
    x -= 4;
    player.classList.add("running");
  }
  if (moveR) {
    x += 4;
    player.classList.add("running");
  }
  if (!moveL && !moveR) {
    player.classList.remove("running");
  }

  // GRAVITY
  velocityY += gravity;
  y += velocityY;

  if (y >= window.innerHeight - 120) {
    y = window.innerHeight - 120;
    jumping = false;
    player.classList.remove("jumping");
  } else {
    player.classList.add("jumping");
  }

  // SPAWN OBSTACLES
  if (Math.random() < 0.02) spawnObstacle();

  // UPDATE OBSTACLES
  obstacles.forEach((obs, i) => {
    obs.x -= 5;
    obs.element.style.left = obs.x + "px";

    // COLLISION FIXED (SOLID)
    if (isColliding({x,y}, obs)) {
      health -= 1;
    }

    // REMOVE OFFSCREEN
    if (obs.x < -50) {
      obs.element.remove();
      obstacles.splice(i,1);
    }
  });

  // HEALTH
  healthText.innerText = "Health: " + health;

  if (health <= 0) {
    alert("Game Over");
    location.reload();
  }

  // CAMERA FOLLOW
  game.style.left = (-x + 150) + "px";

  // APPLY PLAYER POS
  player.style.left = x + "px";
  player.style.top = y + "px";

  requestAnimationFrame(gameLoop);
}

gameLoop();
