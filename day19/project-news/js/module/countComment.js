export default function countComment(commentAll, idArticle) {
    let count = 2
    commentAll.filter(comment => {
        if(comment.id == idArticle){
            count += 1
        }
    })
    return count
}