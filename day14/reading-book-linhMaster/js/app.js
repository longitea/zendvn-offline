const FONT_SIZE_STEP = 2;
const STORAGE_KEY = 'READING_CONFIG';
let content = document.getElementById('content');
let slbLineHeight = document.getElementById('slb-line-height');
let slbTextAlign = document.getElementById('slb-text-align');

loadSetting();

document.addEventListener('click', function (event) {
    let target = event.target;
    if (target.classList.contains('btn-background')) {
        let value = target.dataset.value;
        content.style.backgroundColor = value;
        saveSetting('backgroundColor', value);
    }

    if (target.classList.contains('btn-font-size')) {
        let value = parseInt(window.getComputedStyle(content).fontSize);
        if (target.classList.contains('increase')) {
            value += FONT_SIZE_STEP;
        } else {
            value -= FONT_SIZE_STEP;
        }
        content.style.fontSize = value + 'px';
        saveSetting('fontSize', value + 'px');
    }
});

slbLineHeight.addEventListener('change', function () {
    let value = slbLineHeight.value;
    content.style.lineHeight = value;
    saveSetting('lineHeight', value);
});

slbTextAlign.addEventListener('change', function () {
    let value = slbTextAlign.value;
    content.style.textAlign = value;
    saveSetting('textAlign', value);
});

function saveSetting(key, value) {
    let config = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    config[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

function loadSetting() {
    let config = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    for (const key in config) {
        content.style[key] = config[key];
        if (key === 'lineHeight') slbLineHeight.value = config[key];
        if (key === 'textAlign') slbTextAlign.value = config[key];
    }
}
