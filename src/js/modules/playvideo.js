export default class VideoPlayer {
    // triggers - кнопка яка буде відкривати модальне вікно
    // overlay - модальне вікно, в нашому кожному модальному вікні 
    // є клас close який відповідає за закриття модального вікна і на нього ми будемо навішувати обробника подій
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
    }


    bindTriggers() {
        // коли ми будемо нажимати на одну з цих кнопок у нас буде відкриватись плеєр
        // кожній кнопці буде приствоєний різний URL - відповідно будуть відкриватись різні плеєри
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if(document.querySelector('iframe#frame')) {
                    this.overlay.style.display = 'flex';
                } else {
                    // получаєм URL
                    const path = btn.getAttribute('data-url');
    
                    this.createPlayer(path);
                }
            });
        }); 
    }

    // метод закриття модального вікна
    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            // зупиняємо відео яке знаходиться в модальному вікні
            this.player.stopVideo();
        });
    }


    // url - його ми будемо діставати з кнопки
    createPlayer(url) {
        // YT - буде підтягуватися з серверів ютуба
        // 'frame' - id блоку який ми будемо заміщувати нашим плеєром
        // videoId - сюди буде підгружуватись id відео, яке є на ютубі
        // `` - означає що ми videoId будемо підставляти динамічно
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`
        });

        console.log(this.player);
        this.overlay.style.display = 'flex';
    }

    // створюємо плеєр використовуючи API який буде працювати з ютубом (з документації)
    init() {
        // стоворюєм змінну всередині якої створюємо тег script
        const tag = document.createElement('script');

        // встановлюємо тегу атрибут src де ми звертаємось до серверу ютуба і беремо звідти iframe_api
        tag.src = "https://www.youtube.com/iframe_api";
        // знаходимо на сторінці перший серипт який там є
        const firstScriptTag = document.getElementsByTagName('script')[0];
        // звертаємся до головного батька який є на сторінці і перед першим скриптом поміщаємо серипт з iframe_api
        // (типу асинхронне підключення скрипта)
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.bindTriggers();
        this.bindCloseBtn();
    }
}