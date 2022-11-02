import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    }

    
    // створрюєм методі
    // n - відповідатиме за те куди рухається слайдер
    showSlides(n) {
        // якщо n буде більною за кількість слайдів
        if(n > this.slides.length) {
            // повертаємо слайдер на початок
            this.slideIndex = 1;
        } 
        // якщо n буде менше 1
        if (n < 1) {
            // тоді slideIndex буде рівний останньому елементу
            this.slideIndex = this.slides.length;
        }

        // робимо так що коли користувач заходить на сторінку 3, через 3 сек випливає необхідний блок
        try {
            this.hanson.style.display = 'none';
            // якщо ми знаїодимось на 3 сторінці, тоді показуємо блок hanson через 3 секунди
            if(n == 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.display = 'block';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                // якщо користувач йде з 3 сторінки, тоді ми забираємо цей клас
                this.hanson.classList.remove('slideInUp');

            }
        }catch(e){}


        // приховуєм всі слайди і показуємо той слайд з якого все починається
        this.slides.forEach(slide => {
            // плавне прогортування
            slide.classList.add('animated', 'slideInUp');
            // приховуємо всі слайди
            slide.style.display = 'none';
        });
        // показуємо перший слайд 
        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    // для того щоб контролювати рух слайдів
    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    // це є найголовніший метод 
    // цей метод об'єднює всі інші ф-ції які були прописані в цьому класі
    render() {
        // використовуєм trycatch для того щоб якщо цей код не виконався загальний код не зламався
        try {
            // прлучаєм блок тільки тоді коли буде запускатися метод render
            // hanson - назва блоку
            this.hanson = document.querySelector('.hanson');
        } catch(e) {}
        // прлучаєм блок тільки тоді коли буде запускатися метод render
        // hanson - назва блоку
        this.hanson = document.querySelector('.hanson');

        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                // переключаєм слайди при кліку на кнопки
                this.plusSlides(1); // оскільки в першому слайді в нас тільки одна кнопка яка переключає вправо
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        this.showSlides(this.slideIndex);
    }
}