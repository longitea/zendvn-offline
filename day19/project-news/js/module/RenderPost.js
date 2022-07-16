import countComment from "./countComment.js";

export function renderPostBig(postsBig, API_URL, commentAll) {
    $.ajax({
        type: "GET",
        url: API_URL ,
        data: {
            offset: 0,
            limit: 3
        },
        dataType: "json",
        success: function (data) {
            let content = '';
            for (let i = 0; i < data.length; i++) {
                // gọi component renderPost -> trả về DOM element
                content += /*html*/`<article class="post"> ${renderPost(data[i], commentAll)}</article>`;
            }
            postsBig.html(content);
        }
    });
}

export function renderPostSmall(postSmall, API_URL, commentAll) {
    $.ajax({
        type: "GET",
        url: API_URL ,
        data: {
            offset: 3,
            limit: 4
        },
        dataType: "json",
        success: function (data) {

            let content = '';
            for (let i = 0; i < data.length; i++) {
                content += /*html*/`<article class="item post col-md-6"> ${renderPost(data[i], commentAll)} </article> `;
            }
            postSmall.html(content);
        }
    });

}

export default function renderPost(item, commentAll) {
    let thumb = item.thumb;
    let title = item.title;
    let description = item.description;
    let pubDate = new Date(item.publish_date);
    pubDate = pubDate.toLocaleDateString('vi-VI');
    let linkDetail = `detail.html?idArticle=${item.id}`

    const count = countComment(commentAll, item.id)

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
                        <li class="post-comments"><a href="#"><i  class="uil uil-comment"></i>${count}<span style='color:blue'>
                                    Comments</span></a></li>
                        <li class="post-likes ms-auto"><a href="#"><i
                                    class="uil uil-heart-alt"></i>3</a></li>
                    </ul>
                </div>
            </div>
            `
}

