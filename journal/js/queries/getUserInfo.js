import { EndPoint } from "../constants.js"

const GetUserInfo = async function (username) {
    // if(username){
        let Data
       await fetch(`${EndPoint}/userinfo.php?username=${username}`, {
            method: "GET",
        }).then(res => res.json())
        .then(data => {
            // console.log("DREd", data)
            Data = JSON.stringify(data)
        })
        return Data

    // }else{
    //     return "HumanError"
    // }
    // return null
}

export {
    GetUserInfo,
}