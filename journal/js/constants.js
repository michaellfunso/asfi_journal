// Get the current URL pathname
const pathname = window.location.pathname;

// Split the pathname by slashes to get the individual segments
const segments = pathname.split('/');

// Get the parent directory name (second to last segment)
// const parentDirectoryName = segments[segments.length - 1];
const parentDirectoryName = segments[1];

// console.log(parentDirectoryName)
// Concatenate with the desired directory name

const EndPoint = `/backend`;

export { 
    EndPoint,
    parentDirectoryName
};

