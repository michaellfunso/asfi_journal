import { EndPoint } from "../constants.js"
import { UpdateManageArticles } from "../manageArticleList.js"
import { GetCookie } from "../setCookie.js"
import { CreateAuthorsOptionsManagement, CreateTypeOptionsManagement } from "./filterManagement.js"


const manageData = GetCookie("manageData")

if(!manageData){
    window.location.href = "../../manuscriptPortal/verify"
}

const search = document.getElementById("search")
const searchArticle = document.getElementById("searchArticle")

let Limit = 50


function ArticlePageManagement(page){
    fetch(`${EndPoint}/forIssues/allIssues.php?page=${page}&limit=${Limit}`,{
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
       await     fetch(`${EndPoint}/forIssues/allIssues.php?page=${page}&limit=${Limit}&k=${search.value}`,{
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
            fetch(`${EndPoint}/forIssues/allIssues.php?page=${page}&limit=${Limit}`,{
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
const authorsOptions = document.getElementById("authorsOptionManagement")

const authors = await CreateAuthorsOptionsManagement();

if(authorsOptions){
authors.forEach(author =>{
    authorsOptions.innerHTML += `<option value="${author}">${author}</option>`    
})
}

CreateTypeOptionsManagement()

// CreateTypeOptions()




ArticlePageManagement(1) 

// export{
//     ArticlePageManagement
// }