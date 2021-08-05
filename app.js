// JavaScript Document

let gameMusic = new Audio('sounds/gameMusic.wav');
gameMusic.volume = .125;
gameMusic.loop = true;
gameMusic.play();
//Key Codes for Keyboard Controls

const leftArrowKeycode = 37;
const rightArrowKeycode = 39;
const spacebarKeycode = 32;

//Get gameContainer Node

const gameContainer = document.querySelector('.gameContainer');

//Get modal Node

const modal = document.querySelector('.modal');
const start = document.getElementById('start');

//Create Player Ship

const playerShip = document.createElement('img');


//Get gameContainer Node Width/Height

const gameContainer_width = Math.max(gameContainer.clientWidth);
const gameContainer_height = Math.max(gameContainer.clientHeight);

//Player Ship Details

const playerShipWidth = Math.max(playerShip.clientWidth);
const playerShipMaxSpeed = 600;

//Rocket Details
const rocketMaxSpeed = 500;
const rocketCoolDown = .5;

//Enemy layout
const numberOfEnemiesRGY_perRow = 4;
const numberOfEnemiesRB_perRow = 8;
const numberOfEnemiesRYB_perRow = 10;

const enemyRGYHorPadding = 220;
const enemyRGYVerPadding = 70;
const enemyRGYVerSpacing = 80;

const enemyRBHorPadding = 100;
const enemyRBVerPadding = 130;
const enemyRBVerSpacing = 50;

const enemyRYBHorPadding = 50;
const enemyRYBVerPadding = 240;
const enemyRYBVerSpacing = 50;

const enemyRocketMaxSpeed = 200;
const enemyRocketCoolDown = 15;

const scoreCounterNode = document.querySelector('.scoreCount');
let score = 0;
scoreCounterNode.textContent = score;

//Default Game State

const gameDefaultState = {
	lastTimeRecorded: Date.now(),
	leftKeyPressed: false,
	rightKeyPressed: false,
	spaceKeyPressed: false,
	playerPositionX: 0,
	playerPositionY: 0,
	playerCooldown: 0,
	rockets: [], /*Created rockets pushed into empty array*/
	enemies: [], /*Created enemies pushed into empty array*/
	eRockets: [] /*Created enemy rockets pushed into empty array*/
};

//Initialize Game Function

function init(){
	
	createPlayerShip(gameContainer)
	
	const spacingForEnemyRGY = (gameContainer_width - enemyRGYHorPadding * 2) / (numberOfEnemiesRGY_perRow - 1);
	
	const spacingForEnemyRB = (gameContainer_width - enemyRBHorPadding * 2) / (numberOfEnemiesRB_perRow - 1);
	
	const spacingForEnemyRYB = (gameContainer_width - enemyRYBHorPadding * 2) / (numberOfEnemiesRYB_perRow - 1);
	
	//Disfine number for rows and spaceing from global variables
	for(let a = 0; a < 1; a++) {
		let y = enemyRGYVerPadding + a * enemyRGYVerSpacing;
		for(let b = 0; b < numberOfEnemiesRGY_perRow; b++) {
			let x  = b * spacingForEnemyRGY + enemyRGYHorPadding;
			createEnemyShipRGY(gameContainer, x, y);
		}
	}
	
	for(let a = 0; a < 2; a++) {
		let y = enemyRBVerPadding + a * enemyRBVerSpacing;
		for(let b = 0; b < numberOfEnemiesRB_perRow; b++) {
			let x  = b * spacingForEnemyRB + enemyRBHorPadding;
			createEnemyShipRB(gameContainer, x, y);
		}
	}
	
	for(let a = 0; a < 2; a++) {
		let y = enemyRYBVerPadding + a * enemyRYBVerSpacing;
		for(let b = 0; b < numberOfEnemiesRYB_perRow; b++) {
			let x  = b * spacingForEnemyRYB + enemyRYBHorPadding;
			createEnemyShipRYB(gameContainer, x, y);
		}
	}
}

//Create Player Function

function createPlayerShip(gameContainer){
	gameDefaultState.playerPositionX = gameContainer_width / 2.025;
	
	gameDefaultState.playerPositionY = gameContainer_height - 70;
	
	playerShip.src ="images/player/player.png";
	playerShip.setAttribute("class","playerShip");
	
	gameContainer.appendChild(playerShip)
	
	setLocation(playerShip, gameDefaultState.playerPositionX, gameDefaultState.playerPositionY)
	
}

