import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);

    }

    // декорація слайдів
    decorizeSlides() {
        // видаляємо клас активності з слайдів
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if(this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });
        // якщо активний слайд буде кнопкою тоді не будемо йому назначати клас активності, а якщо не є кнопкою тоді НЕ добавляємо
        if(!this.slides[0].closest('button')) {
            // добавляєм клас активності першому слайду
            this.slides[0].classList.add(this.activeClass);
        }

        if(this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        // виправлення багу з кнопками
        if(this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
        this.container.appendChild(this.slides[0]); // Slide
        this.container.appendChild(this.slides[1]); // Btn
        this.container.appendChild(this.slides[2]); // Btn
        this.decorizeSlides();
        } else if(this.slides[1].tagName == "BUTTON") {
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.decorizeSlides();
        } else {
            // коли прогортуємо слайдер вперед наш елемент буде відправлятись в кінець списку
            // перший елемент поміщаємо в кінець списку
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        } 
    }

    // привязуємо певну дію до певних кнопок
    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            // перебираєм кожен елемент всередині масива this.slides починаючи з кінця і якщо останній елемент який там є
            // виявиться кнопкою, тоді ми будемо його пропускати
            for(let i = this.slides.length - 1; i > 0; i--) {
                if(this.slides[i].tagName !== "BUTTON") {
                    // оприділяєм останній слайд і поміщаєм його перед самим першим
                    let active = this.slides[i];
                    // ставимо його на першу позицію
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });
    }

    activateAnimation() {
        let poused = false;
        if(this.autoplay) {
            poused = setInterval(() => this.nextSlide(), 5000);
        }

        this.slides[0].parentNode.addEventListener('mouseenter', () => {
            clearInterval(poused);
        });
    
        this.slides[0].parentNode.addEventListener('mouseleave', () => {
            this.activateAnimation();
        });
    }

    init() {
        try {
            // cssText - записуєм необхідні css-властивості і вони застосуються
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;
            this.bindTriggers();
            this.decorizeSlides();
            this.activateAnimation();
        } catch (e) {}

    }
}