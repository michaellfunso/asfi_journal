import { ENDPOINT, parentDirectoryName } from "./constants.js";
import { DeleteCookie } from "./setCookies.js";

DeleteCookie("u_id")
DeleteCookie("userData")
// DeleteCookie("PHPSESSID")


fetch(`${ENDPOINT}/logout.php`, {
    method:"GET"
}).then(res => res.json())
.then(data=>{
    window.location.href = `${parentDirectoryName}/user/login.html`
})