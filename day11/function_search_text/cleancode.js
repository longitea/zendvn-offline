var arrName = ["Minor Bisset", "Kiri Bernasek", "Malia Olenikov", "Grazia Glason", "Barbey Simion", "Dorena Wemes", "Shirlee Mc Grath", "Tull Leppo", "Mandy Jedrysik", "Dilly Sinncock", "Deena Westnedge", "Pat Wawer", "Marc Hune", "Fleming Aykroyd", "Tybalt Kaspar", "Araldo Tyson", "Sherrie Ashleigh", "Norrie Ales0", "Jarrad Prettyjohn", "Vittoria Hofer"];

var listName = document.querySelector('#list-name');
var inputSearch = document.querySelector('input');

// 1. render table khi vừa vào trang
renderTable();


// 2. bắt sự kiện input -> render valueTable
inputSearch.addEventListener('input', function(){
    var search = inputSearch.value.trim();
    renderTable(search);
})

// 3. khi vale trùng với element trong mảng thì mới render
function renderTable(search = ''){
    var result = '';
    for (var element of arrName){
        if(search !== ''){
            if(element.includes(search)){
                var name = element.replaceAll(search, '<mark>' + search +'</mark>')
                result += '<tr><td>' + name + '</td></tr>';
            }
        }else result += '<tr><td>' + element + '</td></tr>';

    }
    listName.innerHTML = result
}