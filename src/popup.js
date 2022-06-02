'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up__result');
    this.popUpRefresh = document.querySelector('.restart');
    this.popUpMessage = document.querySelector('.message');

    this.popUpRefresh.addEventListener('click', () => {
      this.onRefreshClick && this.onRefreshClick();
      this.hide();
    });
  }

  setClickListener(onRefreshClick) {
    this.onRefreshClick = onRefreshClick;
  }

  hide() {
    this.popUp.classList.add('hide');
  }

  showText(text) {
    this.popUp.classList.remove('hide');
    this.popUpMessage.textContent = text;
  }
}
