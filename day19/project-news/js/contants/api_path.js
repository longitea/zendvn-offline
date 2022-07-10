const queryString = window.location.search; 
const urlParams = new URLSearchParams(queryString);
const idCategory = urlParams.get('idCategory')
const idArticle = urlParams.get('idArticle')

// -=============== API HOST ===============-
const API_URL = 'http://apiforlearning.zendvn.com/api/';
export const API_CATEGORY = `${API_URL}categories_news`;
export const API_ARTICLE = `${API_URL}articles`;

const GET_API_BY_ID = (url, id) => {
    return `${url}/${id}`
}


// -=============== PAGE ===============-
// 1. Category.html
export const API_CATEGORY_DETAIL_BY_ID = GET_API_BY_ID(API_CATEGORY, idCategory)

// 2. Detail.html
export const API_ARTICLE_DETAIL_BY_ID = GET_API_BY_ID(API_ARTICLE, idArticle)

// 3. Render Post API
export const API_ARTICLE_BY_ID_CATEGORY =  GET_API_BY_ID(API_CATEGORY, idCategory) + '/articles'


export default {}


/**
Danh sách các api cần truy xuất
1. Category.html : Lấy title để render. dựa trên ID
http://apiforlearning.zendvn.com/api/categories_news/1


2. ARTICLE DETAIL BY ID:
http://apiforlearning.zendvn.com/api/articles/1


3. Lấy danh sách bài viết dựa trên id category
http://apiforlearning.zendvn.com/api/categories_news/1/articles?


4. Render Menu Category List:
http://apiforlearning.zendvn.com/api/categories_news

*/

