import { ENDPOINT, parentDirectoryName } from "../constants.js"
import { DeleteCookie, GetCookie } from "../setCookies.js"


const FileUploadForm = document.getElementById("file_uploadForm")
const TransactionDetails = GetCookie('t_rd')
if(TransactionDetails){

FileUploadForm.addEventListener("submit", function(e){
    e.preventDefault();
    
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("transaction_details", TransactionDetails);

    fetch(`${ENDPOINT}/uploadReceipt.php`, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            console.log(data.message);
            alert(data.message)
            window.location.href = `${parentDirectoryName}/user/dashbord.html`
            DeleteCookie("t_rd")
        } else {
            alert(data.message);
            window.location.href = `${parentDirectoryName}/user/dashbord.html`;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Could Not Upload File");
    });
})
}else{
    window.location.href = `${parentDirectoryName}/user/deposit.html`
}