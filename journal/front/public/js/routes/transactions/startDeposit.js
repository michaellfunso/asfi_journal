import { parentDirectoryName } from "../constants.js";
import { GetCookie, SetCookies, hoursToKeep } from "../setCookies.js"

const DepositForm = document.getElementById("depositForm")
const userID = GetCookie("u_id")

const Amount = document.getElementById("amount");

DepositForm.addEventListener("submit", function(e){
    e.preventDefault()
    const TransacttionDetails = {
        user_id : userID,
        amount: Amount.value,
        type :"depositWalletCredit",
    }
    SetCookies("t_rd", JSON.stringify(TransacttionDetails), hoursToKeep)
    window.location.href = `${parentDirectoryName}/user/deposit/manual.html`
})
