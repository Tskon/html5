document.body.onload = function () {
  let audio = document.querySelector("audio");
  audio.volume = 0.1;
  let i = 0;
  let strArr = document.querySelectorAll('.string');

  let content = document.querySelector('.content');
  setTimeout(function () {
    content.classList.add('perspective');
    setTimeout(function () {
      fadeOut();
      content.classList.add('in-space');
    }, 1000);
  }, 1500);
  function fadeOut(){
    strArr[i].classList.remove('hidden');
    setTimeout(function () {
      fadeOut(i++);
    }, 400);
  }
};

