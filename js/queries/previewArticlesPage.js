import { parentDirectoryName } from "../constants.js";
import { getSupplement } from "./getSupplements.js";
import { ViewItem } from "./viewsCount.js";

// Create a URLSearchParams object from the current page's query string
const searchParams = new URLSearchParams(window.location.search);

// Log all parameters
// for (const [key, value] of searchParams.entries()) {
//     console.log(`Key: ${key}, Value: ${value}`);
// }
// Check if a parameter exists in the search query
const hasParamSupplementId = searchParams.has('sid');
const hasParmsSupplementTitle = searchParams.has("title")

if(hasParamSupplementId && hasParmsSupplementTitle){
    const SearchId = searchParams.get("sid")
    const SearchTitle = searchParams.get("title")
    ViewItem(SearchId)
    getSupplement(SearchId, SearchTitle)
}else{
    // window.location.href = `https://asfirj.org`
}



