'use strict';
// header slider start
let leftArrow = document.querySelector('.header-slider__left-arrow');
let rightArrow = document.querySelector('.header-slider__right-arrow');
let currentSlideNum = 2;
let totalSlidesNum = 5;  // количество слайдов
let timeOut = 0.3;        // задержка смены слайдов
let timeout;
let opacity = 100;

leftArrow.addEventListener('click', function () {
  clearTimeout(timeout);
  let newSlide = currentSlideNum - 1;
  if (newSlide < 1) {
    newSlide = 5;
  }
  fade_to_next(currentSlideNum, newSlide);
  currentSlideNum--;
  if (currentSlideNum < 1) currentSlideNum = totalSlidesNum;
});

rightArrow.addEventListener('click', function () {
  clearTimeout(timeout);
  let newSlide = currentSlideNum + 1;
  if (newSlide > totalSlidesNum) {
    newSlide = 1;
  }
  fade_to_next(currentSlideNum, newSlide);
  currentSlideNum++;
  if (currentSlideNum > totalSlidesNum) currentSlideNum = 1;
});

let radioButtonsArr = document.querySelectorAll('.header-slider__radio-switcher-item');
for(let j = 0; j < radioButtonsArr.length; j++){
  radioButtonsArr[j].onclick = function(event) {
    clearTimeout(timeout);
    fade_to_next(currentSlideNum, event.target.id.substr(-1));
    currentSlideNum = event.target.id.substr(-1);
    return false; // отменить переход по url
  };
}

function fade_to_next(currentSlideNum, nextSlideNum) {
  let currentSlide = document.getElementById('header-slider__moving-content-' + currentSlideNum);
  let nextSlide = document.getElementById('header-slider__moving-content-' + nextSlideNum);
  if (opacity < 100){
    for (let i = 1; i <= totalSlidesNum; i++){
      document.getElementById('header-slider__moving-content-' + i).classList.add('hidden');
    }
    opacity = 100;
  }
  fadeCurrent(currentSlide, nextSlide);
  function fadeCurrent(currentSlide, nextSlide){
    opacity--;
    currentSlide.style.filter = 'alpha(opacity=' + opacity + ')';
    currentSlide.style.opacity = opacity / 100;
    timeout = setTimeout(function(){
      fadeCurrent(currentSlide, nextSlide);
    }, timeOut);
    if (opacity === 1) {
      currentSlide.classList.add('hidden');
      clearTimeout(timeout);
      changeActiveSwitcher(nextSlideNum);
      fadeNext(nextSlide);
    }
  }
  function fadeNext(nextSlide){
    opacity++;
    nextSlide.classList.remove('hidden');
    nextSlide.style.filter = 'alpha(opacity=' + opacity + ')';
    nextSlide.style.opacity = opacity / 100;
    timeout = setTimeout(function(){
      fadeNext(nextSlide);
    }, timeOut);
    if (opacity === 100) {
      clearTimeout(timeout);
    }
  }
}

function changeActiveSwitcher(num){
  for (let i = 0; i < radioButtonsArr.length; i++){
    radioButtonsArr[i].classList.remove('header-slider__radio-switcher-item_active');
  }
  radioButtonsArr[num - 1].classList.add('header-slider__radio-switcher-item_active');
}
// header slider end

// ideas images animation start
let ideaItemArr = document.querySelectorAll('.ideas__examples-item');
let div;
let timer1;
let timer2;
for (let i = 0; i < ideaItemArr.length; i++) {
  ideaItemArr[i].addEventListener('mouseover', function () {
    clearInterval(timer1);
    clearInterval(timer2);
    for (let i = 0; i < ideaItemArr.length; i++) {
      ideaItemArr[i].style.opacity = 0.7;
    }
    this.style.opacity = 1;
    if (document.querySelector('.black-hover') === null) {
      div = document.createElement('div');
      div.classList.add('transparent-hover');
      document.body.appendChild(div);
      setTimeout(function () {
        div.classList.add('black-hover');
      }, 0);
    }
  });
  ideaItemArr[i].addEventListener('mouseout', function () {
    for (let i = 0; i < ideaItemArr.length; i++) {
      ideaItemArr[i].style.opacity = 1;
    }
    timer1 = setTimeout(function () {
      div.classList.remove('black-hover');
    }, 20);

    timer2 = setTimeout(function () {
      div.parentNode.removeChild(div);
      let divs = document.querySelectorAll('.transparent-hover')
      for(let i = 0; i < divs.length; i++){
        divs[i].parentNode.removeChild(divs[i]);
      }
    }, 220);
  });
}
// ideas animation end