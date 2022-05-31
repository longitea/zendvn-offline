var arrName = ["Minor Bisset", "Kiri Bernasek", "Malia Olenikov", "Grazia Glason", "Barbey Simion", "Dorena Wemes", "Shirlee Mc Grath", "Tull Leppo", "Mandy Jedrysik", "Dilly Sinncock", "Deena Westnedge", "Pat Wawer", "Marc Hune", "Fleming Aykroyd", "Tybalt Kaspar", "Araldo Tyson", "Sherrie Ashleigh", "Norrie Ales0", "Jarrad Prettyjohn", "Vittoria Hofer"];
/**
 * 1. Redender 1 Table khi vừa vào trang
 * 2. Bắt sự kiện khi người dùng nhập giá trị ở ô input.
 *      - Lấy giá trị người dùng nhập vào
 *      - Thực hiện render lại table + replace từ khóa bằng thẻ span
 */


const listName = document.getElementById('list-name');
const input = document.querySelector('input');
const caiMangLucDauNe = firstRenderTable(); // biến này dùng chung

// -=============== 1. Render table khi vừa vào trang ===============-
function firstRenderTable() {
    var result = '';
    for (var i = 0; i < arrName.length; i++) {
        result += '<tr><td>' + arrName[i] + '</td></tr>';
    }
    return result;
}
listName.innerHTML = caiMangLucDauNe;


// -=============== 2. bắt sự kiện value khi input ===============-
input.addEventListener('input', changeText);


// function changeText
function changeText(e) {
    var seachTxt = e.target.value;
    if (seachTxt != '') {
        listName.innerHTML = secondRenderTable(seachTxt);
    } else {
        listName.innerHTML = caiMangLucDauNe;
    }
}

// render lại mảng thứ 2
function secondRenderTable(param) {
    var result = '';
    for (var i = 0; i < arrName.length; i++) {
        var repalceFirst = arrName[i].replaceAll(param, '<mark>'+ param +'</mark>');
        result += '<tr><td>' + repalceFirst + '</td></tr>';
    }
    return result;
}
