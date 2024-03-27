let ENDPOINT
let parentDirectoryName


function GetParameters(href){
// Get the URL string
const urlString = href;

// Create a URL object
const url = new URL(urlString);

// Get the search parameters from the URL
const searchParams = new URLSearchParams(url.search);
return searchParams

}

// Get the current URL pathname
const pathname = window.location.pathname;
const origin = window.location.origin

// Split the pathname by slashes to get the individual segments
const segments = pathname.split('/');

// Get the parent directory name (second to last segment)
// const parentDirectoryName = segments[segments.length - 1];
const parentDIRName = segments[1];


function getURL(){
    return window.location.pathname
}



if(parentDIRName === "raysonfx"){
    parentDirectoryName = `/${parentDIRName}`
    ENDPOINT = `/${parentDIRName}/backend`
}else{
    parentDirectoryName = `${origin}`
    ENDPOINT = `/backend`
}

export {
    ENDPOINT,
    GetParameters,
    getURL,
    parentDirectoryName
} 