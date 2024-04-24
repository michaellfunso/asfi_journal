// Get the current URL pathname
const pathname = window.location.pathname;

// Split the pathname by slashes to get the individual segments
const segments = pathname.split('/');

// Get the parent directory name (second to last segment)
// const parentDirectoryName = segments[segments.length - 1];
const parentDIRName = segments[1];
const domainName = window.location.origin

let parentDirectoryName, EndPoint
if(parentDIRName === "journal"){
    parentDirectoryName = parentDIRName
    EndPoint = 'https://weperch.live/backend'
   

}else{
    parentDirectoryName = `asfi_journal/${segments[2]}`
   EndPoint = `/asfi_journal/backend`;

   
}

// console.log(parentDirectoryName)
// Concatenate with the desired directory name


console.log("UPLOAD PORTAL")
export { 
    EndPoint,
    parentDirectoryName, 
    domainName
};
