let player = document.getElementById("player");
let healthText = document.getElementById("health");

let x = 100;
let y = 200;
let velocityY = 0;
let gravity = 0.7;
let jumping = false;

let moveL = false;
let moveR = false;

let health = 100;

// ANIMATION FRAMES
let frames = ["ninja_idle.png","ninja_run1.png","ninja_run2.png"];
let frameIndex = 0;

// OBSTACLES
let obstacles = [];

function moveLeft(s){ moveL = s; }
function moveRight(s){ moveR = s; }

function jump(){
  if(!jumping){
    velocityY = -15;
    jumping = true;
  }
}

function attack(){
  player.src = "ninja_attack.png";
  setTimeout(()=> player.src = frames[0],200);
}

// SPAWN OBSTACLES
function spawnObstacle(){
  let obs = document.createElement("div");
  obs.className = "obstacle";

  let posX = window.innerWidth + Math.random()*200;

  obs.style.left = posX + "px";
  obs.style.bottom = "60px";

  document.getElementById("game").appendChild(obs);

  obstacles.push({el: obs, x: posX});
}

// COLLISION
function collide(a, b){
  return a.x < b.x+50 && a.x+50 > b.x && a.y < 100;
}

function gameLoop(){

  // MOVE
  if(moveL) x -= 4;
  if(moveR) x += 4;

  // GRAVITY
  velocityY += gravity;
  y += velocityY;

  if(y > 200){
    y = 200;
    jumping = false;
  }

  // ANIMATION
  if(moveL || moveR){
    frameIndex = (frameIndex+1)%frames.length;
    player.src = frames[frameIndex];
  }

  // SPAWN
  if(Math.random()<0.02) spawnObstacle();

  // UPDATE OBSTACLES
  obstacles.forEach((o,i)=>{
    o.x -= 6;
    o.el.style.left = o.x + "px";

    if(collide({x,y}, o)){
      health -= 1;
    }

    if(o.x < -50){
      o.el.remove();
      obstacles.splice(i,1);
    }
  });

  // HEALTH
  healthText.innerText = "Health: " + health;

  if(health <= 0){
    alert("Game Over");
    location.reload();
  }

  player.style.left = x + "px";
  player.style.bottom = y + "px";

  requestAnimationFrame(gameLoop);
}

gameLoop();
