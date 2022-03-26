'use strict';

import GameBuilder, { Reason } from './game.js';
import PopUp from './popup.js';
import GameLevel from './gameLevel.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();

const gameLevel = new GameLevel();
gameLevel.setLevelBtnClickListener((message) => {
  // if (message === 'easy') {
  //   return new GameBuilder()
  //     .withCarrotCount(5)
  //     .withBugCount(5)
  //     .withGameDuration(5)
  //     .build();
  // } else if (message === 'medium') {
  //   return new GameBuilder()
  //     .withCarrotCount(10)
  //     .withBugCount(10)
  //     .withGameDuration(10)
  //     .build();
  // } else if (message === 'high') {
  //   return new GameBuilder()
  //     .withCarrotCount(50)
  //     .withBugCount(50)
  //     .withGameDuration(50)
  //     .build();
  // }
});

const game = new GameBuilder()
  .withCarrotCount(1)
  .withBugCount(1)
  .withGameDuration(3)
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
