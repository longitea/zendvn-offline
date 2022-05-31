var arrName = ["Minor Bisset", "Kiri Bernasek", "Malia Olenikov", "Grazia Glason", "Barbey Simion", "Dorena Wemes", "Shirlee Mc Grath", "Tull Leppo", "Mandy Jedrysik", "Dilly Sinncock", "Deena Westnedge", "Pat Wawer", "Marc Hune", "Fleming Aykroyd", "Tybalt Kaspar", "Araldo Tyson", "Sherrie Ashleigh", "Norrie Ales0", "Jarrad Prettyjohn", "Vittoria Hofer"];


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

// -=============== 2. Search Function ===============-
input.addEventListener('input', changeText);


// function changeText
function changeText(e) {
    var seachTxt = e.target.value;
    if (seachTxt != '') {
        listName.innerHTML = thirdRenderTable(seachTxt);
    } else {
        listName.innerHTML = caiMangLucDauNe;
    }
}

// render lại mảng thứ 3
function thirdRenderTable(param){
    var result = '';
    for (var i = 0; i < arrName.length; i++) {
        if(arrName[i].indexOf(param) != -1){
            var repalceFirst = arrName[i].replaceAll(param, '<mark>'+ param +'</mark>');
            result += '<tr><td>' + repalceFirst + '</td></tr>';
        }
    }
    return result;
}

