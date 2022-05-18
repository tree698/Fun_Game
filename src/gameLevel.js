'use strict';

export const Level = Object.freeze({
  easy: 'easy',
  medium: 'medium',
  high: 'high',
});

export class GameLevel {
  constructor() {
    this.level = document.querySelector('.level');

    this.level.addEventListener('click', (event) => {
      if (event.target.className == 'button level-button level-easy') {
        this.onClick && this.onClick(Level.easy);
      } else if (event.target.className == 'button level-button level-medium') {
        this.onClick && this.onClick(Level.medium);
      } else if (event.target.className == 'button level-button level-high') {
        this.onClick && this.onClick(Level.high);
      }
    });
  }

  setLevelBtnClickListener(onClick) {
    this.onClick = onClick;
  }

  hideLevel() {
    this.level.classList.add('hide');
  }

  showLevel() {
    this.level.classList.remove('hide');
  }
}
