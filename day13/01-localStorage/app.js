var inputName = document.querySelector('#name');
var inputEmail = document.querySelector('#email');
var inputJob = document.querySelector('#job');

var btnSave = document.querySelector('.btn-success');
var btnDelete = document.querySelector('.btn-danger');
// 2. get data from local
getLocal();

btnSave.addEventListener('click', function(){
    saveLocal();
});

function saveLocal(){
    var fullName = inputName.value;
    localStorage.setItem('fullName', fullName);

    var email = inputEmail.value;
    localStorage.setItem('email', email);

    var job = inputJob.value;
    localStorage.setItem('job', job);
}

    // 2. get data from local
function getLocal() {
    var fullName = localStorage.getItem('fullName');
    var email = localStorage.getItem('email');
    var job = localStorage.getItem('job');
    console.log(job);

    inputName.value = fullName;
    inputEmail.value =  email;
    inputJob.value = job;   
}

// 3. Remove trong local
btnDelete.addEventListener('click', function(){
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    localStorage.setItem('job', 'student');
});

