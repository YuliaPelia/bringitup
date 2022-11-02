import MainSlider from './modules/slider/slider-main';
import VideoPlayer from './modules/playvideo';


window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({btns: '.next', page: '.page'});
    slider.render();

    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();
});