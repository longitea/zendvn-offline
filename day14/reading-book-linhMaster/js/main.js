let content = document.getElementById('content');

let slbLineHeight = document.getElementById('slb-line-height');
let slbTextAlign = document.getElementById('slb-text-align');
let btnIncrease = document.getElementById('btn-increase');
let btnDecrease = document.getElementById('btn-decrease');

loadSetting();

slbLineHeight.addEventListener('change', function () {
    let value = slbLineHeight.value;
    content.style.lineHeight = value;
    saveConfig('lineHeight', value);
});

slbTextAlign.addEventListener('change', function () {
    let value = slbTextAlign.value;
    content.style.textAlign = value;
    saveConfig('textAlign', value);

});

document.addEventListener('click', function (event) {
    let ele = event.target;

    if (ele.classList.contains('btn-background')) {
        let value = ele.dataset.value;
        content.style.backgroundColor = value;
        saveConfig('backgroundColor', value);
    }

    if (ele.classList.contains('btn-font-size')) {
        let value = parseInt(window.getComputedStyle(content).getPropertyValue('font-size'));
        if (ele.dataset.action === 'increase') {
            value += 2;
        } else {
            value -= 2;
        }
        content.style.fontSize = value + 'px';
        saveConfig('fontSize', value + 'px');
    }
});

function saveConfig(key, value) {
    let config = JSON.parse(localStorage.getItem('READING_CONFIG')) || {};
    config[key] = value;
    localStorage.setItem('READING_CONFIG', JSON.stringify(config));
}

// let config = {
//     fontSize: '16px',
//     backgroundColor: 'green',
//     lineHeight: 1
// };

// console.log(config);
// console.log(JSON.stringify(config));

// localStorage.setItem('READING_CONFIG', JSON.stringify(config));
// let localConfig = JSON.parse(localStorage.getItem('READING_CONFIG'));
// console.log(localConfig.backgroundColor);

function loadSetting() {
    let localConfig = JSON.parse(localStorage.getItem('READING_CONFIG'));
    if (localConfig) {
        // console.log(localConfig.backgroundColor);
        // content.style.fontSize = localConfig.fontSize;
        // content.style.backgroundColor = localConfig.backgroundColor;
        // content.style.lineHeight = localConfig.lineHeight;
        // content.style.textAlign = localConfig.textAlign;
        for (let property in localConfig) {
            content.style[property] = localConfig[property];
        }
    }
    
}

// btnIncrease.addEventListener('click', function () {
//     // console.log(123);
//     // lay font size hien tai content
//     let value = parseInt(window.getComputedStyle(content).getPropertyValue('font-size'));
    
//     // tang font size len 2 don vi
//     value += 2;
//     // set lai font size cho content
//     content.style.fontSize = value + 'px';
//     // luu font size vao localstorage
//     localStorage.setItem('fontSize', value + 'px');
// });

// btnDecrease.addEventListener('click', function () {
//     // console.log(123);
//     // lay font size hien tai content
//     let value = parseInt(window.getComputedStyle(content).getPropertyValue('font-size'));
    
//     // tang font size len 2 don vi
//     value -= 2;
//     // set lai font size cho content
//     content.style.fontSize = value + 'px';
//     // luu font size vao localstorage
//     localStorage.setItem('fontSize', value + 'px');
// });