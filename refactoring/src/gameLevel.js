'use strict';

export default class GameLevel {
  constructor() {
    this.level = document.querySelector('.level');

    this.easyBtn = document.querySelector('.level-easy');
    this.easyBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
    });
  }

  setEasyBtnClickListener(onClick) {
    this.onClick = onClick;
  }

  hideLevel() {
    this.level.classList.add('hide');
  }

  showLevel() {
    this.level.classList.remove('hide');
  }
}
