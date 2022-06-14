var clickImage = document.querySelectorAll('.box-img');
var replaceSource = document.querySelector('.box-click img');
var replaceClass = document.querySelector('.box-click');

// 1. bắt sự kiện click vào img
document.addEventListener('click', function(e){
    // 1. Lấy Source IMG
    var source = e.target.getAttribute('src');

    replaceImage(source);
    replaceClass.classList.toggle('open');

})

// 2. gán src của img trong box-click -> ok
function replaceImage(newSource){
    if(newSource !== null){
        replaceSource.setAttribute('src', newSource);
    }
}