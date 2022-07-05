$(document).ready(function () {
    const API_URL = 'http://apiforlearning.zendvn.com/api/';
    const API_CATEGORY = `${API_URL}categories_news`;
    const API_ID_ARTICLE = `${API_URL}articles/`

    let mainMenu = $('.main-menu');
    let detailTitle = $('#detail-title')
    let detailTitlePublishDate = $('#title-publish-date')
    let detailThumb = $('.bg-image')
    let detailSmallThumb = $('.card-img-top img')
    let detailContent = $('#detail-content')
    let detailDescription = $('#detail-description')

    // khi nó chuyển hướng đến trang này 
    // nó sẽ thực thi từ trên xuống dưới và lấy được id trước khi mà gọi API
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idDetail = urlParams.get('id')

    renderMenu();
    renderArticle();



    // -=============== API Render Menu  ===============-
    function renderMenu() {
        $.ajax({
            type: "GET",
            url: API_CATEGORY,
            data: 'data',
            dataType: "json",
            success: function (response) {

                let mainCategory = response.slice(0, 4).map(element => (`
                        <li class="nav-item">
                            <a class="nav-link" href=${element.link}>${element.name}</a>
                        </li>
                    `
                )).join('')

                let subCategory = response.slice(4, response.length).map(element => (`
                        <li class="nav-item">
                            <a class="dropdown-item" href=${element.link}>${element.name}</a>
                        </li>
                    `
                )).join('')

                subCategory = `
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Danh mục
                            khác</a>
                        <ul class="dropdown-menu">
                            ${subCategory}
                        </ul>
                        </li>
                    `
                $(mainMenu).html(mainCategory + subCategory)

            }
        });
    }

    // -=============== API Render Article  ===============-
    function renderArticle() {
        $.ajax({
            type: "GET",
            url: API_ID_ARTICLE + idDetail,
            data: "data",
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                $(detailTitle).html(response.title)
                $(detailTitlePublishDate).html(response.publish_date)
                detailDescription.html(response.description)
                // $(detailThumb).attr('data-image-src', response.thumb)
                $(detailThumb).css('background-image', 'url(' + response.thumb + ')')
                $(detailSmallThumb).attr('src', response.thumb)
                $(detailContent).html(response.content)
            }
        });
    }

});