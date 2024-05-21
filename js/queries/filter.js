import { EndPoint } from "../constants.js"
import { UpdateTemporaryArticles } from "../temporaryArticleList.js"

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
    const databody = {
        type: TypeContainer.value
    }
    fetch(`${EndPoint}/filterbyType.php`, {
        method:"POST",
        body: databody,
        headers:{
            "Content-type": "application/JSON"
        }
    }).then(res=>res.json())
    .then(data =>{
        if(data.status === "success"){
            const articlesList = data.articlesList
            UpdateTemporaryArticles(articlesList)
        }else{
            alert(data.message)
        }
    })
})
}

if(authorsOptions){
authorsOptions.addEventListener("change", function(){
    const databody = {
        author: authorsOptions.value
    }
    fetch(`${EndPoint}/filterByAuthors.php`, {
        method:"POST",
        body: databody,
        headers:{
            "Content-type": "application/JSON"
        }
    }).then(res => res.json())
    .then(data => {
       if(data.status === "success"){
            const articlesList = data.articlesList
            UpdateTemporaryArticles(articlesList)
        }else{
            alert(data.message)
    }
})
})
}

if(search){
search.addEventListener("submit", function(){
    const databody = {
        k: searchField.value,
    }
    if(authorsOptions.value !== ""){

        databody.push({
            author: authorsOptions.value
        })
    }

    if(TypeContainer.value !== ""){
        databody.push({
            type:TypeContainer.value
        })
    }

    fetch(`${EndPoint}/filterArticles.php`, {
        method:"POST",
        body: databody,
        headers:{
            "Content-type": "application/JSON"
        }
    }).then(res=> res.json())
    .then(data =>{
        if(data.status === "success"){
           const Articles = data.articlesList
           UpdateTemporaryArticles(Articles) 
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