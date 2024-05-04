import { EndPoint } from "../constants.js";
import { GetCookie, SetCookies } from "../setCookie.js";

 function DownloadItem(ItemId){
    const AlreadyDownloaded = GetCookie("DownloadedItem")
    if(AlreadyDownloaded === ItemId){
    }else{
        SetCookies("DownloadedItem", ItemId, 100)
        fetch(`${EndPoint}/downloadItem.php?item_id=${ItemId}`, {
            method:"GET"
        }).then(res =>res.json())
        .then(data=>{
            console.log(data.message)
        })
    }

}



export {
    DownloadItem
}