import { API_CATEGORY_BY_ID } from "./Contant/GetAPI.js";
import renderMenu from "./module/RenderMenu.js";
import { renderPostBig, renderPostSmall } from "./module/RenderPost.js";


$(document).ready(function () {
    // DOM Seletor
    let mainMenu = $('.main-menu');
    let categoryTitle = $('#category-title')
    let postsBig = $('#posts_big');
    let postSmall = $('#posts_small');



    // Module Render Menu 
    renderMenu(mainMenu);
    renderTitleSection();

    // load article

    renderPostBig(postsBig)
    renderPostSmall(postSmall);


    function renderTitleSection() {

        $.ajax({
            type: "GET",
            // khúc này là lấy api của Category/id
            url: API_CATEGORY_BY_ID,
            data: "data",
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                categoryTitle.text(response.name)
            }
        });
    }

}); 