$(document).ready(function () {
    const API_URL = 'http://apiforlearning.zendvn.com/api/';
    const API_CATEGORY = `${API_URL}categories_news`;
    const API_ARTICLE = `${API_URL}articles`;


    let arrLiked = JSON.parse(localStorage.getItem('articlesLiked')) || [];
    let mainMenu = $('.main_menu');
    let postsBig = $('#posts_big');
    let postsSmall = $('#posts_small');
    let postsTop = $('#posts_top');

    renderMenu();
    renderPostTop();
    renderPostBig();
    renderPostSmall();


    $(document).on('click', '.zvn-btn-like', function () {
        let src = $(this).attr('src');
        let id = $(this).data('id');
        if (src == 'assets/img/heart_empty.png') {
            $(this).attr('src', 'assets/img/heart_full.png');
            arrLiked.push(id);
        } else {
            $(this).attr('src', 'assets/img/heart_empty.png');
            arrLiked = arrLiked.filter(item => item != id);
        }

        localStorage.setItem('articlesLiked', JSON.stringify(arrLiked));

        // if (src.includes('heart_empty')) {
        //     $(this).attr('src', src.replace('heart_empty', 'heart_full'));
        // } else {
        //     $(this).attr('src', src.replace('heart_full', 'heart_empty'));
        // }
    })

    // FUNCTIONS
    function renderMenu() {
        $.ajax({
            type: "GET",
            url: API_CATEGORY,
            data: {
                offset: 0,
                limit: 20
            },
            dataType: "json",
            success: function (data) {
                let contentMenu = '';
                let contentMenuOther = '';

                for (let i = 0; i < data.length; i++) {
                    let link = 'category.html?id=' + data[i].id;
                    let name = data[i].name;
                    if (i < 4) {
                        contentMenu += /*html*/`
                            <li class="nav-item">
                                <a class="nav-link" href="${link}">${name}</a>
                            </li>`;
                    } else {
                        contentMenuOther += /*html*/`
                            <li class="nav-item">
                                <a class="dropdown-item" href="${link}">${name}</a>
                            </li>`;
                    }
                }

                contentMenuOther = /*html*/`
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Danh mục khác</a>
                        <ul class="dropdown-menu">
                            ${contentMenuOther}
                        </ul>
                    </li>`;

                mainMenu.html(contentMenu + contentMenuOther);
            }
        });
    }

    function renderPostBig() {
        $.ajax({
            type: "GET",
            url: API_ARTICLE,
            data: {
                offset: 0,
                limit: 3
            },
            dataType: "json",
            success: function (data) {
                let content = '';
                for (let i = 0; i < data.length; i++) {
                    content += /*html*/`<article class="post">${renderPost(data[i])}</article>`;
                }
                postsBig.html(content);
            }
        });
    }

    function renderPostSmall() {
        $.ajax({
            type: "GET",
            url: API_ARTICLE,
            data: {
                offset: 3,
                limit: 4
            },
            dataType: "json",
            success: function (data) {
                let content = '';
                for (let i = 0; i < data.length; i++) {
                    content += /*html*/`<article class="item post col-md-6">${renderPost(data[i])}</article>`;
                }
                postsSmall.html(content);
            }
        });
    }

    function renderPostTop() {
        $.ajax({
            type: "GET",
            url: API_ARTICLE + '/top-articles',
            data: {
                offset: 3,
                limit: 4
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                let content = '';
                for (let i = 0; i < data.length; i++) {
                    let thumb = data[i].thumb;
                    let title = data[i].title;
                    let description = data[i].description;
                    let pubDate = new Date(data[i].publish_date);
                    let linkDetail = 'detail.html?id=' + data[i].id;
                    let categoryName = data[i].category.name;
                    content += /*html */`
                    <div class="swiper-slide">
                        <figure class="overlay caption caption-overlay rounded mb-0">
                            <a href="${linkDetail}"> 
                                <img src="${thumb}" alt="${title}" />
                            </a>
                            <figcaption>
                                <span class="badge badge-lg bg-white text-uppercase mb-3">${categoryName}</span>
                                <h2 class="post-title h3 mt-1 mb-3"><a href="./blog-post.html">${title}</a></h2>
                                <ul class="post-meta text-white mb-0">
                                    <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${pubDate}</span></li>
                                    <li class="post-comments">
                                        <a href="#"><i class="uil uil-comment"></i>3<span>Comments</span></a>
                                    </li>
                                </ul>
                            </figcaption>
                        </figure>
                    </div>
                    `;
                }
                postsTop.html(content);
                theme.swiperSlider();
            }
        });
    }

    function renderPost(item) {
        let thumb = item.thumb;
        let title = item.title;
        let description = item.description;
        let pubDate = new Date(item.publish_date);
        let linkDetail = 'detail.html?id=' + item.id;
        let categoryName = item.category.name;
        pubDate = pubDate.toLocaleDateString('vi-VI');

        let allComments = JSON.parse(localStorage.getItem('comments')) || [];
        let comments = allComments.filter(function (element) {
            return element.article_id == item.id;
        });

        let heart = arrLiked.includes(item.id) ? 'heart_full.png' : 'heart_empty.png';

        return /*html*/`
            <div class="card shadow-lg">
                <figure class="card-img-top overlay overlay-1">
                    <a href="${linkDetail}"><img src="${thumb}" alt="" /></a>
                    <figcaption><h5 class="from-top mb-0">Read More</h5></figcaption>
                </figure>
                <div class="card-body">
                    <div class="post-header">
                        <div class="post-category">
                            <a href="category.html?id=${item.category_id}" class="hover link-grape" rel="category">${categoryName}</a>
                        </div>
                        <h2 class="post-title mt-1 mb-0">
                            <a class="link-navy" href="${linkDetail}">${title}</a>
                        </h2>
                    </div>
                    <div class="post-content">
                        <p>${description}</p>
                    </div>
                </div>
                <div class="card-footer">
                    <ul class="post-meta d-flex mb-0">
                        <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${pubDate}</span></li>
                        <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${comments.length}<span>
                                    Comments</span></a></li>
                        <li class="post-likes ms-auto"><img class="zvn-btn-like" data-id="${item.id}" src="assets/img/${heart}" alt=""></li>
                    </ul>
                </div>
            </div>`;
    }
});