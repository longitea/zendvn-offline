export default function callAjax(API_URL, dataOffset, locationDOM, customFuntion) {
    return $.ajax({
        type: "get",
        url: API_URL,
        data: dataOffset,
        dataType: "JSON",
        success: response => {
            const renderPostToDom = response.map(element => customFuntion(element)).join('');
            locationDOM.html(renderPostToDom)
        },
        error: error => {
            reject(error)
        }
    });
}