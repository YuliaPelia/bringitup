
export default class Forms {
    constructor(form) {
        this.forms = document.querySelectorAll(form);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Завантаження...',
            success: 'Дякую! Скоро ми з вами звяжемся',
            failure: 'Щось пішло не так...',
        };
        this.path = 'assets/question.php';
    }

    clearInputs() {
        this.inputs.forEach(i => {
            i.value = '';
        });
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');
    
        mailInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if(e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    // робимо маску номера телефону
    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
            if(elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
        function createMask(e) {
            // створюємо матрицю на яку будемо орієнтуватись при створенні маски
    
            let matrix = '+1 (___) ___-____', 
                i = 0,
                // статичне значення працює на основі матриці
                def = matrix.replace(/\D/g, ''), // получаєм всі не цифри які є
                val = this.value.replace(/\D/g, ''); // динамічне значення працює на основі того що ввів користувач
        
            // прописуєм умову що якщо к-сть цифр яка залишиться в матриці після дії по видаленню всіх не цифр всередині(def)
            // якщо воно буде більше або рівне к-сті цифр які будуть в value, тоді це значення потрібно буде замінити на стандартне 
            // коли користувач щось вводить в матрицю і починає видаляти +380 то ми йому цього зробити не дамо,
            // тому що при видаленні 380 val.length буде менше ніж def.length
            if(def.length >= val.length) {
                val = def;
            }
    
                
            //перебираємо всі симфоли що знаходяться в матриці і при заповненні матриці цифрами ми будемо видаляти __ і підставляти замість них цифри
            // /./ - кожний елемент який існує в рядку
            // a - кожен символ який буде перебиратись всередині матриці
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            // користувач перестав щось вводити
            if(e.type === 'blur') {
                // якщо к-сть символів в інпуті буде = 2, тоді ми очистимо інпут
                if(this.value.length == 4) {
                    this.value = '';
                }
            } else {
                // setCursorPosition() - встановлює позицію курсору
                setCursorPosition(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
    
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
    
        return await res.text();
    }

    init() {
        this.checkMailInputs();
        this.initMask();
        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                item.parentNode.appendChild(statusMessage); 
                // показуємо користувачц що йде загрузка
                statusMessage.textContent = this.message.loading;

                const formData = new FormData(item);

                this.postData(this.path, formData)
                // обробляєм запит
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000);
                    });
            });
        });
    }
}