//Return a random number from min and max vaules 

function randomNumMinMax(min, max) {
	if(min === undefined) min = 0;
	if(max === undefined) max = 1;
	return min + Math.random() * (max - min);
}

//Create createEnemyShipRGY Function

function createEnemyShipRGY(gameContainer, x, y) {
	const enemyShip = document.createElement('img');
	enemyShip.src = 'images/enemy/enemyBoss.gif';
	enemyShip.setAttribute('class', 'enemyShipRGY');
	
	gameContainer.appendChild(enemyShip);
	
	let enemy = { x, y, cooldown: randomNumMinMax(.5,enemyRocketCoolDown), enemyShip };
	gameDefaultState.enemies.push(enemy);
	
	setLocation(enemyShip, x, y);

}

//Create createEnemyShipRB Function

function createEnemyShipRB(gameContainer, x, y) {
	const enemyShip = document.createElement('img');
	enemyShip.src = 'images/enemy/enemyRB.gif';
	enemyShip.setAttribute('class', 'enemyShip');
	
	gameContainer.appendChild(enemyShip);
	
	let enemy = { x, y, cooldown: randomNumMinMax(.5,enemyRocketCoolDown), enemyShip };
	gameDefaultState.enemies.push(enemy);
	
	setLocation(enemyShip, x, y);
}

//Create createEnemyShipRYB Function

function createEnemyShipRYB(gameContainer, x, y) {
	const enemyShip = document.createElement('img');
	enemyShip.src = 'images/enemy/enemyRYB.gif';
	enemyShip.setAttribute('class', 'enemyShip');
	
	gameContainer.appendChild(enemyShip);
	
	let enemy = { x, y, cooldown: randomNumMinMax(.5,enemyRocketCoolDown), enemyShip};
	gameDefaultState.enemies.push(enemy);
	
	setLocation(enemyShip, x, y);
}

//Create Rocket Function

function createRocket(gameContainer, x, y){
	const rocketNode = document.createElement('img');
	rocketNode.src = "images/player/playerRocket.png";
	rocketNode.setAttribute("class","rocket");
	
	gameContainer.appendChild(rocketNode)
	
	let playerRocketSound = new Audio('sounds/playerRocketSound.wav');
	playerRocketSound.volume = .125;
	playerRocketSound.play();
	
	let rocket = { x, y, rocketNode }
	gameDefaultState.rockets.push(rocket)
	
	setLocation(rocketNode, x, y)
}

//Create Enemy Rocket Function

function createEnemyRocket(gameContainer, x, y) {
	let enemyRocket = document.createElement('img');
	enemyRocket.src = "images/enemy/enemyRocket.png";
	enemyRocket.setAttribute("class","rocket");
	
	gameContainer.append(enemyRocket);
	
	let eRocket = { x, y, enemyRocket};
	gameDefaultState.eRockets.push(eRocket);
	
	setLocation(enemyRocket, x, y);
	
}

//Set location of absolute element

function setLocation(element, x, y){
	element.style.transform = `translate(${x}px, ${y}px)`;
}

//Prevent player from moving out of bounds

function clamp(input, min, max) {
  if (input < min) {
    return min;
  } else if (input > max) {
    return max;
  } else {
    return input;
  }
}

//Change and update playerShip loaction

function changePlayer(deltaTime, gameContainer) {
	if(gameDefaultState.leftKeyPressed) {
		gameDefaultState.playerPositionX -= deltaTime * playerShipMaxSpeed;
	}
	if(gameDefaultState.rightKeyPressed) {
		gameDefaultState.playerPositionX += deltaTime * playerShipMaxSpeed;
	}
	
	gameDefaultState.playerPositionX = clamp(
		gameDefaultState.playerPositionX,
		playerShipWidth,
		gameContainer_width - 60
	);
	
	
	if(gameDefaultState.spaceKeyPressed && gameDefaultState.playerCooldown <= 0) {
		createRocket(gameContainer, gameDefaultState.playerPositionX, gameDefaultState.playerPositionY)
		gameDefaultState.playerCooldown = rocketCoolDown;
	}
	if(gameDefaultState.playerCooldown > 0){
		gameDefaultState.playerCooldown -= deltaTime;
	}
	
	setLocation(playerShip, gameDefaultState.playerPositionX, gameDefaultState.playerPositionY)
}

//Change and update enemy loaction

