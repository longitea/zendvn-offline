import { API_CATEGORY } from "../Contant/GetAPI.js";

// lấy vị trí muốn render vào dom từ props
export default function renderMenu(mainMenu) {
    $.ajax({
        type: "GET",
        url: API_CATEGORY,
        data: {
            offset: 0,
            limit: 20
        },
        dataType: "json",
        success: function (data) {
            let contentMenu = '';
            let contentMenuOther = '';

            for (let i = 0; i < data.length; i++) {
                if (i < 4) {
                    // Cách 1 duyệt mảng + gán chuỗi
                    // contentMenu += /*html*/`
                    //     <li class="nav-item">
                    //         <a class="nav-link" href="category.html">${name}</a>
                    //     </li>`;

                    // Cách 2: gọi component
                    contentMenu += RenderMenuDetail("nav-link", data[i])

                } else {

                    contentMenuOther += RenderMenuDetail("dropdown-item", data[i])

                }
            }

            contentMenuOther = /*html*/`
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Danh mục khác</a>
                            <ul class="dropdown-menu">
                                ${contentMenuOther}
                            </ul>
                        </li>`;

            mainMenu.html(contentMenu + contentMenuOther);
        }
    });
}


function RenderMenuDetail(className, item) {
    let categoryName = item.name
    // gán id cho url
    let linkDetail = `category.html?idCategory=${item.id}`


    return (`
                <li class="nav-item">
                    <a class=${className} href="${linkDetail}">${categoryName}</a>
                </li>
            `)
}







