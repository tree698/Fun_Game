'use strict';

import { Field, ItemType } from './field.js';
import { GameLevel } from './gameLevel.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
});

export default class GameBuilder {
  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  build() {
    return new Game(
      this.carrotCount, //
      this.bugCount,
      this.gameDuration
    );
  }
}

class Game {
  constructor(carrotCount, bugCount, gameDuration) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameDurationSec = gameDuration;

    this.game = document.querySelector('.game');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gamePauseBtn = document.querySelector('.game__pause-button');
    this.popUpPauseBanner = document.querySelector('.pop-up__pause');
    this.continueYes = document.querySelector('.continue-button__yes');
    this.continueNo = document.querySelector('.continue-button__no');

    this.gameLevel = new GameLevel();
    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setItemClickListener(this.onItemClick);
    this.gameFinishBanner = new PopUp();
    this.gameFinishBanner.setClickListener(this.onRefreshClick);

    this.started = false;
    this.timer = undefined;
    this.score = 0;
    this.currentRemainSec = 0;

    this.gamePauseBtn.addEventListener('click', () => {
      if (this.started) {
        this.pause();
      }
    });

    this.continueYes.addEventListener('click', () => {
      this.started = true;
      this.showStopBtn();
      this.hidePauseBanner();
      this.startGameTimer(this.currentRemainSec);
      sound.resumeBackground();
    });

    this.continueNo.addEventListener('click', () => {
      this.onRefreshClick();
      this.hidePauseBanner();
    });
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer(this.gameDurationSec);
    sound.playBackground();
  }

  stop(reason) {
    this.commonOnStopPause();
    this.onGameStop(reason);
  }

  pause() {
    this.commonOnStopPause();
    this.showPauseBanner();
    sound.playAlert();
  }

  commonOnStopPause() {
    this.started = false;
    this.stopGameTimer();
    this.hideStopBtn();
    sound.stopBackground();
  }

  // overlaped time
  startGameTimer(timeSec) {
    this.currentRemainSec = timeSec;
    this.updateTimerText(timeSec);

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
    // console.log(this.timer);

    this.timer = setInterval(() => {
      if (timeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
        return;
      }
      --this.currentRemainSec;
      this.updateTimerText(--timeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
    this.timer = undefined;
    // console.log(this.timer);
  }

  showPauseBanner() {
    this.popUpPauseBanner.classList.remove('hide');
  }

  hidePauseBanner() {
    this.popUpPauseBanner.classList.add('hide');
  }

  onGameStop(reason) {
    let message;
    switch (reason) {
      case Reason.win:
        sound.playWin();
        message = 'YOU WON 🎉';
        break;
      case Reason.lose:
        sound.playBug();
        message = 'YOU LOST 💩';
        break;
      default:
        throw new Error('not valid reason');
    }
    this.gameFinishBanner.showText(message);
  }

  onRefreshClick = () => {
    this.gameField.field.innerHTML = '';
    this.hideTimerAndScore();
    this.gameLevel.showLevel();
  };

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  };

  updateScoreBoard() {
    this.gameScore.textContent = this.carrotCount - this.score;
  }

  showStopBtn() {
    this.gamePauseBtn.style.visibility = 'visible';
  }

  hideStopBtn() {
    this.gamePauseBtn.style.visibility = 'hidden';
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  hideTimerAndScore() {
    this.gameTimer.style.visibility = 'hidden';
    this.gameScore.style.visibility = 'hidden';
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const second = time % 60;
    const secondWithZero = second < 10 ? `0${second}` : second;
    this.gameTimer.textContent = `${minutes}:${secondWithZero}`;
  }

  initGame() {
    this.score = 0;
    this.gameField.init();
    this.gameScore.textContent = this.carrotCount;
  }
}
