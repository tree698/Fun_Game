'use strict';

import GameBuilder from './game.js';
import { GameLevel, Level } from './gameLevel.js';

const game = document.querySelector('.game');
const level = document.querySelector('.pop-up__level');
const gameName = document.querySelector('.loading__container');

showFunGameForTwoSecond();

const gameLevel = new GameLevel();
gameLevel.setLevelBtnClickListener((level) => {
  let carrotCount;
  let bugCount;
  let gameDuration;
  if (level == Level.easy) {
    carrotCount = 10;
    bugCount = 7;
    gameDuration = 10;
  } else if (level == Level.medium) {
    carrotCount = 15;
    bugCount = 20;
    gameDuration = 15;
  } else if (level == Level.high) {
    carrotCount = 20;
    bugCount = 30;
    gameDuration = 20;
  }
  new GameBuilder()
    .withCarrotCount(carrotCount)
    .withBugCount(bugCount)
    .withGameDuration(gameDuration)
    .build()
    .start();

  gameLevel.hideLevel();
});

function showFunGameForTwoSecond() {
  hideGameAndLevel();
  setTimeout(() => {
    showGameAndLevel();
    hideGameName();
  }, 5800);
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
