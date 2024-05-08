// const sliders = document.querySelectorAll(".item")

import { formatTimestamp } from "../../../js/formatDate.js"

const indicators = document.querySelector(".carousel-indicators")
const sliders = document.querySelector(".item:first-child")

const dateList = document.querySelectorAll(".articleDateContainer")

sliders.classList += ' active'
console.log(sliders.classList)
// for(i =0; i < sliders.length; i++ ){
   
//     indicators.innerHTML += `<li data-target="#myCarousel" data-slide-to="${i}"></li>`
// }


dateList.forEach(date=>{
    const inputValue = date.querySelector("input")
    console.log(inputValue.value)
    const newDate = formatTimestamp(inputValue.value)
    date.innerText = newDate
})

