import { parentDirectoryName } from "../../js/constants.js";
import { DeleteCookie, GetCookie } from "../../js/setCookie.js";

const User = GetCookie("user")
if(User){
DeleteCookie("user")
window.location.href = `${parentDirectoryName}portal/login`
}else{
    window.location.href = `${parentDirectoryName}portal/login`
}