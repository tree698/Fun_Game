'use strict';

import GameBuilder from './game.js';
import GameLevel from './gameLevel.js';

const gameLevel = new GameLevel();
gameLevel.setLevelBtnClickListener((message) => {
  let carrotCount;
  let bugCount;
  let gameDuration;
  if (message == 'easy') {
    carrotCount = 6;
    bugCount = 4;
    gameDuration = 8;
  } else if (message == 'medium') {
    carrotCount = 12;
    bugCount = 12;
    gameDuration = 12;
  } else if (message == 'high') {
    carrotCount = 18;
    bugCount = 26;
    gameDuration = 16;
  }
  new GameBuilder()
    .withCarrotCount(carrotCount)
    .withBugCount(bugCount)
    .withGameDuration(gameDuration)
    .build()
    .start();

  gameLevel.hideLevel();
});
