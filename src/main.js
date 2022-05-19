'use strict';

import GameBuilder from './game.js';
import { GameLevel, Level } from './gameLevel.js';

const section = document.querySelector('section');
const gameName = document.querySelector('.game__name');

showInitialPage();

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

function showInitialPage() {
  hideGameSection();
  setTimeout(() => {
    showGameSection();
    hideGameName();
  }, 2000);
}

function hideGameSection() {
  section.classList.add('hide');
}

function showGameSection() {
  section.classList.remove('hide');
}

function hideGameName() {
  gameName.classList.add('hide');
}
