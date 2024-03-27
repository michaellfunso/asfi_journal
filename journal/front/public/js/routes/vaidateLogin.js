import { ENDPOINT, parentDirectoryName } from "./constants.js";
import { GetCookie } from "./setCookies.js";

const userID = GetCookie("u_id")
let userEmail, userFullname, userName, AccountBalance, InterestEarned

const accountBalance = document.getElementById("accountBalance")
const userTHUMB = document.querySelector(".user-info__thumb")
const InterestWallet = document.getElementById("interestWallet")
const emptyBalance = document.getElementById("emptyBalance")
const total_deposit_balance = document.getElementById("total_deposit_balance")


function ValidateLogin(){
    if(userID){
        fetch(`${ENDPOINT}/userData.php?uid=${userID}`, {
            method: "GET",
        }).then(res => res.json())
        .then(data => {
            if(data){
                if(data.status === "success"){
                    const user = data.user

                    userEmail = user.user_email
                    userFullname = user.user_fullname,
                    userName = user.username,
                    AccountBalance = new Number(user.account_balance)
                    InterestEarned  = user.totalInterest

                    user_fullnameContainer.innerText = `${userFullname}`
                    user_emailContainer.innerText = `${userEmail}`
                    userTHUMB.innerText = `${user.Intitials}`

                    if(accountBalance){

                        accountBalance.innerText = `${AccountBalance.toFixed(2)}`;
                  
                        InterestWallet.innerText = `${new Number(InterestEarned).toFixed(2)}`;                        
                    }
                    if(total_deposit_balance){
                        total_deposit_balance.innerText = `${AccountBalance.toFixed(2)} USD`
                    }
                    if(emptyBalance){
                        if(AccountBalance > 0){
                            emptyBalance.remove()
                        }
                    }
                    
                }else{
                    alert("An Error Occured")
                    console.log(data.message)
                }
            }else{
                console.log("NO DATA AVAILABLE")
            }
        })
    }else{
        window.location.href = `${parentDirectoryName}/user/login.html`
    }
}


export {
    ValidateLogin
}