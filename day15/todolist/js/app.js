let todos = [
    {
        id: '62914e5b-ef73-430f-a89e-3aeb115cba63',
        name: 'Hoàn thành chức năng todolist',
        level: 2,
    },
    {
        id: '8a623f0c-737e-49fc-8064-c76535071eb1',
        name: 'Lấy được danh sách công việc',
        level: 1,
    },
    {
        id: 'd7434df7-8601-4ce2-89f1-ab8004ad0645',
        name: 'hac habitasse platea dictumst etiam faucibus cursus urna ut tellus',
        level: 2,
    },
    {
        id: '13327097-a3f8-4a90-8ce0-2b8c045504fa',
        name: 'Ép kiểu xml danh sách vừa lấy được',
        level: 1,
    },
    {
        id: 'e1fe9172-3586-4f3a-86da-99457310d0b7',
        name: 'render danh sách công việc đã ép kiểu hiển thị lên browser',
        level: 3,
    },
    {
        id: '6da77e96-266f-4b21-b5b3-f347409fe4c9',
        name: 'a ipsum integer a nibh',
        level: 1,
    },
    {
        id: 'c921f661-1aea-4878-ad0b-f9d7cf189ef5',
        name: 'eu felis fusce posuere felis sed lacus',
        level: 3,
    },
    {
        id: '9f5194ff-5dc2-4ae1-822e-b528fcd6aa95',
        name: 'molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque',
        level: 3,
    },
    {
        id: 'e1958e9d-eccd-46e4-9f24-fafae91d2b1c',
        name: 'morbi quis',
        level: 3,
    },
    {
        id: '27ccdf63-11c0-4e8f-a9b0-93d3c0350c33',
        name: 'sollicitudin vitae',
        level: 1,
    },
];

//  đặt 1 biến cờ
var isEdit = '';





// ? Có bao nhiêu cách lấy element trong [array], {object} 
// xem lại phân giải dữ liệu là [{}, {}, {}]

/**
    1. đầu tiên, lấy list  name của todo 
    2. ép kiểu chuỗi <tr><td> + {renderArray}+</td></tr>
    3. thay chuỗi đó vào todo
    4. lấy tương tự những thằng number, level, action
*/

const tableTodo = document.querySelector('#todo-list');
const tdLevel = document.getElementsByTagName('tr');



// -=============== Render todo browser ===============-
const renderTodoList = (todoList) => {
    // 1. read dữ liệu từ api
    let newTask = '';

    for (var i = 0; i < todoList.length; i++) {
        // 2.lấy id -> ép kiểu xml -> render lại ra browser
        let level = showLevel(todoList[i].level);
        newTask += `
        <tr>
            <th> ${i + 1} </th>  
            <td> ${todoList[i].name} </td>
            <td> ${level} </td>
            <td><button class="btn btn-warning btn-sm" data-id="${todoList[i].id}">Edit</button>
            <button class="btn btn-danger btn-sm" data-id="${todoList[i].id}">Delete</button></td>
        </tr>
        `
    }
    tableTodo.innerHTML = newTask;
}
renderTodoList(todos);

// arrow funtion không support hoisting
function showLevel(levelNumber) {
    let className = ''
    let textNode = ''
    if (levelNumber === 1) {
        className = 'secondary';
        textNode = 'Small'
    }
    if (levelNumber === 2) {
        className = 'info';
        textNode = 'Medium'
    }
    if (levelNumber === 3) {
        className = 'danger';
        textNode = 'High'
    }
    return `<span class="badge text-bg-${className}">${textNode}</span>`
}

// -=============== Delete Funtion ===============-
document.addEventListener('click', (e) => {
    var element = e.target;
    var [a, ...rest] = element.classList;
    if (rest.includes('btn-danger') && rest.includes('btn-sm')) {
        if (confirm('Are You Sure!')) {
            let id = element.dataset.id;
            todos = todos.filter((element, index, todos) => {
                if (element.id !== id) {
                    return element;
                }
            });
            renderTodoList(todos);
        }
    }
})


// -=============== Create Funtion ===============-

/**
1. bắt even click submit
    -> get value input + level (select option)
2. tạo ra todo mới:
    -> let newTodo = {
        id: createId()
        name: taskName;
        level: level
    }
    -> insert newTodo vào todos
    -> gọi lại hàm renderTodo
*/
// 3. funtion createId -> random ra 1 chuỗi 12 ký tự (a-zA-z0-9)
let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa' href : https://learnersbucket.com/examples/javascript/unique-id-generator-in-javascript/
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const createElement = document.querySelector('.btn-primary.ms-1');
const inputValue = document.querySelector('#input-new-task');
const selectLevel = document.querySelector('#select-level');

// check input
createElement.disabled = true;
inputValue.addEventListener('input', (e) => {
    let element = e.target;
    if(element.value.trim() != ''){
        createElement.disabled = false;
    } else {
        createElement.disabled = true;
    }
});

createElement.addEventListener('click', (e) => {
    // 1. lấy giá trị input
    let taskName = inputValue.value.trim();
    let levelValue = parseInt(selectLevel.value);

    let newTodo = {
        id: guid(),
        name: taskName,
        level: levelValue,
    }
    todos.push(newTodo);
    renderTodoList(todos);
    // reset lại giá trị mới.
    selectLevel.value = '1';
    inputValue.value = '';
    createElement.disabled = true;
})

// -===============  Search Function ===============-
/**
1. bắt sự kiện search
    -> get value input
    -> đem so sánh với danh sách các name của api (duyệt mảng)
    -> name nào contain() /include() search thì mới cho vào mảng render

2. thực hiện render lại task
*/

const btnSearch = document.querySelector('#btn-search');
const inputName = document.querySelector('#input-search-todo');


btnSearch.addEventListener('click', (e) => {
    let search = inputName.value.trim();
    let newToDo = [];
    for(var i = 0; i < todos.length; i++){
        if(todos[i].name.includes(search)){
            newToDo.push(todos[i]);
        }
    }

    renderTodoList(newToDo);
    inputName.value ='';
});


// -=============== Update Function ===============-
/**
1. bắt sự kiện document btn edit <> edit btn
    -> lấy ra được tr parentElement
    -> từ parent tìm thằng con td
    -> thay thế tag td -> input value
*/

document.addEventListener('click', (e) => {
    let element = e.target;
    if(element.classList.contains('btn-warning')){

        let id = element.dataset.id;
        // gán biến cờ vào isEdit
        isEdit = id;
        console.log(id);
        let item = todos.find( function(ele) {
            return ele.id === id;
        });
        
        inputValue.value = item.name; 
        selectLevel.value = item.level; 

        // console.log(item);
        // let elementTr = element.parentElement.parentElement;
        // let elementTd = elementTr.children[1];

        // let newNode = createDOM(elementTd.innerText);
        // elementTd.replaceChild(newNode, elementTd.childNodes[0]);
    }
})

// function createDOM(valueText){
//     const inputDOM = document.createElement('input');
//     inputDOM.type = 'text';
//     inputDOM.id = 'thanh';
//     inputDOM.style = 'width:500px; background-color:bisque;'
    
//     inputDOM.value = valueText;
//     return inputDOM;
// }

