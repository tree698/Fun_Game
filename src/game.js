'use strict';

import { Field, ItemType } from './field.js';
import { GameLevel } from './gameLevel.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  pause: 'pause',
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
    this.gameStopBtn = document.querySelector('.game__stop-button');

    // this.icon = this.gameStopBtn.querySelector('.fa-solid');

    this.popUpPauseBanner = document.querySelector('.pop-up__pause');

    // 시간/배경음악 일시 중지 & 아이템 freeze
    this.gameStopBtn.addEventListener('click', () => {
      if (this.started) {
        // this.stop(Reason.pause);
        this.pause();
      }
    });

    // 시간/배경음악 이어 진행 & 아이템 freeze 해제
    this.continueYes = document.querySelector('.continue-yes');
    this.continueYes.addEventListener('click', () => {
      if (this.started) {
      }
    });
    // this.onRefreshClick으로 연결
    this.continueNo = document.querySelector('.continue-no');
    this.continueNo.addEventListener('click', () => {
      if (this.started) {
      }
    });

    this.gameLevel = new GameLevel();

    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setItemClickListener(this.onItemClick);

    this.gameFinishBanner = new PopUp();
    this.gameFinishBanner.setClickListener(this.onRefreshClick);

    this.started = false;
    this.timer = undefined;
    this.score = 0;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    sound.stopBackground();
    this.onGameStop(reason);
    this.hideStopBtn();
  }

  pause() {
    this.stopGameTimer();
    sound.stopBackground();
    this.showPauseBanner();
    this.hideStopBtn();
  }

  showPauseBanner() {
    this.popUpPauseBanner.classList.remove('hide');
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
      case Reason.pause:
        sound.playAlert();
        message = 'REPLAY ❓';
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
    this.gameStopBtn.style.visibility = 'visible';
  }

  hideStopBtn() {
    this.gameStopBtn.style.visibility = 'hidden';
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  hideTimerAndScore() {
    this.gameTimer.style.visibility = 'hidden';
    this.gameScore.style.visibility = 'hidden';
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDurationSec;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
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
