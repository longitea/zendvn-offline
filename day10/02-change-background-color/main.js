var clickChange = document.querySelector('button');
var displayColor = document.querySelector('body');
var changeText = document.querySelector('h1');
// [1, ... , 255]


// tạo màu
function randomColor(){
    var result = '';
    for(var i =0; i < 2; i++){
        var number = Math.floor(Math.random() * 256);
        result += number + ",";
    }
    result += Math.floor(Math.random() * 256);
    return `rgb(${result})`;
}

//1. khi click -> đổi màu
clickChange.addEventListener('click', function (){
    var color = randomColor();
    displayColor.style.backgroundColor = color;
    changeText.innerText = color;
});