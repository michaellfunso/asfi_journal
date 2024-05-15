import { EndPoint } from "../constants.js"
import { formatTimestamp } from "../formatDate.js"
import { getURL } from "../getURL.js"
import { UpdateManageArticles } from "../manageArticleList.js"
import { GetCookie } from "../setCookie.js"

const manageData = GetCookie("manageData")

if(!manageData){
    window.location.href = "../../manuscriptPortal/verify"
}

const search = document.getElementById("search")
const searchArticle = document.getElementById("searchArticle")

let Limit


const url = getURL()

if(url == "/asfi_journal/" || url == "/"){
    Limit = 6
}else{
    Limit = 50;
}


function ArticlePage(page){
    fetch(`${EndPoint}/allArticles.php?page=${page}&limit=${Limit}`,{
        method: "GET"
    }).then(res => res.json())
    .then(data =>{
        if(data){
        const ArticleLst = data.articlesList
        UpdateManageArticles(ArticleLst)
   
    }else{
        console.log("NO Data object")
    }
    })


    // Search Articles 
    if(searchArticle){
    searchArticle.addEventListener("submit", async function(e){
        e.preventDefault()
        if(search.value !== "" && search.value !== " "){
       await     fetch(`${EndPoint}/allArticles.php?page=${page}&limit=${Limit}&k=${search.value}`,{
                method: "GET"
            }).then(res => res.json())
            .then(data =>{
                if(data){
                const ArticleLst = data.articlesList
                UpdateManageArticles(ArticleLst)
           

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
                UpdateManageArticles(ArticleLst)
     
            }else{
                console.log("NO Data object")
            }
            })
        }
    })
}

}





ArticlePage(1) 