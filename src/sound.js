'use strict';

const alertSound = new Audio('sound/alert.wav');
const bgSound = new Audio('sound/bg.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const carrotSound = new Audio('sound/carrot_pull.mp3');
const winSound = new Audio('sound/game_win.mp3');

const playOrResume = Object.freeze({
  play: 'play',
  resume: 'resume',
});

export function playAlert() {
  playSound(alertSound);
}

export function playBackground() {
  playSound(bgSound, playOrResume.play);
}

export function resumeBackground() {
  playSound(bgSound, playOrResume.resume);
}

export function stopBackground() {
  stopSound(bgSound);
}

export function playBug() {
  playSound(bugSound);
}

export function playCarrot() {
  playSound(carrotSound);
}

export function playWin() {
  playSound(winSound);
}

async function playSound(sound, state) {
  try {
    if (state === playOrResume.play) {
      sound.currentTime = 0;
    }
    await sound.play();
  } catch (err) {
    console.log('DOMException');
  }
}

function stopSound(sound) {
  sound.pause();
}
