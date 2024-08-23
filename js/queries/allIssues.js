import { EndPoint, GetParameters } from "../constants.js"
import { formatTimestamp } from "../formatDate.js"
import { getURL } from "../getURL.js"
import { UpdateIssues } from "../updateIssuesList.js"
// import { UpdateIssues } from "../temporaryArticleList.js"
import { articlesNavigation } from "./articlesNavigation.js"

const search = document.getElementById("search")
const searchArticle = document.getElementById("searchArticle")

let Limit


const url = getURL()

if (url == "/asfi_journal/" || url == "/") {
    Limit = 6
} else {
    Limit = 10;
}
const currentLocationURL = window.location.href

const newpage = GetParameters(currentLocationURL).get("page");

if (newpage) {
    ArticlePage(newpage)
} else {
    ArticlePage(1)
}
 
function ArticlePage(page) {
    fetch(`${EndPoint}/forIssues/allIssues.php?page=${page}&limit=${Limit}`, {
        method: "GET"
    }).then(res => res.json())
        .then(data => {
            if (data) {
                const ArticleLst = data.articlesList
                const currentPage = data.currentPage
                const totalPages = data.totalPages
                UpdateIssues(ArticleLst, currentPage, totalPages)
                articlesNavigation(new Number(totalPages), new Number(currentPage))

            } else {
                console.log("NO Data object")
            }
        })


}


export {
    ArticlePage
}