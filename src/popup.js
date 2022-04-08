'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpRefresh = document.querySelector('.pop-up__refresh');
    this.popUpMessage = document.querySelector('.pop-up__message');

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

  hideRefresh() {
    this.popUpRefresh.classList.add('hide');
    this.popUpMessage.style.lineHeight = '170px';
  }

  showRefresh() {
    this.popUpRefresh.classList.remove('hide');
    this.popUpMessage.style.removeProperty('line-height');
  }
}
