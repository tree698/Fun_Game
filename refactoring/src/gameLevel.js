'use strict';

export default class GameLevel {
  constructor() {
    this.level = document.querySelector('.level');

    this.easyBtn = document.querySelector('.level-easy');
    this.mediumBtn = document.querySelector('.level-medium');
    this.highBtn = document.querySelector('.level-high');

    this.easyBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.easyLevel && this.easyLevel();
    });

    this.mediumBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.mediumLevel && this.mediumLevel();
    });

    this.highBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.highLevel && this.highLevel();
    });
  }

  setLevelBtnClickListener(onClick) {
    this.onClick = onClick;
  }

  setEasyLevelListener(easyLevel) {
    this.easyLevel = easyLevel('easy');
  }

  setMediumLevelListener(mediumLevel) {
    this.mediumLevel = mediumLevel('medium');
  }

  setHighLevelListener(highLevel) {
    this.highLevel = highLevel('high');
  }

  hideLevel() {
    this.level.classList.add('hide');
  }

  showLevel() {
    this.level.classList.remove('hide');
  }
}
