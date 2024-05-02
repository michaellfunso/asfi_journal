import { ENDPOINT, parentDirectoryName } from "./constants.js";
import { GetCookie } from "./setCookies.js";
import { getTransactions } from "./transactions/getTranscations.js";
import { ValidateLogin } from "./vaidateLogin.js";

ValidateLogin()
const uid = GetCookie("u_id")

const RecentTRansactions = getTransactions(uid)

GetBalancesAndHistory(uid)

function GetBalancesAndHistory(user_id){
    const PendingDeposit = document.getElementById("pending_deposit")
    const RejectedDeposti = document.getElementById("rejected_deposit")
    const LastTransaction = document.getElementById("last_transaction")
    // GET TOTAL PENDING Deposti TRANSACTIONS 
    fetch(`${ENDPOINT}/depositWallet/totalPendingDeposit.php?uid=${user_id}`, {
        method: "GET"
    }).then(res=>res.json())
    .then(data=>{
        PendingDeposit.innerText = `$ ${new Number(data.pending).toFixed(2)}`
    })
    // Get All rejected DEbit Transactions 
    fetch(`${ENDPOINT}/depositWallet/totalRejectedDeposit.php?uid=${user_id}`, {
        method:"GET"
    }).then(res => res.json())
    .then(data=> {
        RejectedDeposti.innerText = `$ ${new Number(data.rejected).toFixed(2)}`
    })
    // GEt Last DEposit Transaction 
    fetch(`${ENDPOINT}/depositWallet/lastTransaction.php?uid=${user_id}`, {
        method:"GET"
    }).then(res => res.json())
    .then(data =>{
        LastTransaction.innerText = `$ ${new Number(data.last).toFixed(2)}`
    })


    // GET REcent withdrawals
    // GEt pending withdrawals 
    const pendingWithdrawals = document.getElementById("pending_withdrawals")
    const rejectedWithdrawals = document.getElementById("rejected_withdrawals")
    const lastWithdrawal = document.getElementById("last_withdrawal")
    const TotalWithdrawals = document.getElementById("total_withdrawals")
    fetch(`${ENDPOINT}/withdrawals/pending.php?uid=${user_id}`,{
        method: "GET"
    }).then(res => res.json())
    .then(data => {
        pendingWithdrawals.innerText = `$ ${new Number(data.pending).toFixed(2)}`
    })

    // GET REJECTED Withdrawals 
    fetch(`${ENDPOINT}/withdrawals/rejected.php?uid=${user_id}`, {
        method:"GET"
    }).then(res => res.json())
    .then(data => {
        rejectedWithdrawals.innerText = `$ ${new Number(data.rejected).toFixed(2)}`
    })

    // GEt LAST WITHDRAWAL 
    fetch(`${ENDPOINT}/withdrawals/lastTransaction.php?uid=${user_id}`, {
        method :"GET"
    }).then(res=>res.json())
    .then(data=>{
        lastWithdrawal.innerText = `$ ${new Number(data.last).toFixed(2)} `
    })

    // GET TOTAL WIthdrawals 
    fetch(`${ENDPOINT}/withdrawals/total.php?uid=${user_id}`, {
        method:"GET"
    }).then(res=>res.json())
    .then(data=>{
        TotalWithdrawals.innerText = `$ ${new Number(data.total).toFixed(2)} USD`
    })



    // GET InTEREST DEPOSITS 
    const pendingInterest = document.getElementById("pending_interest")
    const compeletedInterest = document.getElementById("completed_interest")
    const lastIntesrest = document.getElementById("last_interest")

    // compelted  INTEREST 
    fetch(`${ENDPOINT}/interest/completed.php?uid=${user_id}`, {
        method:"GET"
    }).then(res => res.json())
    .then(data =>{
        compeletedInterest.innerText = `$ ${new Number(data.completed).toFixed(2)}`
    })
    // PENDING INTEREST 
    fetch(`${ENDPOINT}/interest/pending.php?uid=${user_id}`, {
        method: "GET"
    }).then(res=>res.json())
    .then(data=>{
        pendingInterest.innerText = `$ ${new Number(data.pending).toFixed(2)}`
    })
    // LAST TRANSACTION
    fetch(`${ENDPOINT}/interest/lastTransaction.php?uid=${user_id}`, {
        method :"GET"
    }).then(res => res.json())
    .then(data =>{
        lastIntesrest.innerText = `$ ${new Number(data.last).toFixed(2)}`
    })
}
