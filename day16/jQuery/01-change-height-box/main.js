var boxes = document.getElementsByClassName('box');

var maxHeight = 0;
for (var index = 0; index < boxes.length; index++) {
    console.log(boxes[index].offsetHeight);
    if (boxes[index].offsetHeight > maxHeight) maxHeight = boxes[index].offsetHeight;
}

for (var index = 0; index < boxes.length; index++) {
    // gán maxHeight cho các box
    boxes[index].style.height = maxHeight + 'px';
    // gán màu dựa trên điều kiện chẵn lẻ
    var color = 'red';
    if (index % 2 != 0) color = 'gold';
    boxes[index].style.backgroundColor = color;
}




