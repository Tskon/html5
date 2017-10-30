'use strict';
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
    if (document.querySelector('.black-hover') == null) {
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