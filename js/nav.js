import { parentDirectoryName } from "./constants.js";
let active  = "not-acitve"
let activeIssues
let activeAbout
let activeEditors
let activeAuthors
let activeReviewers
let activeEvents
let activeContact



// CHECK FOR ACTIVE PAGES 
function getURL(){
    return window.location.href
}

const url = getURL()

if(url === `${parentDirectoryName}/issues.html`){
    activeIssues = 'active'
}

if(url === `${parentDirectoryName}/about.html`){
    activeAbout = 'active'
}

if(url === `${parentDirectoryName}/editors.html`){
    activeEditors = 'active'
}

if(url === `${parentDirectoryName}/authors.html`){
    activeAuthors = 'active'
}

if(url === `${parentDirectoryName}/reviewers.html`){
    activeReviewers = 'active'
}

if(url === `${parentDirectoryName}/events.html`){
    activeEvents = 'active'
}

if(url === `${parentDirectoryName}/contact.html`){
    activeContact = 'active'
}

const NavigationContainer = document.getElementById("navigationContainer")

const NavigationLinks = `  <div class="header-container" id="header">
<div class="logo">
    <a href=${parentDirectoryName}/><img src="${parentDirectoryName}/images/logo.png" alt=""></a>

</div>
<div class="nav">
    <a class=${active} href=${parentDirectoryName}/issues.html>Browse Issues</a>
    <a class=${activeAbout} href=${parentDirectoryName}/about.html>About</a>
    <a class=${active} href=${parentDirectoryName}/editors.html>Meet The Editors</a>
    <a class=${active} href=${parentDirectoryName}/authors.html>For Authors</a>
    <a class=${active} href=${parentDirectoryName}/reviewers.html>For Reviewers</a>

    <a class=${active} href=${parentDirectoryName}/events.html>Events</a>

    <a class=${active} href=${parentDirectoryName}/contact.html>Contact</a>
</div>


<div class="search-container">
    <div class="submit-manuscript">
        <a href="submitManuscriptSignIn.html"><button type="button">Submit Manuscript</button></a>
    </div>
    <span class="searchIcon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="search"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></span>
    <div class="searcher">
    <input type="text" placeholder="Search" id="search" name="search">
    <button type="button" id="searchArticle">Search</button>
    </div>
</div>
<div class="mobile-menu-icon">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
</div>
</div>
<div class="mobile-body">

<span class="close-mobile-menu">X</span>

<div class="mobile-menu-container">
    <div class="mobile-menu">
    <a class=${active} href=${parentDirectoryName}/issues.html>Browse Issues</a>
    <a class=${active} href=${parentDirectoryName}/about.html>About</a>
    <a class=${active} href=${parentDirectoryName}/editors.html>Meet The Editors</a>
    <a class=${active} href=${parentDirectoryName}/authors.html>For Authors</a>
    <a class=${active} href=${parentDirectoryName}/reviewers.html>For Reviewers</a>

    <a class=${active} href=${parentDirectoryName}/events.html>Events</a>

    <a class=${active} href=${parentDirectoryName}/contact.html>Contact</a>
    </div>
    <div class="mobile-search">
        <div class="submit-manuscript">
            <a href="submitManuscriptSignIn.html"><button type="button">Submit Manuscript</button></a>
        </div>
        <div class="mobile-searcher">
        <input type="text" placeholder="Search" id="search" name="search">
        <button type="button" id="searchArticle"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="search"><path fill="none" d="M0 0h24v24H0V0z"></path><path fill="white" d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></button>
        </div>
    </div>
    
</div>

</div>`


NavigationContainer.innerHTML = NavigationLinks

$(document).ready(function() {
    $(".searchIcon").click(function() {
        $(".searcher").addClass("show-searcher");
    });
});