function changeEnemy(deltaTime, gameContainer) {
	const deltaX = Math.sin(gameDefaultState.lastTimeRecorded / 500) * 20;
	const deltaY = Math.cos(gameDefaultState.lastTimeRecorded / 500) * 10;
	
	const enemies = gameDefaultState.enemies;
	for(let i = 0; i < enemies.length; i++) {
		const enemy = enemies[i];
		const x = enemy.x + deltaX - 20;
		const y = enemy.y + deltaY;
		setLocation(enemy.enemyShip, x, y);
		enemy.cooldown -= deltaTime;
		if(enemy.cooldown <= 0) {
		   createEnemyRocket(gameContainer, x, y);
		   enemy.cooldown = enemyRocketCoolDown;
		}
	}
	
	gameDefaultState.enemies = gameDefaultState.enemies.filter(e => !e.isRemoved);
}

//Change and update rocket loaction

function changeRocket(deltaTime, gameContainer) {
	let rockets = gameDefaultState.rockets;
	for(let i = 0; i < rockets.length; i++){
		let rocket = rockets[i];
		rocket.y -= deltaTime * rocketMaxSpeed;
		
		if(rocket.y < 0) {
		   removeRocket(gameContainer, rocket);
		}
		
		setLocation(rocket.rocketNode, rocket.x, rocket.y);
		
		//Get objects perimeter 
		const obj1 = rocket.rocketNode.getBoundingClientRect();
		const enemies = gameDefaultState.enemies;
		for(let i = 0; i < enemies.length; i++) {
			const enemy = enemies[i];
			if(enemy.isRemoved) continue;
			const obj2 = enemy.enemyShip.getBoundingClientRect();
			//Check to see if players rocket hits an enemy
			if(hitTest(obj1, obj2)) {
			    removeEnemyShip(gameContainer, enemy);
				removeRocket(gameContainer, rocket);
				//Add score
				score += 1000;
				scoreCounterNode.textContent = score;
				break;
			}
		}
	}
	
	gameDefaultState.rockets = gameDefaultState.rockets.filter(e => !e.isRemoved)
}

//Change and update enemy rocket loaction

function changeEnemyRocket(deltaTime, gameContainer) {
	let enemyRockets = gameDefaultState.eRockets;
	for(let i = 0; i < enemyRockets.length; i++) {
		let eRocket = enemyRockets[i];
		eRocket.y += deltaTime * enemyRocketMaxSpeed;
		if(eRocket.y > 800) {
		   removeEnemyRocket(gameContainer, eRocket);
		}
		setLocation(eRocket.enemyRocket, eRocket.x, eRocket.y);
	
		//Get objects perimeter 
		
		const obj1 = eRocket.enemyRocket.getBoundingClientRect();
		const player = playerShip.getBoundingClientRect();
		
		//Check to see if an enemy rocket hits the player
			if(hitTest(obj1, player)) {
			    removePlayerShip(gameContainer, player);
				removeEnemyRocket(gameContainer, eRocket);
				break;
			}
	}
	gameDefaultState.eRockets = gameDefaultState.eRockets.filter(e => !e.isRemoved);
}

//Remove rocket from DOM

function removeRocket(gameContainer, rocket) {
	gameContainer.removeChild(rocket.rocketNode);
	rocket.isRemoved = true;
}

function removeEnemyRocket(gameContainer, eRocket) {
	gameContainer.removeChild(eRocket.enemyRocket);
	eRocket.isRemoved = true;
}

//Remove enemy from DOM

function removeEnemyShip(gameContainer, enemy) {
	//add explosion gif
	enemy.enemyShip.src = 'images/enemy/collision.gif';
	let enemyShot = new Audio('sounds/enemyShot.wav');
	enemyShot.volume = .125;
	enemyShot.play();
	//Remove the enemy after .5 sec
	setTimeout(function(){
		gameContainer.removeChild(enemy.enemyShip);
	}, 500)
	
	enemy.isRemoved = true;
	//Check if game is won
	if(score >= 39000) {
		let winMessage = document.createElement('div');
		modal.appendChild(winMessage);
		//count down and display message
		let countDown = 10;
		
		let timer = setInterval(function(){
			if(countDown <= 0) {
				clearInterval(timer);
			}
			countDown -= 1;
			winMessage.innerHTML = `
				<h1>You Won</h1>
				<p>RESTARTING IN</p>
				<p>${countDown}</p>
			`;
		}, 1000)
		
		fireworkEffect();
		//reload the page
		setTimeout(function() {
			location.reload();
		},10000)
   		
	}
}

