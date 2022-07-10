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

    
    // render Comment
    function renderComment(objectComment){
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


    //  get value input
    let comments = JSON.parse(localStorage.getItem("comments")) || []

    let inputCMTName = $('#c-name')
    let inputCMTContent = $('textarea')
    let submitComment = $('#submit-comment')
    let countCMT = $('#count-comment')

    // inputCommentName.on(ev  => arrayComment.name = {...arrayComment, name:ev.target.value })
    // inputCommentContent.on('change', ev =>  arrayComment.name = {...arrayComment, comment: ev.target.value })
    
    submitComment.on('click' , ev => {
        ev.preventDefault()
        
        // create new comment
        const newComment = {
            name: inputCMTName.val(),
            comment: inputCMTContent.val(),
            date: new Date(),
        }

        console.log(newComment)

        // save new comment
        comments.unshift(newComment)
        localStorage.setItem('comments', JSON.stringify(comments))

        // render new comment
        renderComment(newComment)

        // count new comment
        countCMT.text(comments.length + 2 + ' Comments')

        console.log(comments);

        
    })

});