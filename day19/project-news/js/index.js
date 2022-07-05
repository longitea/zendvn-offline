import renderMenu from "./module/RenderMenu.js";
import { renderPostBig, renderPostSmall } from "./module/RenderPost.js";

$(document).ready(function () {

    // Truyền vào prop : vị trí cụ thể muốn render ra
    let mainMenu = $('.main_menu');
    let postsBig = $('#posts_big');
    let postsSmall = $('#posts_small');

    
    renderMenu(mainMenu);
    renderPostBig(postsBig)
    renderPostSmall(postsSmall);

});