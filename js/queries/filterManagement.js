import { EndPoint } from "../constants.js"
import { UpdateManageArticles } from "../manageArticleList.js"
import { ArticlePage } from "./allArticles.js"

const TypeContainer = document.getElementById("typeOption")
const authorsOptions = document.getElementById("authorsOption")
const search = document.getElementById("searchArticle")
const searchField = document.getElementById("search")


async function CreateAuthorsOptions(){

    // Get all the authors on the system 
  return  fetch(`${EndPoint}/authors.php`, {
        method:"POST"
    }).then(res => res.json())
    .then(data=>{
      return data.authors 
        
    })

}

if(TypeContainer){
TypeContainer.addEventListener("change", function(){
    if(TypeContainer.value !== "all"){

    const databody = {
        type: TypeContainer.value
    }
    fetch(`${EndPoint}/filterbyType.php?type=${TypeContainer.value}`, {
        method:"GET",
       
    }).then(res=>res.json())
    .then(data =>{
        if(data.status === "success"){
            const articlesList = data.articlesList
            UpdateManageArticles(articlesList)
        }else{
            alert(data.message)
        }
    })
}else{
    ArticlePage(1)
}

})

}

if(authorsOptions){
authorsOptions.addEventListener("change", function(){
    if(authorsOptions.value !== "all"){


    const databody = {
        author: authorsOptions.value
    }
    fetch(`${EndPoint}/filterByAuthors.php?author=${authorsOptions.value}`, {
        method:"GET",
        // body: JSON.stringify(databody),
        // headers:{
        //     "Content-type": "application/JSON"
        // }
    }).then(res => res.json())
    .then(data => {
       if(data.status === "success"){
            const articlesList = data.articlesList
        UpdateManageArticles(articlesList)
        }else{
            alert(data.message)
    }
})
}else{
    ArticlePage(1)
}
})
}

if(search){
search.addEventListener("submit", function(e){
    e.preventDefault()

    const databody = {
        k: searchField.value,
    }


    fetch(`${EndPoint}/filterArticles.php?k=${searchField.value}`, {
        method:"GET",
        // body: JSON.stringify(databody),
        // headers:{
        //     "Content-type": "application/JSON"
        // }
    }).then(res=> res.json())
    .then(data =>{
        if(data.status === "success"){
           const Articles = data.articlesList
           UpdateManageArticles(Articles)
        }else{
            alert(data.message)
        }
    })
})

}
async function CreateTypeOptions(){
    return  fetch(`${EndPoint}/articleType.php`, {
        method:"POST"
    }).then(res => res.json())
    .then(data=>{
    //   return data.authors 
    const TYpes = data.types 
    TYpes.forEach(type => {
        if(TypeContainer){
            TypeContainer.innerHTML += `<option value="${type}">${type}</option>`
        }
    });
        
    })
}


export {
    CreateAuthorsOptions,
    CreateTypeOptions
}