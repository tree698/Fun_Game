'use strict';

import GameBuilder from './game.js';
import { GameLevel, Level } from './gameLevel.js';

const game = document.querySelector('.game');
const level = document.querySelector('.level');
const gameName = document.querySelector('.game__name');

showFunGameForTwoSecond();

const gameLevel = new GameLevel();
gameLevel.setLevelBtnClickListener((level) => {
  let carrotCount;
  let bugCount;
  let gameDuration;
  if (level == Level.easy) {
    carrotCount = 6;
    bugCount = 4;
    gameDuration = 8;
  } else if (level == Level.medium) {
    carrotCount = 12;
    bugCount = 12;
    gameDuration = 12;
  } else if (level == Level.high) {
    carrotCount = 18;
    bugCount = 26;
    gameDuration = 16;
  }
  new GameBuilder()
    .withCarrotCount(carrotCount)
    .withBugCount(bugCount)
    .withGameDuration(gameDuration)
    .build()
    .start(level);

  gameLevel.hideLevel();
});

function showFunGameForTwoSecond() {
  hideGameAndLevel();
  setTimeout(() => {
    showGameAndLevel();
    hideGameName();
  }, 2000);
}

function hideGameAndLevel() {
  game.classList.add('hide');
  level.classList.add('hide');
}

function showGameAndLevel() {
  game.classList.remove('hide');
  level.classList.remove('hide');
}

function hideGameName() {
  gameName.classList.add('hide');
}
