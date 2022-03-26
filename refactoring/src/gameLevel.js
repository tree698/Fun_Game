'use strict';

export default class GameLevel {
  constructor() {
    this.level = document.querySelector('.level');

    // event delegation!!
    this.level.addEventListener('click', (event) => {
      if (event.target.className == 'button level-button level-easy') {
        this.onClick && this.onClick('easy');
      } else if (event.target.className == 'button level-button level-medium') {
        this.onClick && this.onClick('medium');
      } else if (event.target.className == 'button level-button level-high') {
        this.onClick && this.onClick('heigh');
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
