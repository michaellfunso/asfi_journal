import { ENDPOINT } from "../constants";
import { GetCookie } from "../setCookies";

const ADMIN = GetCookie("a_id");
const TransactionsContainer = document.getElementById('transactiosn_container')



if(ADMIN){
    function approve(transactionID, userID){
        const approvalData = {
            userID : userID,
            transactionID: transactionID
        }

        fetch(`${ENDPOINT}/admin/approveFunding.php`, {
            mehtod:"POST",
            body: JSON.stringify(approvalData),
            headers:{
                "Content-type" : "application/JSON"
            }
        }).then(res=> res.json())
        .then(data => {
            alert(data.message)
        })
    }
    function reject(transactionID, userID){
        const rejectionData = {
            userID : userID,
            transactionID: transactionID
        }

        fetch(`${ENDPOINT}/admin/rejectTransaction.php`, {
            mehtod:"POST",
            body: JSON.stringify(rejectionData),
            headers:{
                "Content-type" : "application/JSON"
            }
        }).then(res=> res.json())
        .then(data => {
            alert(data.message)
        })
    }




    fetch(`${ENDPOINT}/admin/transactionList.php?a_id=${ADMIN}`, {
        method: "GET"
    }).then(res => res.json())
    .then(data =>{
        const Transactions = data.transactionsList

            if(Transactions.length > 0){
                Transactions.forEach(transaction => {
                    const transactionID = transaction.transactionId
                    const transactionDetails = transaction.transactionDetails

                    const username = transactionDetails.username
                    const transactionType = transactionDetails.type
                    const status = transactionDetails.status
                    const file = transactionDetails.fileURL
                
    
                    const wallet = (transactionType === "depositWithdrawal" || transactionType === "deposit" || transactionType === "depositWalletCredit") ? "Deposit Wallet" : "Interest Wallet";
    
                    const TransactionDescription = (transactionType === "deposit" || "interestDeposit" || "depositWalletCredit") ? "Credit" : "Debit";

                    const ACTION_BUTTON = (status === "approved") ? `<button onClick=approve(${transactionID}, ${username})>Approve</button><button onClick=reject(${transactionID}, ${username})>Approve</button>` : `<button>View File</button>`
    
                    TransactionsContainer.innerHTML += `
                    <tr>
                    <td>${formatTimestamp(transactionDetails.date)}</td>
                    <td>${transactionID}</td>
                    <td>${username}</td>
                    <td>$ ${transactionDetails.amount} USD</td>
                    <td>$ ${wallet} USD</td>
                    <td>${TransactionDescription}</td>
                    <td>${status}</td>
                    <td><a href=${file}>View File</a></td>
                    <td>${ACTION_BUTTON}</td>
                    </tr>`
                });
            }else{
                TransactionsContainer.innerHTML = `
                <tr>
                <td colspan="100%" class="text-center">
                    No Transaction Found</td>
            </tr>`
            }


    })
}