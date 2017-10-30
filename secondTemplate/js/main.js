'use strict';
// ideas animation start
let ideaItemArr = document.querySelectorAll('.ideas__examples-item');
let div;
let timer;
for (let i = 0; i < ideaItemArr.length; i++) {
  ideaItemArr[i].addEventListener('mouseover', function () {
    for (let i = 0; i < ideaItemArr.length; i++) {
      ideaItemArr[i].style.opacity = 0.7;
    }
    this.style.opacity = 1;
    div = document.createElement('div');
    div.classList.add('transparent-hover');
    document.body.appendChild(div);
    setTimeout(function () {
      clearInterval(timer);
      div.classList.add('black-hover');
    }, 0);
  });
  ideaItemArr[i].addEventListener('mouseout', function () {
    div.classList.remove('black-hover');
    for (let i = 0; i < ideaItemArr.length; i++) {
      ideaItemArr[i].style.opacity = 1;
    }
    timer = setTimeout(function () {
      div.parentNode.removeChild(div);
    }, 200);
  });
}
// ideas animation end