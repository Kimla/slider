"use strict";

var Slider = (function () {
    var s;

    return {
        settings: {
            sliderElement: "",
            sliderContainer: false,
            slides: false,
            currentSlide: 0,
            delay: 5000,
        },

        init: function(args) {
            s = this.settings;
            this.setupProperties(args);

            if ( this.setupSlider() ) {
                this.startSlider();
                this.bindUIActions();
            }
        },

        bindUIActions: function() {
            this.setButtons();
        },

        startSlider: function() {
            s.sliderElement.classList.add("slider__is-active");
            s.slides[0].classList.add("slide__is-active");
            this.startTimer();
        },

        changeSlide: function(direction) {
            Slider.stopTimer();
            Slider.startTimer();
            s.slides[s.currentSlide].classList.remove("slide__is-active");
            s.slides[s.currentSlide].classList.add("animate-out");

            if ( direction === "next" ) {
                Slider.nextSlide();
            }
            else if ( direction === "prev" ) {
                Slider.prevSlide();
            }

            s.slides[s.currentSlide].classList.add("slide__is-active");
            var currentSlide = s.currentSlide;

            setTimeout(function () {
                s.slides[currentSlide].classList.remove("animate-out");
            }, 350);
        },

        nextSlide: function() {
            s.currentSlide++;
            if ( s.currentSlide >= s.slides.length ) {
                s.currentSlide = 0;
            }
        },

        prevSlide: function() {
            s.currentSlide--;
            if ( s.currentSlide < 0 ) {
                s.currentSlide = s.slides.length - 1;
            }
        },

        startTimer: function() {
            s.timer = setInterval(function() {
                Slider.nextSlide();
            }, s.delay);
        },

        stopTimer: function() {
            clearInterval(s.timer);
        },

        setupProperties: function(args) {
            for (var key in args){
                if (args.hasOwnProperty(key)) {
                    s[key] = args[key];
                }
            }
        },

        setupSlider: function() {
            if ( this.setTargetElement() ) {
                this.createContainer();
                this.setSlides();
                this.setWidths();
                return true;
            }
            return false;
        },

        setButtons: function() {
            var prevButtons = s.sliderElement.querySelectorAll(".prev-slide");
            var nextButtons = s.sliderElement.querySelectorAll(".next-slide");

            for (var i = 0; i < prevButtons.length; i++) {
                prevButtons[i].addEventListener("click", function(){
                    Slider.changeSlide("prev");
                }, false);
                nextButtons[i].addEventListener("click", function(){
                    Slider.changeSlide("next");
                }, false);
            }
        },

        createContainer: function() {
            var container = document.createElement("div");
            container.classList.add("slider_container");
            container.innerHTML = s.sliderElement.innerHTML;

            s.sliderElement.innerHTML = "";
            s.sliderElement.appendChild(container);
            s.sliderContainer = container;
        },

        setSlides: function() {
            var slides = s.sliderContainer.children;
            if ( slides.length > 0 ) {
                s.slides = slides;
                return true;
            }
            return false;
        },

        setTargetElement: function() {
            if ( s.targetId ) {
                s.sliderElement = document.getElementById(s.targetId);
                return s.sliderElement != null;
            }
            return false;
        },

    };
})();

Slider.init({
    'targetId': "slider",
});
