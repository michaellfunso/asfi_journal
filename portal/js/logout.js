import { parentDirectoryName } from "../../js/constants";
import { DeleteCookie, GetCookie } from "../../js/setCookie";

const User = GetCookie("user")
if(User){
DeleteCookie("user")
window.location.href = `${parentDirectoryName}portal/login`
}else{
    window.location.href = `${parentDirectoryName}portal/login`
}