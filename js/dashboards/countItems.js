import { submissionsEndpoint } from "../constants.js"
import { GetCookie } from "../setCookie.js"

const inReviewCount = document.querySelectorAll(".inReviewCount")
const newSubmissionsCount = document.querySelectorAll(".newSubmissionsCount")
const acceptedCount = document.querySelectorAll(".acceptedCount")
const publishedCount = document.querySelectorAll(".publishedCount")
const reviewsCount = document.querySelectorAll(".reviewsCount")
const coAuthoredCount = document.querySelectorAll(".coAuthoredCount")
const submittedReviewsCount = document.querySelectorAll(".submittedReviewsCount")

const user = GetCookie("user")

if(user){
if(inReviewCount){
    // GEt the REviesCount from database 
    fetch(`${submissionsEndpoint}/backend/accounts/InReviewCount.php?u_id=${user}`)
    .then(res=>res.json())
    .then(data=> {
        inReviewCount.forEach(count =>{
            count.innerText = data.count
        })
    })
}

if(newSubmissionsCount){
    fetch(`${submissionsEndpoint}/backend/accounts/newSubmissionsCount.php?u_id=${user}`)
    .then(res=>res.json())
    .then(data=>{
        newSubmissionsCount.forEach(count =>{
            count.innerText = data.count
        })
    })
}

if(acceptedCount){
    fetch(`${submissionsEndpoint}/backend/accounts/acceptedCount.php?u_id=${user}`)
    .then(res=>res.json())
    .then(data=>{
        acceptedCount.forEach(count =>{
            count.innerText = data.count
        })
    })
}

if(publishedCount){
    fetch(`${submissionsEndpoint}/backend/accounts/publishedCount.php?u_id=${user}`)
    .then(res=>res.json())
    .then(data=>{
        publishedCount.forEach(count =>{
            count.innerText = data.count
        })
    })
}

if(reviewsCount){
    fetch(`${submissionsEndpoint}/backend/accounts/reviewsCount.php?u_id=${user}`)
    .then(res=>res.json())
    .then(data=>{
        reviewsCount.forEach(count =>{
            count.innerText = data.count
        })
    })
}

if(coAuthoredCount){
    fetch(`${submissionsEndpoint}/backend/accounts/coAuthoredCount.php?u_id=${user}`)
    .then(res=>res.json())
    .then(data=>{
        coAuthoredCount.forEach(count =>{
            count.innerText = data.count
        })
    })
}

if(submittedReviewsCount){
    fetch(`${submissionsEndpoint}/backend/accounts/submittedReviewsCount.php?u_id=${user}`)
    .then(res=>res.json())
    .then(data=>{
        submittedReviewsCount.forEach(count =>{
            count.innerText = data.count
        })
    })
}

}