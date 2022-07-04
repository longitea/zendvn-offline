// http://apiforlearning.zendvn.com/api/categories_news/1/articles?offset=0&limit=10&sort_by=id&sort_dir=desc

$(document).ready(function () {
    const API_URL = 'http://apiforlearning.zendvn.com/api/';
    const API_CATEGORY = `${API_URL}categories_news`;
    const API_ARTICLE = `${API_URL}categories_news`;


    let mainMenu = $('.main-menu');

    renderMenu();
        




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



}); 