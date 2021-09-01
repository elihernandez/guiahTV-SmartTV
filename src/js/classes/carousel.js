"use strict"
class Carousel {
    constructor (elementId, timeInterval) {
        this.element = document.getElementById(elementId);
        this.time = timeInterval;
        this.timer;
    }

    moveToNext() {
        var carouselItems = this.element.children[0].children;
        for (var index = 0; index < carouselItems.length; index++) {
            var element = carouselItems[index];
            if(element.classList.contains("active")){
                break;
            }
        }

        if(!element.nextElementSibling){
            var nextElement = carouselItems[0];
            element.classList.remove("active");
            nextElement.classList.add("active");
            element.classList.add("no-active");
        }else{
            var nextElement = element.nextElementSibling;
            element.classList.remove("active");
            nextElement.classList.add("active");
            element.classList.add("no-active");
        }

        var carouselIndicators = this.element.children[1].children[0].children;
        for (var index = 0; index < carouselIndicators.length; index++) {
            var element = carouselIndicators[index];
            if(element.classList.contains("active")){
                break;
            }
        }

        if(!element.nextElementSibling){
            var nextElement = carouselIndicators[0];
            element.classList.remove("active");
            nextElement.classList.add("active");
            element.classList.add("no-active");
        }else{
            var nextElement = element.nextElementSibling;
            element.classList.remove("active");
            nextElement.classList.add("active");
            element.classList.add("no-active");
        }
    }

    moveToPrevious() {
        var carouselItems = this.element.children[0].children;
        for (var index = 0; index < carouselItems.length; index++) {
            var element = carouselItems[index];
            if(element.classList.contains("active")){
                break;
            }
        }

        if(!element.previousElementSibling){
            var previousElement = carouselItems[carouselItems.length - 1];
            element.classList.remove("active");
            previousElement.classList.add("active");
        }else{
            var previousElement = element.previousElementSibling;
            element.classList.remove("active");
            previousElement.classList.add("active");
        }

        var carouselIndicators = this.element.children[1].children[0].children;
        for (var index = 0; index < carouselIndicators.length; index++) {
            var element = carouselIndicators[index];
            if(element.classList.contains("active")){
                break;
            }
        }

        if(!element.previousElementSibling){
            var previousElement = carouselIndicators[carouselIndicators.length - 1];
            element.classList.remove("active");
            previousElement.classList.add("active");
        }else{
            var previousElement = element.previousElementSibling;
            element.classList.remove("active");
            previousElement.classList.add("active");
        }
    }

    init() {
        var t = this;
        this.timer = setInterval(function(){
            t.moveToNext();
        }, this.time)
    }

    stop() {
        clearInterval(this.timer);
    }

    next() {
        this.stop();
        this.moveToNext();
        this.init(this.time);
    }

    prev() {
        this.stop();
        this.moveToPrevious();
        this.init(this.time);
    }
}
