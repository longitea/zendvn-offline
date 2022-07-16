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
    let detailCategory = $('#detail-category')
    let countComment = $('#show-comment')

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
                console.log(response);
                detailTitle.html(response.title)
                detailTitlePublishDate.html(response.publish_date)
                detailDescription.html(response.description)
                // detailThumb).attr('data-image-src', response.thumb)
                detailThumb.css('background-image', 'url(' + response.thumb + ')')
                detailSmallThumb.attr('src', response.thumb)
                detailContent.html(response.content)

                let linkCate = `category.html?idCategory=${response.category_id}`
                detailCategory.html(`
                    <a href=${linkCate} class="text-reset" rel="category">${response.category.name}</a>
                `)
            }
        });
    }

    function renderComment(objectComment) {
        $('#singlecomments').prepend(`
            <li class="comment">
                <div class="comment-header d-md-flex align-items-center">
                    <div class="d-flex align-items-center">
                        <figure class="user-avatar"><img class="rounded-circle" alt="" src="./assets/img/avatars/u1.jpg"></figure>
                        <div>
                            <h6 class="comment-author"><a href="#" class="link-dark">${objectComment.name}</a></h6>
                            <ul class="post-meta">
                                <li><i class="uil uil-calendar-alt"></i>${objectComment.date}</li>
                            </ul>
                            <!-- /.post-meta -->
                        </div>
                        <!-- /div -->
                    </div>
                    <!-- /div -->
                    <div class="mt-3 mt-md-0 ms-auto">
                        <a href="#" class="btn btn-soft-ash btn-sm rounded-pill btn-icon btn-icon-start mb-0"><i class="uil uil-comments"></i> Reply</a>
                    </div>
                    <!-- /div -->
                </div>
                <!-- /.comment-header -->
                <p>${objectComment.comment}</p>
            </li>
        `)
    }

    // -============================== Lấy Cmt từ Local -> render -> UI  ==============================-
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idArticle = urlParams.get('idArticle')

    // 1. Lưu tất cả cmnt vào 1 array chung
    let commentAll = JSON.parse(localStorage.getItem("comments")) || []

    // 2. Khi vừa vào trang lọc ra cmt nào trùng với id bài viết -> lưu vào array second
    let comments = commentAll.filter((ev => ev.id === idArticle))

    // 3. Khi vừa vào trang render ra các cmt lấy từ array second
    comments.map(ev => {
        renderComment(ev)
    })


    // -============================== Xử lý sự kiện add new comment  ==============================-

    let inputCMTName = $('#c-name')
    let inputCMTContent = $('textarea')
    let submitComment = $('#submit-comment')

    //  đếm số lượng cmt
    let countCMT = $('#count-comment')
    countCMT.text(comments.length + 2 + ' Comments')
    countComment.html(`${comments.length + 2 } <span style='color:yellow'>Comments</span> `)

    submitComment.on('click', ev => {
        ev.preventDefault()
        // create Object comment
        const newComment = {
            name: inputCMTName.val(),
            comment: inputCMTContent.val(),
            date: new Date(),
            id: idArticle
        }

        // save new comment -> localStorage
        commentAll.push(newComment)
        localStorage.setItem('comments', JSON.stringify(commentAll))

        // render new comment -> UI
        renderComment(newComment)

        // count new comment
        countCMT.text(comments.length + 3 + ' Comments')

        inputCMTName.val('')
        inputCMTContent.val('')

        countComment.html(`${comments.length + 3 } <span style='color:red'}>Comments</span> `)

    })
});
