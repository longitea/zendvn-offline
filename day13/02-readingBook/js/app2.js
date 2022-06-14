/**        
    case 2 : F5 
            - lấy fontsize từ local 
            - set FS cho browser.

    case 1 : bắt sự kiện click ==> tăng/giảm fontsize 1 đơn vị
        - var changeFS = getfont size hiện tại + 1
            + getFontsize()
                - h1: 37px
                - h3 : 27px
                - p : 16px
                - li : 16px
        - gán fontSize mới cho browser + lưu local
 */

// -============================== TĂNG SIZE CHỮ ==============================-
var btnIncrease = document.querySelector('.btn-font-size.increase');
var btnDecrease = document.querySelector('.btn-font-size.decrease');
let contain = document.getElementById('contain');

// 4. get fontsize từ local khi vừa vào trang
function getFontSizeFromLocal(param1) {
    var nodeElement = `#content ${param1}`;
    var arrayOfText = document.querySelectorAll(nodeElement); //array

    var result = localStorage.getItem(param1);

    for (var element of arrayOfText) {
        element.style.fontSize = result;
    }
}

// CASE 02: LOAD FONTSIZE KHI VỪA VÀO TRANG
getFontSizeFromLocal('h1');
getFontSizeFromLocal('h3');
getFontSizeFromLocal('p');
getFontSizeFromLocal('li');

function addFontSize(param1) {
    // 1. get current font size 
    var nodeElement = `#content ${param1}`;
    var currentFontSize = window.getComputedStyle(document.querySelector(nodeElement)).fontSize;
    var arrayOfText = document.querySelectorAll(nodeElement); //array

    //2. gán lại font size mới cho browser
    var addFontSizeAlready = parseInt(currentFontSize) + 1 + 'px';
    for (var element of arrayOfText) {
        element.style.fontSize = addFontSizeAlready;
    }

    //3. lưu vào localStorage
    localStorage.setItem(param1, addFontSizeAlready);
}

// CASE 01: BẮT SỰ KIỆN CLICK -> CỘNG FONT SIZE CHO TEXT
btnIncrease.addEventListener('click', function () {
    addFontSize('h1');
    addFontSize('h3');
    addFontSize('p');
    addFontSize('li');
});


function subFontSize(param1) {
    var nodeElement = `#content ${param1}`
    var currentFontSize = window.getComputedStyle(document.querySelector(nodeElement)).fontSize;
    var arrayOfText = document.querySelectorAll(nodeElement); //array

    var addFontSizeAlready = parseInt(currentFontSize) - 1 + 'px';
    for (var element of arrayOfText) {
        element.style.fontSize = addFontSizeAlready;
    }

    //3. lưu vào localStorage
    localStorage.setItem(param1, addFontSizeAlready);

}
btnDecrease.addEventListener('click', function () {
    subFontSize('h1');
    subFontSize('h3');
    subFontSize('p');
    subFontSize('li');
})

// -============================== THAY ĐỔI MÀU NỀN ==============================-
var colorContent = document.querySelector('#content');

/**
    1. Bắt sự kiện click vào document
    2. kiểm tra nếu click vào nút color ->
        - lấy vaulue color của btn đó
        - save data vào localStorage
 */
document.addEventListener('click', function(e){
    let element = e.target;
    if(element.classList.contains('btn-background')) {
        let value = element.dataset.value;
        content.style.backgroundColor = value;
        localStorage.setItem('backgroundColor', value);
    }
})

colorContent.style.backgroundColor =  localStorage.getItem('backgroundColor');
    
// 1. bắt sự kiện đổi màu trắng
var btnWhite = document.querySelector('.btn-light');
btnWhite.onclick = function(){
    var color = btnWhite.getAttribute('data-value');
    colorContent.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color);
}

// 2. bắt sự kiện đổi màu xanh
var btnBlue = document.querySelector('.btn-primary');
btnBlue.onclick = function(){
    var color = btnBlue.getAttribute('data-value');
    colorContent.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color);
}

// 3. bắt sự kiện đổi màu xanh
var btnGreen = document.querySelector('.btn-success');
btnGreen.onclick = function(){
    var color = btnGreen.getAttribute('data-value');
    colorContent.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color);
}

// 4. bắt sự kiện đổi màu đỏ
var btnRed = document.querySelector('.btn-danger');
btnRed.onclick = function(){
    var color = btnRed.getAttribute('data-value');
    colorContent.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color);
}

// 5. bắt sự kiện đổi màu golf
var btnGold = document.querySelector('.btn-warning');
btnGold.onclick = function(){
    var color = btnGold.getAttribute('data-value');
    colorContent.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color);
}

// -============================== Chiều Cao Dòng ==============================-
var contentText = document.querySelector('#content');
var btnLineHeight = document.querySelector('#slb-line-height');

// 2. lấy lineHeight từ localStorage
contentText.style.lineHeight = localStorage.getItem('lineHeight');
btnLineHeight.value = localStorage.getItem('lineHeight');

// 1. bắt sự kiện change value -> set lại lineHeight cho content
btnLineHeight.addEventListener('change', function(e){
    contentText.style.lineHeight = e.target.value;
    localStorage.setItem('lineHeight', e.target.value);
})

// -============================== Canh Lề ==============================-
var contentTextAlight = document.querySelector('#content');
var btnTextAlight = document.querySelector('#slb-text-align');

// load localStorage
contentTextAlight.style.textAlign = localStorage.getItem('textAlign');
btnTextAlight.value = localStorage.getItem('textAlign');

// 1. lắng nghe sự kiện -> set text-alight cho content
btnTextAlight.addEventListener('change', function(e) {
    console.log(e.target.value);
    contentTextAlight.style.textAlign = e.target.value;
    localStorage.setItem('textAlign', e.target.value);
});