function removePlayerShip(gameContainer) {
	//disable event listeners
	window.removeEventListener('keydown', keypressDown, false);
	window.removeEventListener('keyup', keypressUp, false);
	
	playerShip.src = 'images/player/playerCollision.gif';
	let playerDied = new Audio('sounds/playerDied.wav');
	playerDied.volume = .125;
	playerDied.play();
	
	let gameOver = new Audio('sounds/gameOver.wav');
	gameOver.play();
	
	let lostMessage = document.createElement('div');
	modal.appendChild(lostMessage);
	//count down and display message	
	let countDown = 5;
		
	let timer = setInterval(function(){
		
		if(countDown <= 0) {
			clearInterval(timer);
		}
		
		countDown -= 1;
		
		lostMessage.innerHTML = `
			<h1>You Lost</h1>
			<p>RESTARTING IN</p>
			<p>${countDown}</p>
		`;
		
	}, 1000)
	//reload the page
	setTimeout(function(){
		gameContainer.removeChild(playerShip);
		location.reload();
	}, 5000)
}

//Detect if keys are pressed

function keypressDown(e) {
	if(e.keyCode === leftArrowKeycode) {
		gameDefaultState.leftKeyPressed = true;
	} else if(e.keyCode === rightArrowKeycode) {
		gameDefaultState.rightKeyPressed = true;
	} else if(e.keyCode === spacebarKeycode) {
		gameDefaultState.spaceKeyPressed = true;
	}
}

//Detect if keys are released

function keypressUp(e) {
	if(e.keyCode === leftArrowKeycode) {
		gameDefaultState.leftKeyPressed = false;
	} else if(e.keyCode === rightArrowKeycode) {
		gameDefaultState.rightKeyPressed = false;
	} else if(e.keyCode === spacebarKeycode) {
		gameDefaultState.spaceKeyPressed = false;
	}
}

//Update frames

function update() {
	let currentTimeRecorded = Date.now();
	let deltaTime = (currentTimeRecorded - gameDefaultState.lastTimeRecorded) / 1000;
	
	changePlayer(deltaTime, gameContainer);
	changeRocket(deltaTime, gameContainer);
	changeEnemy(deltaTime, gameContainer);
	changeEnemyRocket(deltaTime, gameContainer);
	
	gameDefaultState.lastTimeRecorded = currentTimeRecorded;
	window.requestAnimationFrame(update);
}

//Hit Test

function hitTest(obj1, obj2) {
	return !(
		obj2.left > obj1.left ||
		obj2.right < obj1.left ||
		obj2.top > obj1.bottom ||
		obj2.bottom < obj1.top
	);
}

//Start Game
document.querySelector('.scoreCountContainer').style.visibility = 'hidden';
start.addEventListener('click', e => {
	let startGame = new Audio('sounds/startGame.wav');
	startGame.volume = .125;
	startGame.play();
	gameMusic.pause();
	e.target.style.display = 'none';
	document.querySelector('.controls').style.display = 'none';
	document.querySelector('.scoreCountContainer').style.visibility = 'visible';
	
	setTimeout(function(){
		init();
	}, 6500);
	
	for(let i = 0; i < 6; i++) {
	setInterval(function(){
		gameDefaultState.enemies[i].enemyShip.animate([
		{ transform: `` },
		{ transform: `translateX(${Math.floor(Math.random() * gameContainer_width)}px) translateY(${Math.floor(Math.random() * 900)}px) rotate(360deg)` }
		], {
		duration: 7000,
		iterations: Infinity
		});
		},500)
	}

});


//Create explosion effect

function fireworkEffect() {
	
	let fireworkSound = new Audio('sounds/fireworkExplosion.wav');
	fireworkSound.volume = .125;
	fireworkSound.loop = true;
	fireworkSound.play();
	
	for(let i = 0; i <= 4; i++) {
		let fireworkContainer = document.createElement('div');
		fireworkContainer.setAttribute('class', `fireworkContainer${i}`)
		document.body.append(fireworkContainer);

		for(let i = 0; i < 12; i++) {			
			let fireworkExplosion = document.createElement('div');
			fireworkExplosion.setAttribute('class', 'fireworkExplosion');
			fireworkContainer.appendChild(fireworkExplosion);
		}
	}
}

//Keypress event and game frame request

window.addEventListener('keydown', keypressDown);
window.addEventListener('keyup', keypressUp);
window.requestAnimationFrame(update);














