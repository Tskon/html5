'use strict';

// header burger-menu start
function BurgerMenu(menuNode, menuSelector, wrapperClass){
  let btn = document.querySelector(menuSelector);
  let menuWrapper = document.createElement('div');

  btn.parentNode.appendChild(menuWrapper);

  btn.addEventListener('click', function () {
    menuWrapper.classList.toggle(wrapperClass);
    if (menuWrapper.classList.contains(wrapperClass)){
      menuWrapper.innerHTML = menuNode.innerHTML;
    }else {
      menuWrapper.innerHTML = '';
    }
  });
}

new BurgerMenu(document.querySelector('.main-menu'),'.main-header__burger-menu-button', 'main-header__burger-menu-wrapper');
// header burger-menu end


// header search start
function Search(wrapSelector, formSelector, inputSelector, btnSelector){
  let wrapper = document.querySelector(wrapSelector);
  let form = document.querySelector(formSelector);
  let input = document.querySelector(inputSelector);
  let btn = document.querySelector(btnSelector);
  wrapper.addEventListener('click', function () {
    form.classList.remove('hidden');
    input.style.width = '130px';
    btn.style.display = 'inline-block';
  });
}

new Search('.main-header__search', '.main-header__search-form', '.main-header__search-input',
  '.main-header__search-btn');
// header search end


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
      radioButtonsArr[i - 1].classList.remove('header-slider__radio-switcher-item_active');
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
  let videoPlayerDuration = document.querySelector('.video-player__video-duration');

  videoPlayerVideo.addEventListener('loadedmetadata', function() {
    videoPlayerDuration.innerHTML = formatTime(videoPlayerVideo.duration);
  });


  videoPlayerButton.addEventListener('click', function () {
    videoPlayerHover.classList.toggle('hidden');
    videoPlayerButton.classList.add('hidden');
    if (videoPlayerHover.classList.contains('hidden')) {
      videoPlayerVideo.play();
    } else {
      videoPlayerVideo.pause();
      videoPlayerDuration.innerHTML = formatTime(videoPlayerVideo.currentTime);
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
  function formatTime(secNum){
    let num = Math.round(secNum);
    let min = 0;
    if ((num/60) >= 1){
      min = Math.floor(num/60);
      num = num % 60;
      if (min < 10) min = "0" + min;
    }else{
      min = '00';
    }
    if (num < 10) num = "0" + num;
    return min + ':' + num;
  }
}

new VideoPlayer();
// video-player end


// statistic-grow start
function StatisticGrow(wrapperSelector, numSelector) {
  let itemsArr = document.querySelectorAll(numSelector);
  let section = document.querySelector(wrapperSelector);
  let elemPosition = getYCoord(document.querySelector('.statistic')) - window.innerHeight - 50;
  let totalArr = [];
  let isAlreadyStart = false;
  for (let i = 0; i < itemsArr.length; i++) {
    totalArr.push(itemsArr[i].innerHTML);
    itemsArr[i].innerHTML = 0;
  }
  window.onscroll = function () {
    if (!isAlreadyStart) {
      setTimeout(function () {
        let mainScroll = window.pageYOffset - section.offsetHeight;
        if (elemPosition < mainScroll && elemPosition + window.innerHeight - 50 > mainScroll) {
          startGrow(itemsArr);
          isAlreadyStart = true;
        }
      },1000);
    }
  };

  function startGrow(nodesArr) {
    for (let i = 0; i < itemsArr.length; i++) {
      grow(nodesArr[i], totalArr[i]);
    }

    function grow(node, total) {
      let start = 0;
      let interval = 20;
      let timer;
      timer = setInterval(function () {
        start += (total / 100) + 10;
        if (start >= total) {
          node.innerHTML = Math.round(total);
          clearInterval(timer);
        } else {
          node.innerHTML = Math.round(start);
        }
      }, interval);
    }
  }

  function getYCoord(elem) {
    let box = elem.getBoundingClientRect();
    return box.top + pageYOffset
  }
}

new StatisticGrow('.statistic', '.statistic__item-num');
// statistic-grow end