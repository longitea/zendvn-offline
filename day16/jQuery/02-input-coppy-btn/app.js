
// var btn = document.getElementById('btn');
// btn.addEventListener('click', function () {
//     var text = document.getElementById('input1').value;
//     document.getElementById('input2').value = text;
// });


const valueInput1 = $('#input1');
const valueInput2 = $('#input2');

var isEmpty = $('#input1').val();

$(document).ready(function () {
    $('#btn').on('click', () => {
        valueInput2.val(valueInput1.val())
        
        console.log(`Result: ${isEmpty}`);
    })
});