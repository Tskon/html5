'use strict';
// ideas animation start
let ideaItemArr = document.querySelectorAll('.ideas__examples-item');
let width = 0;
let height = 0;
for (let i = 0; i < ideaItemArr.length; i++){
    ideaItemArr[i].addEventListener('mouseover', function(){
        width = this.width;
        height = this.height;
        this.style.zIndex = 15;
        if (this.classList.contains('ideas__example2')){
            this.style.position = 'relative';
            // this.style.top = -(height * 0.05) + 'px';
            this.style.width = (width * 1.1) + 'px';
            this.style.height = (height * 1.1) + 'px';
        }else{
            this.style.top = -(height * 0.10) + 'px';
            this.style.width = (width * 1.3) + 'px';
            this.style.height = (height * 1.3) + 'px';
        }
        if (this.classList.contains('ideas__example1')){
            this.style.left = (height * 0.3) + 'px';
        }
    });
    ideaItemArr[i].addEventListener('mouseout', function(){
        this.style.zIndex = '';
        this.style.width = '';
        this.style.height = '';
        this.style.top = '';
        this.style.left = '';
    });
}
// ideas animation end