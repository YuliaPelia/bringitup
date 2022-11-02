export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.oldItems = this.oldOfficer.querySelectorAll(items);
        this.newItems = this.newOfficer.querySelectorAll(items);
        this.items = items;
        this.oldCounter = 0;
        this.newCounter = 0;
    }
    

    bindTriggers(officer, counter, items) {
        officer.querySelector('.plus').addEventListener('click', () => {
            // перевіряєм чи в нас зараз відкривається не останній елемент
            if(counter !== items.length - 2) {
                items[counter].style.display = 'flex';
                items[counter].classList.add('animated', 'fadeIn');
                counter++;
            } else { // якщо ми дойшли до останньої карточки яку треба показати, ми її показазуємо і після цього видаляєм останній блок
                items[counter].style.display = 'flex';
                items[counter].classList.add('animated', 'fadeIn');
                items[items.length - 1].remove();
            }
        });
    }

    // приховуєм карточки
    // itemm - кожен елемент всередині масиву
    // i - номер по-порядку
    // arr - це посилання на той масив який ми зараз перебираєм
    hideItems(items) {
        items.forEach((item, i, arr) => {
            // перевіряєм що елемент масиву (номер по порядку не є останнім в цій колекції)
            if(i !== arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }

    init() {
        this.hideItems(this.oldItems);
        this.hideItems(this.newItems);
        this.bindTriggers(this.oldOfficer, this.oldCounter, this.oldItems);
        this.bindTriggers(this.newOfficer, this.newCounter, this.newItems);
    }
}