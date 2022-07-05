const API_URL = 'http://apiforlearning.zendvn.com/api/';
const API_CATEGORY = `${API_URL}categories_news`;


const queryString = window.location.search; 
const urlParams = new URLSearchParams(queryString);
const idCategory = urlParams.get('idCategory')
const idArticle = urlParams.get('idArticle')

let API_CATEGORY_BY_ID,  API_ARTICLE_DETAIL_BY_ID
let API_ARTICLE_BY_ID = `${API_URL}articles`;
if(idCategory) {
    API_CATEGORY_BY_ID = `http://apiforlearning.zendvn.com/api/categories_news/${idCategory}`
    API_ARTICLE_BY_ID = `${API_CATEGORY}/${idCategory}/articles`
}

if ( idArticle ) {
    API_ARTICLE_DETAIL_BY_ID = `${API_URL}articles/${idArticle}`
}

export { API_CATEGORY, API_CATEGORY_BY_ID, API_ARTICLE_BY_ID, API_ARTICLE_DETAIL_BY_ID  }