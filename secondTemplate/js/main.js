'use strict';

// header slider start
function Slider() {
  let leftArrow = document.querySelector('.header-slider__left-arrow');
  let rightArrow = document.querySelector('.header-slider__right-arrow');
  let currentSlideNum = 2;
  let totalSlidesNum = 5;  // количество слайдов
  let timeout;

  document.getElementById('header-slider__moving-content-' + currentSlideNum).style.zIndex = 2;

  leftArrow.addEventListener('click', function () {
    clearTimeout(timeout);
    let newSlide = currentSlideNum - 1;
    if (newSlide < 1) {
      newSlide = 5;
    }
    fade_to_next(newSlide);
    currentSlideNum--;
    if (currentSlideNum < 1) currentSlideNum = totalSlidesNum;
  });

  rightArrow.addEventListener('click', function () {
    clearTimeout(timeout);
    let newSlide = currentSlideNum + 1;
    if (newSlide > totalSlidesNum) {
      newSlide = 1;
    }
    fade_to_next(newSlide);
    currentSlideNum++;
    if (currentSlideNum > totalSlidesNum) currentSlideNum = 1;
  });

  let radioButtonsArr = document.querySelectorAll('.header-slider__radio-switcher-item');
  for (let j = 0; j < radioButtonsArr.length; j++) {
    radioButtonsArr[j].onclick = function (event) {
      let targetId = event.target.id.substr(-1);
      clearTimeout(timeout);
      fade_to_next(targetId);
      currentSlideNum = +targetId;
      return false; // отменить переход по url
    };
  }

  function fade_to_next(nextSlideNum) {
    let nextSlide = document.getElementById('header-slider__moving-content-' + nextSlideNum);
    for (let i = 1; i <= totalSlidesNum; i++) {
      document.getElementById('header-slider__moving-content-' + i).classList.add('hidden');
      document.getElementById('header-slider__moving-content-' + i).style.zIndex = 1;
      radioButtonsArr[i-1].classList.remove('header-slider__radio-switcher-item_active');
    }
    radioButtonsArr[nextSlideNum - 1].classList.add('header-slider__radio-switcher-item_active');
    timeout = setTimeout(function () {
      nextSlide.classList.remove('hidden');
      nextSlide.style.zIndex = 2;
    }, 500);
  }
}

new Slider();
// header slider end

// ideas images animation start
function ExaplesGalery() {
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
        let divs = document.querySelectorAll('.transparent-hover');
        for (let i = 0; i < divs.length; i++) {
          divs[i].parentNode.removeChild(divs[i]);
        }
      }, 220);
    });
  }
}

new ExaplesGalery();
// ideas animation end

// video-player start
function VideoPlayer() {
  let videoPlayerWrapper = document.querySelector('.video-player');
  let videoPlayerHover = document.querySelector('.video-player__hover');
  let videoPlayerButton = document.querySelector('.video-player__play-button-wrapper');
  let videoPlayerVideo = document.querySelector('.video-player__video');

  videoPlayerButton.addEventListener('click', function () {
    videoPlayerHover.classList.toggle('hidden');
    videoPlayerButton.classList.add('hidden');
    if (videoPlayerHover.classList.contains('hidden')) {
      videoPlayerVideo.play();
    } else {
      videoPlayerVideo.pause();
    }
  });
  videoPlayerWrapper.addEventListener('mouseover', function () {
    videoPlayerButton.classList.remove('hidden');
  });
  videoPlayerWrapper.addEventListener('mouseout', function () {
    if (videoPlayerHover.classList.contains('hidden')) {
      videoPlayerButton.classList.add('hidden');
    }
  });
}

new VideoPlayer();

// video-player end