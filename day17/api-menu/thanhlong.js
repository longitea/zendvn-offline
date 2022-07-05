const urlApi = 'http://apiforlearning.zendvn.com/api/categories_news'

const listNewsBlock = document.querySelector('#list-news')

// start
function start() {

    getNews(renderNewsCategory);

}

// ngày mai xem video về fetch ngay đây là ok
function getNews(callback) {
    // sử dụng fetch để lấy api
    fetch(urlApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

const renderNewsCategory = courses => {
    // thêm 5 category đầu tiên
    const newsItem = courses.slice(0, 5).map(element => `
        <li class="nav-item">
            <a class="nav-link active" href=${element.link}>${element.name}</a>
        </li>
    
    `)

    newsItem.push(`
    <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            Danh mục khác
            </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown" id="sub-list-news">
            <li><a class="dropdown-item" href="https://vnexpress.net/rss/the-gioi.rss">Thế Giới</a></li>
            <li><a class="dropdown-item" href="https://vnexpress.net/rss/the-gioi.rss">Thế Giới</a></li>
        </ul>
    </li>
    `)

    listNewsBlock.innerHTML = newsItem.join('')

    // thêm sub-category-news
    const subNewItem = courses.slice(5, courses.length).map(element => `
    <li><a class="dropdown-item" href=${element.link}>${element.name}</a></li>
    `)
    $('#sub-list-news').html(subNewItem)





}   
start();
