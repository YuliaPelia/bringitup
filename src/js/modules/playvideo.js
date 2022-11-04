export default class VideoPlayer {
    // triggers - кнопка яка буде відкривати модальне вікно
    // overlay - модальне вікно, в нашому кожному модальному вікні 
    // є клас close який відповідає за закриття модального вікна і на нього ми будемо навішувати обробника подій
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }


    bindTriggers() {
        // коли ми будемо нажимати на одну з цих кнопок у нас буде відкриватись плеєр
        // кожній кнопці буде приствоєний різний URL - відповідно будуть відкриватись різні плеєри
        // i - номер кнопки
        this.btns.forEach((btn, i) => {
            try {
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;

                if(i % 2 == 0) {
                    blockedElem.setAttribute('data-disabled', 'true');
                }
            } catch(e){}

            btn.addEventListener('click', () => {
                if(!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
                    this.activeBtn = btn;

                    if(document.querySelector('iframe#frame')) {
                        this.overlay.style.display = 'flex';
                        if(this.path !== btn.getAttribute('data-url')) {
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path});
                        }
                    } else {
                        // получаєм URL
                        this.path = btn.getAttribute('data-url');
        
                        this.createPlayer(this.path);
                    }
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
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });

        this.overlay.style.display = 'flex';
    }
    // заблокувати  відео (там де замочок намальованой) що його не можна буде відкрити доти доки коритсувач не подивиться перше відео
    onPlayerStateChange(state) {
        try {
            //closest() - получає першу Node по селектору який ми в нього передаємо вище по ієрархії
            // і якщо підходить той елемент на якому це спрацювало то поверне сам елемент
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
            // створюєм змінну в яку помістимо svg іконку play
            // cloneNode(true) - глибоке копіювання
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
            // якщо відео вже переглянуто (0 - з документації)
            if(state.data === 0) {
                // contains() - повертає true/false
                if(blockedElem.querySelector('.play__circle').classList.contains('closed')) {
                    blockedElem.querySelector('.play__circle').classList.remove('closed');
                    blockedElem.querySelector('svg').remove();
                    blockedElem.querySelector('.play__circle').appendChild(playBtn);
                    blockedElem.querySelector('.play__text').textContent = 'play video';
                    blockedElem.querySelector('.play__text').classList.remove('attention');
                    blockedElem.style.opacity = 1;
                    blockedElem.style.filter = 'none';

                    blockedElem.setAttribute('data-disabled', 'false');
                }
            }
        } catch(e){}
    }

    // створюємо плеєр використовуючи API який буде працювати з ютубом (з документації)
    init() {
        if(this.btns.length > 0) {
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
}

