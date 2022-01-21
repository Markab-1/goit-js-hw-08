import throttle from 'lodash.throttle';

const iframeRef = document.querySelector('#vimeo-player');

const player = new Vimeo.Player(iframeRef);

const STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(timeUpdate, 1000));

player.setCurrentTime(JSON.parse(localStorage.getItem(STORAGE_KEY)));

function timeUpdate(event) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(event.seconds));
}
