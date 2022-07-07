import { API_ARTICLE } from "./contants/api_path.js";
import renderMenu from "./module/RenderMenu.js";
import { renderPostBig, renderPostSmall } from "./module/RenderPost.js";

$(document).ready(function () {

    // Truyền vào prop : vị trí cụ thể muốn render ra
    let mainMenu = $('.main_menu');
    let postsBig = $('#posts_big');
    let postsSmall = $('#posts_small');

    
    renderMenu(mainMenu);
    // 1. DOM, 2. uRL API
    renderPostBig(postsBig, API_ARTICLE)
    renderPostSmall(postsSmall, API_ARTICLE);

});