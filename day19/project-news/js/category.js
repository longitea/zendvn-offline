import { API_ARTICLE_BY_ID_CATEGORY, API_CATEGORY_DETAIL_BY_ID } from "./contants/api_path.js";
import renderMenu from "./module/RenderMenu.js";
import { renderPostBig, renderPostSmall } from "./module/RenderPost.js";


$(document).ready(function () {
    // DOM Seletor
    let mainMenu = $('.main-menu');
    let categoryTitle = $('#category-title')
    let postsBig = $('#posts_big');
    let postSmall = $('#posts_small');
    const commentAll = JSON.parse(localStorage.getItem("comments"))




    // Module Render Menu 
    renderMenu(mainMenu);
    renderTitleSection();

    // load article

    renderPostBig(postsBig, API_ARTICLE_BY_ID_CATEGORY, commentAll)
    renderPostSmall(postSmall, API_ARTICLE_BY_ID_CATEGORY, commentAll);


    function renderTitleSection() {

        $.ajax({
            type: "GET",
            // khúc này là lấy api của Category/id
            url: API_CATEGORY_DETAIL_BY_ID,
            data: "data",
            dataType: "JSON",
            success: function (response) {
                categoryTitle.text(response.name)
            }
        });
    }

}); 