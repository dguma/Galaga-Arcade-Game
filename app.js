// JavaScript Document

//Key Codes for Keyboard Controls

const leftArrowKeycode = 37;
const rightArrowKeycode = 39;
const spacebarKeycode = 32;

//Get gameContainer Node

const gameContainer = document.querySelector('.gameContainer');

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
	enemies: [] /*Created enemies pushed into empty array*/
};

//Initialize Game Function

function init(){
	createPlayerShip(gameContainer)
	
	const spacingForEnemyRGY = (gameContainer_width - enemyRGYHorPadding * 2) / (numberOfEnemiesRGY_perRow - 1);
	
	const spacingForEnemyRB = (gameContainer_width - enemyRBHorPadding * 2) / (numberOfEnemiesRB_perRow - 1);
	
	const spacingForEnemyRYB = (gameContainer_width - enemyRYBHorPadding * 2) / (numberOfEnemiesRYB_perRow - 1);
	
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
	gameDefaultState.playerPositionX = gameContainer_width / 2.18;
	
	gameDefaultState.playerPositionY = gameContainer_height - 70;
	
	playerShip.src ="images/player/player.png";
	playerShip.setAttribute("class","playerShip");
	
	gameContainer.appendChild(playerShip)
	
	setLocation(playerShip, gameDefaultState.playerPositionX, gameDefaultState.playerPositionY)
	
}

//Create Rocket Function

function createEnemyShipRGY(gameContainer, x, y) {
	const enemyShip = document.createElement('img');
	enemyShip.src = 'images/enemy/enemyBoss.gif';
	enemyShip.setAttribute('class', 'enemyShipRGY');
//	enemyShip.style.animation = "rotate 3s ease infinite";
	
	gameContainer.appendChild(enemyShip);
	
	let enemy = { x, y, enemyShip };
	gameDefaultState.enemies.push(enemy);
	
	setLocation(enemyShip, x, y);
	
	
//	console.log(document.querySelectorAll('img.enemyShipRGY'));
	
	let arrayOfRGY = new Array(document.querySelectorAll('img.enemyShipRGY'));
//	
	let sum = arrayOfRGY[0][1];
//	for(let i = 0; i < 3; i++) {
//		let rgy = arrayOfRGY[0][i];
//		if(rgy[0][i] === 0) {
//			setInterval(() => {
//				enemyShip.style.animation = "rotate 3s ease infinite";
//			}, 1000);   
//		} else if (rgy[i] === 1) {
//			setInterval(() => {
//				enemyShip.style.animation = "rotate 3s ease infinite";
//			}, 2000) 
//		}
//		
//	}
	console.log(sum);
}

function createEnemyShipRB(gameContainer, x, y) {
	const enemyShip = document.createElement('img');
	enemyShip.src = 'images/enemy/enemyRB.gif';
	enemyShip.setAttribute('class', 'enemyShip');
	
	gameContainer.appendChild(enemyShip);
	
	let enemy = { x, y, enemyShip };
	gameDefaultState.enemies.push(enemy);
	
	setLocation(enemyShip, x, y);
}

function createEnemyShipRYB(gameContainer, x, y) {
	const enemyShip = document.createElement('img');
	enemyShip.src = 'images/enemy/enemyRYB.gif';
	enemyShip.setAttribute('class', 'enemyShip');
	
	gameContainer.appendChild(enemyShip);
	
	let enemy = { x, y, enemyShip };
	gameDefaultState.enemies.push(enemy);
	
	setLocation(enemyShip, x, y);
}

//Create Rocket Function

function createRocket(gameContainer, x, y){
	const rocketNode = document.createElement('img');
	rocketNode.src = "images/player/playerRocket.png";
	rocketNode.setAttribute("class","rocket");
	
	gameContainer.appendChild(rocketNode)
	
	let rocket = { x, y, rocketNode }
	gameDefaultState.rockets.push(rocket)
	
	setLocation(rocketNode, x, y)
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

//Change and update playerShip loaction

function changeEnemy(deltaTime, gameContainer) {
	const deltaX = Math.sin(gameDefaultState.lastTimeRecorded / 500) * 20;
	const deltaY = Math.cos(gameDefaultState.lastTimeRecorded / 500) * 10;
	
	const enemies = gameDefaultState.enemies;
	for(let i = 0; i < enemies.length; i++) {
		const enemy = enemies[i];
		const x = enemy.x + deltaX - 20;
		const y = enemy.y + deltaY;
		setLocation(enemy.enemyShip, x, y);
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
		
		const obj1 = rocket.rocketNode.getBoundingClientRect();
		const enemies = gameDefaultState.enemies;
		for(let i = 0; i < enemies.length; i++) {
			const enemy = enemies[i];
			if(enemy.isRemoved) continue;
			const obj2 = enemy.enemyShip.getBoundingClientRect();
			if(hitTest(obj1, obj2)) {
			    removeEnemyShip(gameContainer, enemy);
				removeRocket(gameContainer, rocket);
				break;
			}
		}
	}
	
	gameDefaultState.rockets = gameDefaultState.rockets.filter(e => !e.isRemoved)
}

//Remove rocket from DOM

function removeRocket(gameContainer, rocket) {
	gameContainer.removeChild(rocket.rocketNode);
	rocket.isRemoved = true;
}

//Remove enemy from DOM

function removeEnemyShip(gameContainer, enemy) {
	gameContainer.removeChild(enemy.enemyShip);
	enemy.isRemoved = true;
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

init();
window.addEventListener('keydown', keypressDown);
window.addEventListener('keyup', keypressUp);
window.requestAnimationFrame(update);




console.log(gameDefaultState.playerPositionX)


setInterval(function(){
//	for(let i = 0; i < gameDefaultState.enemies.length; i++) {
		gameDefaultState.enemies[0].enemyShip.animate([
		{ transform: `translateY(${gameDefaultState.enemies[0].y}) rotate(0deg)` },
		{ transform: `translateY(${gameDefaultState.playerPositionY * 2.16}px) rotate(360deg)` }
		], {
		duration: 6000,
		iterations: Infinity
		});
	
		
		
},500)


setInterval(function(){removeEnemyShip(gameContainer, gameDefaultState.enemies[0])},2150)











