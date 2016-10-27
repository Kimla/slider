"use strict";

var Slider = (function () {
    var s;

    return {
        settings: {
            sliderElement: "",
            sliderContainer: false,
            animation: 'fade',
            slides: false,
            currentSlide: 0,
            delay: 3000,
            speed: 750,
            buttons: false,
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
            window.onresize = function(event) {
                Slider.setWidths();
                Slider.setTranslate3dValue();
            };
        },

        startSlider: function() {
            s.sliderElement.classList.add("slider__is-active");
            s.sliderElement.classList.add("slider_animation-" + s.animation);
            s.slides[0].classList.add("slide__is-active");
            this.startTimer();
        },

        nextSlide: function() {
            if ( s.animation === "fade" ) {
                this.doFadeAnimation();
            }
            else if ( s.animation === "slide" ) {
                this.doSlideAnimation();
            }
        },

        doSlideAnimation: function() {
            s.slides[s.currentSlide].classList.remove("slide__is-active");
            s.currentSlide++;
            if ( s.currentSlide >= s.slides.length ) {
                s.currentSlide = 0;
            }

            this.setTranslate3dValue();

            s.slides[s.currentSlide].classList.add("slide__is-active");
        },

        setTranslate3dValue: function(translateX) {
            var translateX = s.slides[s.currentSlide].offsetWidth * s.currentSlide;
            s.sliderContainer.style.transform = "translate3d(-"+translateX+"px, 0, 0)";
        },

        doFadeAnimation: function() {
            s.slides[s.currentSlide].classList.remove("slide__is-active");
            s.slides[s.currentSlide].style.transform = "";
            s.currentSlide++;

            if ( s.currentSlide >= s.slides.length ) {
                s.currentSlide = 0;
            }

            var translateX = s.currentSlide * 100;

            s.slides[s.currentSlide].style.transform = "translateX(-"+translateX+"%)";
            s.slides[s.currentSlide].classList.add("slide__is-active");
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

            if ( s.delay < s.speed ) {
                s.delay = s.speed;
            }

        },

        setupSlider: function() {
            if ( this.setTargetElement() ) {
                this.createContainer();
                if ( s.buttons === true ) {
                    this.createButtons();
                }
                this.setSlides();
                this.setWidths();
                return true;
            }
            return false;
        },

        setWidths: function() {
            var slideWidth = s.sliderElement.offsetWidth;
            var containerWidth = s.slides.length * slideWidth;
            s.sliderContainer.style.width = containerWidth + "px";
            for (var i = 0; i < s.slides.length; i++) {
                s.slides[i].style.width = slideWidth + "px";
            }
        },

        createButtons: function() {
            var btn = document.createElement("button");
            //btn.add("slider_btn-next");
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
