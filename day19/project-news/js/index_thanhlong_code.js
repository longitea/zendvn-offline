$(document).ready(function () {

    // -=============== MENU ===============-
    $.ajax({
        type: "GET",
        url: "http://apiforlearning.zendvn.com/api/categories_news",
        data: {
            // vị trí bắt đầu lấy
            offset: 0,
            limit: 20
        },
        dataType: "json",
        success: function (response) {
            // Sử dụng map để render 5 category
            let newItem = response.slice(0, 5).map(element => (`
                <li class="nav-item">
                    <a class="nav-link" href=${element.link}>${element.name}</a>
                </li>
            `)).join('')

            // render thêm Sub Category
            let subNewItem = response.slice(5, response.length).map(element => (`
            <li class="nav-item"><a class="dropdown-item" href=${element.link}>${element.name}</a>
            </li>
            `)).join('')

            // thêm 1 tí css cho sub-menu
            subNewItem = `
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Danh mục
                khác</a>
            <ul class="dropdown-menu">
                ${subNewItem}
            </ul>
            </li>
            `

            $('.main-menu').html(newItem + subNewItem)

        }

    });


    // -=============== ARTICLE LARGE ===============-
    $.ajax({
        type: "GET",
        url: "http://apiforlearning.zendvn.com/api/articles?offset=0&limit=3&sort_by=id&sort_dir=desc",
        data: 'data',
        dataType: "json",
        success: function (response) {
            console.log(response);
            const articlePost = $('#article-post')

            let articleItem = response.map(element => (

                `
                    <article class="post">
                        <div class="card shadow-lg">
                            <figure class="card-img-top overlay overlay-1"><a href="./detail.html"><img
                                        src=${element.thumb} alt="" /></a>
                                <figcaption>
                                    <h5 class="from-top mb-0">Read More</h5>
                                </figcaption>
                            </figure>
                            <div class="card-body">
                                <div class="post-header">
                                    <div class="post-category">
                                        <a href="javascript:void(0)" class="hover link-grape" rel="category">Architecture</a>
                                    </div>
                                    <!-- /.post-category -->
                                    <h2 class="post-title mt-1 mb-0"><a class="link-navy"
                                            href="detail.html">${element.title}</a>
                                    </h2>
                                </div>
                                <!-- /.post-header -->
                                <div class="post-content">
                                    <p>${element.description}</p>
                                </div>
                                <!-- /.post-content -->
                            </div>
                            <!--/.card-body -->
                            <div class="card-footer">
                                <ul class="post-meta d-flex mb-0">
                                    <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${element.publish_date}</span></li>
                                    <li class="post-author"><a href="#"><i class="uil uil-user"></i><span>By
                                                Sandbox</span></a></li>
                                    <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>3<span>
                                                Comments</span></a></li>
                                    <li class="post-likes ms-auto"><a href="#"><i
                                                class="uil uil-heart-alt"></i>3</a></li>
                                </ul>
                                <!-- /.post-meta -->
                            </div>
                            <!-- /.card-footer -->
                        </div>
                    </article>

                
            `
            ))

            $('#main-article-post').html(articleItem)





        }
    });


    // -=============== ARTICLE MEDIUM ===============-
    $.ajax({
        type: "GET",
        url: "http://apiforlearning.zendvn.com/api/articles?offset=0&limit=3&sort_by=id&sort_dir=desc",
        data: 'data',
        dataType: "json",
        success: function (response) {
            console.log(response);
            const articlePost = $('#article-post')

            let articleItem = response.map(element => (
                
                `
                    
                `
            ))
            $('#main-article-post').html(articleItem)
        }
    });
});






