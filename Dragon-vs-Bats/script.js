let player = document.getElementById('image');
let canvas = document.getElementById('canvas');
let body = document.querySelector('#wrapper');
let timer = document.getElementById('timer');
let score = document.querySelector('#score span');
let gameOver = document.getElementById('game-over');
let game = document.getElementById('wrapper');
let lastScore = document.querySelector('#game-over h2 span');

//settings
let canvasTop = 50;
let canvasLeft = 50;
let playerRight = 0;
let kills = 0;

/*variables*/
let walkSpeed = 2;
let batSpawnRate = 2000;
let seconds = 100;

//player default direction
let direction = 'R';

//timer countdown
setInterval(()=>{
 timer.innerText = seconds;
 if (seconds == 10) {
    timer.style.color = '#ff0000';
 }
 if (seconds != 0) {
    seconds--;
 }else{
  game.classList.add('hide');
  gameOver.classList.remove('hide');
  lastScore.textContent = kills;
 }
 
},1000);

//player animation
function animate(){
if (playerRight == 0) {
    playerRight = 190;
    player.style.right = playerRight + 'px';
   }else if (playerRight == 190) {
    playerRight = 390;
    player.style.right = playerRight + 'px';
   } else if (playerRight == 390) {
    playerRight = 590;
    player.style.right = playerRight + 'px';
   } else if (playerRight == 590) {
    playerRight = 0;
    player.style.right = playerRight + 'px';
   }
   setTimeout(animate, 150);
}

animate();

//walk funcs
addEventListener('keydown', (e) => {

    if (e.keyCode == 87 && !(canvasTop <= 15) ) {
        canvasTop -= walkSpeed;
        canvas.style.top = canvasTop + 'vh';
    }

    if (e.keyCode == 65 && !(canvasLeft <= 15)) {
        player.src = "images/playerLeft.png";
        canvasLeft -= walkSpeed;
        direction = 'L';
        canvas.style.left = canvasLeft + 'vw';
    }

    if (e.keyCode == 83) {
        canvasTop += walkSpeed;
        canvas.style.top = canvasTop + 'vh';
    }

    if (e.keyCode == 68) {
        player.src = "images/playerRight.png";
        canvasLeft += walkSpeed;
        direction = 'R';
        canvas.style.left = canvasLeft + 'vw';
    }

})

//shoot func
function shoot()  {
    let img = document.createElement('img');
    img.style.left = canvasLeft + '%';
    img.style.top = canvasTop + '%'; 
    img.classList.add('fireball');

   if (direction == 'R') {
    img.src = 'images/fireball.png';
    img.classList.add('fireballRight');
   }else if (direction == 'L'){
       img.src = 'images/fireballLeft.png';
       img.classList.add('fireballLeft');
   }

    body.appendChild(img);

    setTimeout(function(){
       body.removeChild(img);
    }, 2000);
}

//summon bats
setInterval(function(){
    let shot = false;
    let halfFly = false;
    let batLeft = 0;
    let batDirection = getRandomInt(1,2);
    let batTop = getRandomInt(10,90);
    
    let batEl = document.createElement('div');
    batEl.classList.add('bat-wrapper');
    batEl.style.top = batTop + 'vh';

    //bat direction
    if(batDirection == 1){
        batEl.classList.add('flyRight');
    }else{
        batEl.classList.add('flyLeft');
    }

    let batImg = document.createElement('img');
    batImg.src = 'images/bat.png';
    batImg.classList.add('bat');

    batEl.appendChild(batImg);
    body.appendChild(batEl);

    function animateBat(){
        if (batLeft == 0) {
            batLeft = 200;
            batImg.style.right = batLeft + 'px';
           }else if (batLeft == 200) {
            batLeft = 400;
            batImg.style.right = batLeft + 'px';
           } else if (batLeft == 400) {
            batLeft = 0;
            batImg.style.right = batLeft + 'px';
           } 
           setTimeout(animateBat, 250);
    }

    batEl.addEventListener('click', ()=>{
        let canShoot = false;

        if ((batDirection == 1 && direction == 'L') && (batTop >= canvasTop - 10 && batTop <= canvasTop) && !halfFly || (batDirection == 2 && direction == 'R') && (batTop >= canvasTop - 10 && batTop <= canvasTop) && !halfFly) {
            canShoot = true;
        }

        if (halfFly && (batDirection == 1 && direction == 'R') && (batTop >= canvasTop - 10 && batTop <= canvasTop) || halfFly && (batDirection == 2 && direction == 'L') && (batTop >= canvasTop - 10 && batTop <= canvasTop)) {
            canShoot = true;
        }

        if (canShoot && !shot) {
            shoot();
            batLeft = 0;
            batImg.src = 'images/bat-hit.png';
            kills++;
            
            score.innerText = kills;
            setTimeout(()=>{body.removeChild(batEl)},500);
            shot = true;
        }
    });
      
animateBat();

setTimeout(()=>{halfFly = true;}, 8500);

//remove bat
setTimeout(()=>{body.removeChild(batEl)},17000);

},batSpawnRate)

//restart game
function restartGame(){
    game.classList.remove('hide');
    gameOver.classList.add('hide');
    timer.style.color = '#fff';

    kills = 0;
    seconds = 100;
    
    score.innerText = kills;
}

//random direction
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }