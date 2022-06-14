let content = document.getElementById('content');
let slbLineHeight = document.getElementById('slb-line-height');
let slbTextAlign = document.getElementById('slb-text-align');
let btnIncrease = document.getElementById('btn-increase');
let btnDecrease = document.getElementById('btn-decrease');

// gọi hàm khi vừa vào trang.
// loadSetting();

slbLineHeight.addEventListener('change', function () {
    let value = slbLineHeight.value;
    content.style.lineHeight = value;
    localStorage.setItem('lineHeight', value);
});

slbTextAlign.addEventListener('change', function () {
    let value = slbTextAlign.value;
    content.style.textAlign = value;
    localStorage.setItem('textAlign', value);
});

document.addEventListener('click', function (event) {
    let ele = event.target;

    if (ele.classList.contains('btn-background')) {
        let value = ele.dataset.value;
        content.style.backgroundColor = value;
        localStorage.setItem('backgroundColor', value);
    }

    if (ele.classList.contains('btn-font-size')) {
        let value = parseInt(window.getComputedStyle(content).getPropertyValue('font-size'));
        if (ele.classList.contains('increase')) {
            value += 2;
        } else {
            value -= 2;
        }
        content.style.fontSize = value + 'px';
        localStorage.setItem('fontSize', value + 'px');
    }
});


// function loadSetting(){
//     let fontSize = localStorage.getItem('fontSize');
//     if(fontSize) content.style.fontSize = fontSize;

//     let backgroundColor = localStorage.getItem('backgroundColor');
//     if(backgroundColor) content.style.backgroundColor = backgroundColor;

//     let lineHeight = localStorage.getItem('lineHeight');
//     if(lineHeight) content.style.lineHeight = lineHeight;

//     let textAlign = localStorage.getItem('textAlign');
//     if(textAlign) content.style.textAlign = textAlign;
// }


// cách 2 gọn hơn nữa lưu tất cả vào 1 Object 

let config = {
    fontSize: '16px',
    backgroundColor: 'green',
    lineHeight: 1,
    textAlign: 'left'
};

console.log(config);
console.log(JSON.stringify(config));

localStorage.setItem('READING_CONFIG', JSON.stringify(config));
let localConfig = JSON.parse(localStorage.getItem('READING_CONFIG'));
console.log(localConfig.backgroundColor);

function loadSetting() {
    let localConfig = JSON.parse(localStorage.getItem('READING_CONFIG'));
    content.style.fontSize = localConfig.fontSize;
    content.style.backgroundColor = localConfig.backgroundColor;
    content.style.lineHeight = localConfig.lineHeight;
    content.style.textAlign = localConfig.textAlign;
}