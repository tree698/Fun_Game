'use strict';

import GameBuilder, { Reason } from './game.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

// const game = new Game(5, 5, 6);
const game = new GameBuilder()
  .withCarrotCount(3)
  .withBugCount(3)
  .withGameDuration(5)
  .build();

game.setGameStopListener((reason) => {
  // console.log(reason);
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

// game.setGameStopListener(onGameStop);

// function onGameStop(message) {
//   switch (message) {
//     case 'cancel':
//       gameFinishBanner.showText('REPLY ❓');
//       break;
//     case 'win':
//       gameFinishBanner.showText();
//       break;
//     case 'lose':
//       gameFinishBanner.showText('YOU LOST 💩');
//       break;
//     default:
//       throw Error('Not a proper message');
//   }
// }
