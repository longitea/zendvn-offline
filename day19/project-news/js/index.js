$(document).ready(function () {
    const API_URL = 'http://apiforlearning.zendvn.com/api/';
    const API_CATEGORY = `${API_URL}categories_news`;
    const API_ARTICLE = `${API_URL}articles`;
    let mainMenu = $('.main_menu');
    let postsBig = $('#posts_big');
    let postsSmall = $('#posts_small');

    renderMenu();
    renderPostBig()
    renderPostSmall();

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
                console.log(data);
                let contentMenu = '';
                let contentMenuOther = '';

                for (let i = 0; i < data.length; i++) {
                    let link = data[i].link;
                    let name = data[i].name;
                    if (i < 4) {
                        contentMenu += /*html*/`
                            <li class="nav-item">
                                <a class="nav-link" href="category.html">${name}</a>
                            </li>`;
                    } else {
                        contentMenuOther += /*html*/`
                            <li class="nav-item">
                                <a class="dropdown-item" href="category.html">${name}</a>
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

    function renderPost(item) {
        let thumb = item.thumb;
        let title = item.title;
        let description = item.description;
        let pubDate = new Date(item.publish_date);
        pubDate = pubDate.toLocaleDateString('vi-VI');
        let linkDetail = `detail.html?id=${item.id}`

        return /*html*/`
            <div class="card shadow-lg">
                <figure class="card-img-top overlay overlay-1">
                    <a href=${linkDetail}><img src="${thumb}" alt="" /></a>
                    <figcaption><h5 class="from-top mb-0">Read More</h5></figcaption>
                </figure>
                <div class="card-body">
                    <div class="post-header">
                        <div class="post-category">
                            <a href="#" class="hover link-grape" rel="category">Architecture</a>
                        </div>
                        <h2 class="post-title mt-1 mb-0">
                            <a class="link-navy" href=${linkDetail}>${title}</a>
                        </h2>
                    </div>
                    <div class="post-content">
                        <p>${description}</p>
                    </div>
                </div>
                <div class="card-footer">
                    <ul class="post-meta d-flex mb-0">
                        <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${pubDate}</span></li>
                        <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>3<span>
                                    Comments</span></a></li>
                        <li class="post-likes ms-auto"><a href="#"><i
                                    class="uil uil-heart-alt"></i>3</a></li>
                    </ul>
                </div>
            </div>`;
    }
});