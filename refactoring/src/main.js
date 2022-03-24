'use strict';

import GameBuilder, { Reason } from './game.js';
import PopUp from './popup.js';
import GameLevel from './gameLevel.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();

const gameLevel = new GameLevel();
gameLevel.setEasyLevelListener((message) => {
  console.log(message);
});
gameLevel.setMediumLevelListener((message) => {
  console.log(message);
});
gameLevel.setHighLevelListener((message) => {
  console.log(message);
});

const game = new GameBuilder()
  .withCarrotCount(3)
  .withBugCount(3)
  .withGameDuration(5)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      sound.playAlert();
      message = 'REPLY ❓';
      break;
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
  gameFinishBanner.showText(message);
});
