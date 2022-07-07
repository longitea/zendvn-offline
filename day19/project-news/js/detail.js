import { API_ARTICLE_DETAIL_BY_ID } from "./contants/api_path.js";
import renderMenu from "./module/RenderMenu.js";

$(document).ready(function () {


    let mainMenu = $('.main-menu');
    let detailTitle = $('#detail-title')
    let detailTitlePublishDate = $('#title-publish-date')
    let detailThumb = $('.bg-image')
    let detailSmallThumb = $('.card-img-top img')
    let detailContent = $('#detail-content')
    let detailDescription = $('#detail-description')


    renderMenu(mainMenu);
    renderArticle();

    



    // -=============== Render Article ===============-
    function renderArticle() {
        $.ajax({
            type: "GET",
            // url: 'http://apiforlearning.zendvn.com/api/articles/7466',
            url: API_ARTICLE_DETAIL_BY_ID,
            data: "data",
            dataType: "JSON",
            success: function (response) {
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