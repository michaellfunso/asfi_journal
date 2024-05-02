import { EndPoint } from "../constants.js"
import { formatTimestamp } from "../formatDate.js"
import { getURL } from "../getURL.js"
import { UpdateTemporaryArticles } from "../temporaryArticleList.js"


const search = document.getElementById("search")
const searchArticle = document.getElementById("searchArticle")
let Limit


const url = getURL()

if(url == "/asfi_journal/journal/" || url == "/journal/"){
    Limit = 2
}else{
    Limit = 10;
}


function ArticlePage(page){
    fetch(`${EndPoint}/allArticles.php?page=${page}&limit=${Limit}`,{
        method: "GET"
    }).then(res => res.json())
    .then(data =>{
        if(data){
        const ArticleLst = data.articlesList
        UpdateTemporaryArticles(ArticleLst)
    }else{
        console.log("NO Data object")
    }
    })

    if(searchArticle){
    searchArticle.addEventListener("click", function(){
        if(search.value !== "" && search.value !== " "){
            fetch(`${EndPoint}/allArticles.php?page=${page}&limit=${Limit}&k=${search.value}`,{
                method: "GET"
            }).then(res => res.json())
            .then(data =>{
                if(data){
                const ArticleLst = data.articlesList
                UpdateTemporaryArticles(ArticleLst)
            }else{
                console.log("NO Data object")
            }
            })
        }else{
            fetch(`${EndPoint}/allArticles.php?page=${page}&limit=${Limit}`,{
                method: "GET"
            }).then(res => res.json())
            .then(data =>{
                if(data){
                const ArticleLst = data.articlesList
                UpdateTemporaryArticles(ArticleLst)
            }else{
                console.log("NO Data object")
            }
            })
        }
    })
}

}




ArticlePage(1) 