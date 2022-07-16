import { API_ARTICLE, API_CATEGORY_WITH_COUNT_ARTILCE, API_POPULAR_POST, API_TOP_ARTICLES } from "./contants/api_path.js";
import callAjax from "./module/callAjax.js";
import countComment from "./module/countComment.js";
import renderMenu from "./module/RenderMenu.js";
import { renderPostBig, renderPostSmall } from "./module/RenderPost.js";

$(document).ready(function () {

    // Truyền vào prop : vị trí cụ thể muốn render ra
    let mainMenu = $('.main_menu');
    let postsBig = $('#posts_big');
    let postsSmall = $('#posts_small');
    let postSilder = $('.swiper-wrapper');
    let postPopolar = $('#popular-posts')
    let countCategory = $('#category-count-articles')
    const commentAll = JSON.parse(localStorage.getItem("comments"))

    // render CatetogyNews
    renderMenu(mainMenu);

    // 1. DOM, 2. URL API
    renderPostBig(postsBig, API_ARTICLE, commentAll)
    renderPostSmall(postsSmall, API_ARTICLE, commentAll);



    // 2. Render Slider

    $.ajax({
        type: "get",
        url: API_TOP_ARTICLES,
        data: {
            offset: 0,
            limit: 5
        },
        dataType: "JSON",
        success: function (response) {
            const sidler = response.map(element => renderSilder(element)).join('');
            postSilder.html(sidler)

        }
    });

    function renderSilder({ thumb, category, id, description, publish_date }) {
        const idArticle = `detail.html?idArticle=${id}`;
        const count = countComment(commentAll, id)

        return (`
            <!--/.swiper-slide 1-->
            <div class="swiper-slide">
                <figure class="overlay caption caption-overlay rounded mb-0">
                <a href=${idArticle}><img src=${thumb} alt=""> </a>
                    <figcaption>
                        <span class="badge badge-lg bg-white text-uppercase mb-3">${category.name}</span>
                        <h2 class="post-title h3 mt-1 mb-3"><a href=${idArticle}>${description}</a></h2>
                        <ul class="post-meta text-white mb-0">
                            <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${publish_date}</span></li>
                            <li class="post-author"><a href="#"><i class="uil uil-user"></i><span>By Sandbox</span></a></li>
                            <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${count}<span>Comments</span></a></li>
                        </ul>
                        <!-- /.post-meta -->
                    </figcaption>
                    <!-- /figcaption -->
                </figure>
            </div>
        `)
    }

    /**
        Điểm chung:
            1. Hàm -> callAjax
                - gọi api bằng ajax
            2. truyền params 
                - API_URL, data_ofset
                - vị trí cần render trong DOM
            3. Funtion Custom dữ liệu lấy từ API
     */

    $.ajax({
        type: "get",
        url: API_POPULAR_POST,
        data: {
            offset: 0,
            limit: 3
        },
        dataType: "JSON",
        success: function (response) {
            const postPopular = response.map(element => renderPopularPost(element)).join('');
            postPopolar.html(postPopular)
        }
    });




    function renderPopularPost({ thumb, title, publish_date, id }) {
        const idArticle = `detail.html?idArticle=${id}`;
        const count = countComment(commentAll, id)

        return /*html*/`
            <!-- Popular Posts 1 -->
            <li>
                <figure class="rounded"><a href=${idArticle}>
                <img src=${thumb} alt="" /></a></figure>
                <div class="post-content">
                    <h6 class="mb-2"> <a class="link-dark" href=${idArticle}>${title}</a> </h6>
                    <ul class="post-meta">
                        <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${publish_date}</span></li>
                        <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${count}</a>
                        </li>
                    </ul>
                </div>
            </li>
        `
    }

    // -=============== Render Categories ===============-
    let dataCate = {
        offset: 0,
        limit: 3,
    }

    // promise
    const thanhlong =  callAjax(API_CATEGORY_WITH_COUNT_ARTILCE, dataCate, countCategory, renderCateCountArticle)
    thanhlong.then(res => console.log(res))
    

    function renderCateCountArticle({ id, name, articles_count}) {
        const idCategory = `category.html?idCategory=${id}`;
        const content = `${name} (${articles_count})`
        return `
            <li><a href=${idCategory}>${content}</a></li>
        `
    }
}); 