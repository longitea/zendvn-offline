$(document).ready(function () {
    const API_URL = 'http://apiforlearning.zendvn.com/api/';
    const API_CATEGORY = `${API_URL}categories_news`;
    const API_ARTICLE = `${API_URL}articles/`;

    let title = $('#post_title');
    let date = $('#post_date');
    let description = $('#post_description');
    let content = $('#post_content');
    let thumb = $('#post_thumb');
    let postTotalComment = $('#post_total_comment');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    if (!id) window.location.href = 'index.html';

    $.ajax({
        type: "GET",
        url: API_ARTICLE + id,
        dataType: "json",
        success: function (data) {
            console.log(data);
            title.text(data.title);
            let pubDate = new Date(data.publish_date);
            pubDate = pubDate.toLocaleDateString('vi-VI');
            date.text(pubDate);
            description.html(data.description);
            content.html(data.content);
            thumb.css('background-image', `url(${data.thumb})`);
        }
    });

    // COMMENT
    let allComments = JSON.parse(localStorage.getItem('comments')) || [];
    let comments = allComments.filter(function (element) {
        return element.article_id === id;
    });
    let inputCmtName = $('#input-comment-name');
    let inputCmtContent = $('#input-comment-content');
    let areaComment = $('#singlecomments');
    let commentsCount = $('#comments-count');
    let numberComment = comments.length;
    postTotalComment.text(numberComment);
    commentsCount.html(numberComment);

    // render list comment
    let commentsContent = '';
    for (let i = 0; i < comments.length; i++) {
        commentsContent += renderCommentItem(comments[i]);
    }
    areaComment.html(commentsContent);


    $('#btn-submit-comment').click(function (e) { 
        e.preventDefault();
        // create new comment
        let newComment = {
            name: inputCmtName.val(),
            content: inputCmtContent.val(),
            date: new Date(),
            article_id: id
        };

        // save new comment
        allComments.unshift(newComment);
        localStorage.setItem('comments', JSON.stringify(allComments));

        // render new comment
        areaComment.prepend(renderCommentItem(newComment));

        // increase comment count
        numberComment++;
        commentsCount.html(numberComment);
        postTotalComment.text(numberComment);

        // clear input
        inputCmtName.val('');
        inputCmtContent.val('');
    });

    function renderCommentItem(item) {
        return /*html */`
        <li class="comment">
            <div class="comment-header d-md-flex align-items-center">
                <div class="d-flex align-items-center">
                    <figure class="user-avatar">
                        <img class="rounded-circle" alt="" src="./assets/img/avatars/u1.jpg" />
                    </figure>
                    <div>
                        <h6 class="comment-author">
                            <a href="#" class="link-dark">${item.name}</a>
                        </h6>
                        <ul class="post-meta">
                            <li><i class="uil uil-calendar-alt"></i>${item.date}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <p>${item.content}</p>
        </li>
        `;
    }
});