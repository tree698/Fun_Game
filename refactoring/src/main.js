'use strict';

import GameBuilder from './game.js';
import GameLevel from './gameLevel.js';

const gameLevel = new GameLevel();
gameLevel.setLevelBtnClickListener((message) => {
  gameLevel.hideLevel();
  let carrotCount;
  let bugCount;
  let gameDuration;
  if (message == 'easy') {
    carrotCount = 1;
    bugCount = 1;
    gameDuration = 3;
  } else if (message == 'medium') {
    carrotCount = 5;
    bugCount = 5;
    gameDuration = 3;
  } else if (message == 'high') {
    carrotCount = 10;
    bugCount = 10;
    gameDuration = 3;
  }
  new GameBuilder()
    .withCarrotCount(carrotCount)
    .withBugCount(bugCount)
    .withGameDuration(gameDuration)
    .build()
    .start();
});
