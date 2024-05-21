import { EndPoint } from "../constants.js";
import { GetCookie, SetCookies } from "../setCookie.js";

 function ViewItem(ItemId){
    const AlreadyViewed = GetCookie("viewedItem")
    if(AlreadyViewed === ItemId){
    }else{
        SetCookies("viewedItem", ItemId, 100)
        fetch(`${EndPoint}/viewItem.php?item_id=${ItemId}`, {
            method:"GET"
        }).then(res =>res.json())
        .then(data=>{
            console.log(data.message)
        })
    }

}



export {
    ViewItem
}