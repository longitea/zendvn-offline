// const btnOpen = document.querySelector('.btn-open-modal');
// const modalContainer = document.querySelector('.modal-container');
// const btnClose = document.querySelector('.btn-close-modal');

// btnOpen.addEventListener('click', function () {
//   modalContainer.classList.add('show');
// });

// btnClose.addEventListener('click', function () {
//   modalContainer.classList.remove('show');
// });



// -=============== jQuery ===============-


const btnOpen = $('.btn-open-modal')
const modal = $('.modal-container') //Object
const modalContainer = document.querySelector('.modal-container'); //Object ???
const btnClose = $('.btn-close-modal')



$(document).ready(function () {
  btnOpen.on('click', (e) => {
    //JQ thao tác trực tiếp thuộc tính class của DOM element không cần classlist
    modal.addClass('show')
    e.stopPropagation()
  })

  btnClose.on('click', () => {
    modal.removeClass('show')
  })

  $('.modal').on('click', (e) => {
    e.stopPropagation()
  })

  $(document).on('click', () => {
    console.log(123);
    if (modal.hasClass('show')) {
      modal.removeClass('show')
    }
  })
});
