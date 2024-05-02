import { ENDPOINT } from "./constants.js";

function SendEmail(formdata){
    const email = formdata.receiverEmail
    const subject = formdata.subject
    const year = formdata.Year
    const message = formdata.message
    const fullname = formdata.recipientName

    fetch(`https://asfischolar.org/api/email/${year}/${email}/${fullname}/${subject}`,{
        method: "GET",
    })
}


export {
    SendEmail,
}