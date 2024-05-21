import { ENDPOINT } from "../constants.js";
import { formatTimestamp } from "../formatDate.js";
import { GetCookie } from "../setCookies.js";
const transactionContainer = document.getElementById("transactionContainer");

 function getTransactions(user_id){

   
   fetch(`${ENDPOINT}/getTransactions.php?uid=${user_id}`, {
            method:"GET"
        }).then(res => res.json())
        .then(data => {
        const TransactionHistory = data.TransactionHistory

        if(TransactionHistory.length > 0){
            TransactionHistory.forEach(transaction => {
                const transactionID = transaction.transactionId
                const transactionDetails = transaction.transactionDetails

                const transactionType = transactionDetails.type
        
  

                const wallet = (transactionType === "depositWithdrawal" || transactionType === "deposit" || transactionType === "depositWalletCredit") ? "Deposit Wallet" : "Interest Wallet";

                const TransactionDescription = ( transactionType === "deposit" || "interestDeposit" || "depositWalletCredit") ? "Credit" : "Debit";


                transactionContainer.innerHTML += `
                <tr>
                <td>${formatTimestamp(transactionDetails.date)}</td>
                <td>${transactionID}</td>
                <td>$ ${transactionDetails.amount} USD</td>
                <td>${wallet}</td>
                <td>${TransactionDescription}</td>
                <td>${transactionDetails.status}</td>
                </tr>`
            });
        }else{
            transactionContainer.innerHTML = `
            <tr>
            <td colspan="100%" class="text-center">
                No Transaction Found</td>
        </tr>`
        }
      
        
               
        })

     
}

export {
    getTransactions
}