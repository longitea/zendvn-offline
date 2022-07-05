$(document).ready(function () {
    $.ajax({
        data: {
            offset: 0,
            limit: 15
        },
        url: "http://apiforlearning.zendvn.com/api/categories_news",
        type: "GET",
        dataType: "json",
        success: function (data) {
        }
    });
});
