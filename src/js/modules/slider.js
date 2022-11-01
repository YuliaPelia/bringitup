export default class Slider {
    // описуєм кодом слайдер який буде на сторінці
    // вказуємо слайдеру на якій сторінці він буде працювати
    // які слайди будуть всередині
    // тріггери(кнопки) які будуть переключати ці слайди
    // btns - селектори кнопок які будуть переключати улументи
    constructor(page, btns) {
        // поміщаєм ті властивості, які будуть описувати слайдер на початковому етапі
        // тобто ті речі які описують слайдер ще до того етапу як він почне працювати
        this.page = document.querySelector(page); // головний блок який є на сторінці
        this.slides = this.page.children; // слайди які будуть всередині слайдера, які необхідно буде переміщувати
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1; // оприділятиме поточний слайд, потрібен для того щоб орієнтуватись куди рухатись далі

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

        // приховуєм всі слайди і показуємо той слайд з якого все починається
        this.slides.forEach(slide => {
            // плавне прогортування
            slide.classList.add('animated');
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




