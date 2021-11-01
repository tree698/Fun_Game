'use strict';

const ITEM_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 8;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpRefresh = document.querySelector('.pop-up__refresh');
const popUpMessage = document.querySelector('.pop-up__message');

const alertSound = new Audio('sound/alert.wav');
const bgSound = new Audio('sound/bg.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const carrotSound = new Audio('sound/carrot_pull.mp3');
const winSound = new Audio('sound/game_win.mp3');

let started = false;
let timer = undefined;
let score = 0;

field.addEventListener('click', onFieldClick);
gameBtn.addEventListener('click', () => {
	if (started) {
		stopGame();
	} else {
		startGame();
	}
});

popUpRefresh.addEventListener('click', () => {
	// started = true;
	// initGame();
	// showGameBtn();
	// startGameTimer();
	// playSound(bgSound);
	startGame();
	hidePopUp();
});

function startGame() {
	started = true;
	initGame();
	showStopBtn();
	showTimerAndScore();
	startGameTimer();
	playSound(bgSound);
}

function stopGame() {
	started = false;
	stopGameTimer();
	hideGameBtn();
	showPopUpWithText('REPLY ❓');
	stopSound(bgSound);
	playSound(alertSound);
}

function finishGame(win) {
	started = false;
	hideGameBtn();
	if (win) {
		playSound(winSound);
	} else {
		playSound(bugSound);
	}
	stopGameTimer();
	stopSound(bgSound);
	showPopUpWithText(win ? 'YOU WON 🏆' : 'YOU LOST 💩');
}

function showStopBtn() {
	const icon = gameBtn.querySelector('.fas');
	icon.classList.add('fa-stop');
	icon.classList.remove('fa-play');
	gameBtn.style.visibility = 'visible';
}

// function showGameBtn() {
// 	gameBtn.style.visibility = 'visible';
// }

function hideGameBtn() {
	gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
	gameTimer.style.visibility = 'visible';
	gameScore.style.visibility = 'visible';
}

function startGameTimer() {
	let remainingTimeSec = GAME_DURATION_SEC;
	updateTimerText(remainingTimeSec);
	timer = setInterval(() => {
		if (remainingTimeSec <= 0) {
			clearInterval(timer);
			finishGame(CARROT_COUNT === score);
			return;
		}
		updateTimerText(--remainingTimeSec);
	}, 1000);
}

function stopGameTimer() {
	clearInterval(timer);
}

function updateTimerText(time) {
	const minutes = Math.floor(time / 60);
	const second = time % 60;
	const secondWithZero = second < 10 ? `0${second}` : second;
	gameTimer.textContent = `${minutes}:${secondWithZero}`;
}

function showPopUpWithText(text) {
	popUp.classList.remove('pop-up__hide');
	popUpMessage.textContent = text;
}

function hidePopUp() {
	popUp.classList.add('pop-up__hide');
}

function onFieldClick(event) {
	if (!started) {
		return;
	}
	const target = event.target;
	if (target.matches('.carrot')) {
		target.remove();
		score++;
		updateScoreBoard();
		playSound(carrotSound);
		if (score === CARROT_COUNT) {
			finishGame(true);
		}
	} else if (target.matches('.bug')) {
		finishGame(false);
	}
}

function updateScoreBoard() {
	gameScore.textContent = CARROT_COUNT - score;
}

function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}

function stopSound(sound) {
	sound.pause();
}

function initGame() {
	score = 0;
	field.innerHTML = '';
	gameScore.textContent = CARROT_COUNT;
	addItem('carrot', CARROT_COUNT, 'img/carrot.png');
	addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
	const x1 = 0;
	const y1 = 0;
	const x2 = fieldRect.width - ITEM_SIZE;
	const y2 = fieldRect.height - ITEM_SIZE;

	for (let i = 0; i < count; i++) {
		const item = document.createElement('img');
		item.setAttribute('class', className);
		item.setAttribute('src', imgPath);
		item.style.position = 'absolute';

		const x = randomNumber(x1, x2);
		const y = randomNumber(y1, y2);
		item.style.left = `${x}px`;
		item.style.top = `${y}px`;
		field.appendChild(item);
	}
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
