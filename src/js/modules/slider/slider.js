import { auto } from "async";

export default class Slider {
    // container - контейнер для слайдера
    // btns - селектори кнопок які будуть переключати улументи
    // null - потрібні для того що якщо елемент не буде переданий код буде і далі працювати
    // якщо ось ця частина що в обєкті не буде передана то замість неї підставиться пустий обєкт
    // цей запис деструктуризує оюєкт на окремі змінні які знаходяться всередині
    constructor({container = null, 
                 btns = null, 
                 next = null, 
                 prev = null,
                 activeClass = '',
                 animate,
                 autoplay } = {}) {
        // поміщаєм ті властивості, які будуть описувати слайдер на початковому етапі
        // тобто ті речі які описують слайдер ще до того етапу як він почне працювати
        this.container = document.querySelector(container); // головний блок який є на сторінці
        try {this.slides = this.container.children;} catch(e){} // слайди які будуть всередині слайдера, які необхідно буде переміщувати
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        // this.prevModule = document.querySelectorAll('.prevmodule');
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1; // оприділятиме поточний слайд, потрібен для того щоб орієнтуватись куди рухатись далі

    }
}





