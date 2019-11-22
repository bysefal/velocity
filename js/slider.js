class Slideshow {
    constructor(container, time) {
        this.container = container;
        this.timelaunch = time;
        this.slider = document.querySelector(this.container);

        this.wrapper = this.slider.querySelector("#slider");
        this.slides = this.slider.querySelectorAll(".slide");
        this.previous = this.slider.querySelector("#prev");
        this.next = this.slider.querySelector("#next");
        this.index = 0;
        this.time = null;

        this.timer();

        this.next.addEventListener("click", this.nextSlide.bind(this));
        this.previous.addEventListener("click", this.prevSlide.bind(this));
        document.addEventListener("keydown", this.keyboard.bind(this));
        this.slider.addEventListener("mouseover", this.stop.bind(this), false);
        this.slider.addEventListener("mouseout", this.start.bind(this), false);
    }

    slideTo(slide) {
        const currentSlide = this.slides[slide];
        currentSlide.style.opacity = 1;

        for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides[i];
            if (slide !== currentSlide) {
                slide.style.opacity = 0;
            }
        }
    }

    timer() {
        this.time = setInterval(this.nextSlide.bind(this), this.timelaunch);
    }

    stop() {
        clearInterval(this.time);
        this.time = null;
    }


    start() {
        this.timer();
    }

    keyboard(e) {
        if (e.keyCode === 37) {
            this.nextSlide();
        } else if (e.keyCode === 39) {
            this.prevSlide();
        }
    }


    nextSlide() {
        this.index++;
        if (this.index == this.slides.length) {
            this.index = 0;
        }
        this.slideTo(this.index);
    }

    prevSlide() {
        this.index--;
        if (this.index < 0) {
            this.index = (this.slides.length - 1);
        }
        this.slideTo(this.index);
    }
};
