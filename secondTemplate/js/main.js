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
  let newSlide = currentSlideNum - 1;
  if (newSlide < 1) {
    newSlide = 5;
  }
  fade_to_next(currentSlideNum, newSlide);
  currentSlideNum--;
  if (currentSlideNum < 1) currentSlideNum = totalSlidesNum;
});

rightArrow.addEventListener('click', function () {
  let newSlide = currentSlideNum + 1;
  if (newSlide > totalSlidesNum) {
    newSlide = 1;
  }
  fade_to_next(currentSlideNum, newSlide);
  currentSlideNum++;
  if (currentSlideNum > totalSlidesNum) currentSlideNum = 1;
});

function fade_to_next(currentSlide, nextSlide) {
  opacity--;
  let slideNow = document.getElementById('header-slider__moving-content-' + currentSlide);
  let slideNext = document.getElementById('header-slider__moving-content-' + nextSlide);
// console.log(slideNow);
  slideNow.style.filter = 'alpha(opacity=' + opacity + ')';
  slideNext.style.filter = 'alpha(opacity=' + (100 - opacity) + ')';
  slideNow.style.opacity = opacity / 100;
  slideNext.style.opacity = (100 - opacity) / 100;

  timeout = setTimeout(function(){
    fade_to_next(currentSlide, nextSlide);
    }, timeOut);

  if (opacity === 1) {
    opacity = 100
    slideNext.classList.toggle('hidden');
    slideNow.classList.toggle('hidden');
    clearTimeout(timeout);
  }
}

// header slider end

// ideas animation start
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
    }, 220);
  });
}
// ideas animation end