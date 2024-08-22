
import { EndPoint } from "./constants.js";
import { formatTimestamp } from "./formatDate.js";
import { CreateAuthorsOptionsForIssues, CreateTypeOptionsForIssues } from "./queries/filterIssues.js";

const ArticleListContainer = document.getElementById("articleListContainer")
const ArticleListFront = document.getElementById("article_items_container")
const SliderListContainer = document.querySelector(".carousel-inner")
const indicators = document.querySelector(".carousel-indicators")

const authorsOptions = document.getElementById("authorsOption")



const authors = await CreateAuthorsOptionsForIssues()

if(authorsOptions){
authors.forEach(author =>{
    authorsOptions.innerHTML += `<option value="${author}">${author}</option>`    
})
}

function UpdateIssues(ArticleLst, currentPage, totalPages) {
    if (ArticleListContainer) {
        ArticleListContainer.innerHTML = ""
    }

    if (ArticleListFront) {
        ArticleListFront.innerHTML = ""
    }
    if (ArticleLst.length > 0) {
        for(let b=0; b<ArticleLst.length; b++){
            const article = ArticleLst[b]
    
            const ArticleTitle = article.manuscript_full_title
            const RunningTitle = article.manuscript_running_title
            const ArticleFile = article.manuscript_file
            const CoverPhoto = article.manuscriptPhoto
            const ArticleId = article.buffer
            const MainPublishDate = article.date_published
            let date_uploaded = ""
            if(MainPublishDate && MainPublishDate != null && MainPublishDate !== ""){
                date_uploaded = formatTimestamp(MainPublishDate)
            }else{
                date_uploaded = formatTimestamp(article.date_uploaded)
            }
            // const date_uploaded = formatTimestamp(article.date_uploaded)
            const ArticleType = article.article_type
            const viewsCount = article.views_count
            const DownloadsCount = article.downloads_count
            const isEditorsChoice = article.is_editors_choice
            const isOpenAccess = article.is_open_access
            let AddEditorsChoice = ""
            let AddOpenAccess = ""
            let openAccessFOrFront = ""
            

            if(isEditorsChoice && isEditorsChoice === "yes"){
                AddEditorsChoice = `<span style="margin-left: 50px;">Editor's Choice <svg style="width:20px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z" fill="#4d91f7" class="fill-000000"></path></svg></span>`;
            }else{
                AddEditorsChoice = ""
            }

            if(isOpenAccess && isOpenAccess === "yes"){
                AddOpenAccess = `<span><img src="../images/20181007070735!Open_Access_logo_PLoS_white.svg" style="width:10px;" alt=""> Open Access</span>`
                openAccessFOrFront = `<span><img src="./images/20181007070735!Open_Access_logo_PLoS_white.svg" style="width:10px;" alt=""> Open Access</span>`
            }else{
                AddOpenAccess = ""
                openAccessFOrFront = ""
            }

            const maxLength = 50;

            var limitedText = ArticleTitle;
            
            // if (limitedText.length > maxLength) {
            //     limitedText = limitedText.substring(0, maxLength) + "...";
            // }

            fetch(`${EndPoint}/allAuthors.php?articleID=${ArticleId}`, {
                method: "GET"
            }).then(res => res.json())
                .then(data => {
                    if (data) {
                        const AllAuthors = data.authorsList
                        let AuthorsName = ""

                        // AllAuthors.forEach(author => {
                        
                        //     const AuthorsFullname = `${author.authors_fullname}, `
                        //     AuthorsName += AuthorsFullname
                        // })
                        for(let i=0; i < AllAuthors.length; i++){
                            let AuthorNM = `${AllAuthors[i].authors_fullname}, `
                            if(i < AllAuthors.length-1){
                                
                                AuthorsName += AuthorNM
                            }else{
                                AuthorsName += `${AllAuthors[i].authors_fullname}.`
                            }
                            
                
                        }

                        // let LimitedAuthorsName = AuthorsName
                        // if(LimitedAuthorsName.length > maxLength){
                        //     LimitedAuthorsName = LimitedAuthorsName.substring(0, maxLength) + "..."
                        // }

                        // var AutthorsNameLimited  = 

                        if (ArticleListContainer) {

                            ArticleListContainer.innerHTML += `
                            
                    <div class="issue-item wow fadeInLeft" data-wow-delay="200ms">
				<div class="doi-access-wrapper"><span class="item-category">${ArticleType}</span><span style="margin-right:60px;">${AddOpenAccess} ${AddEditorsChoice}</span></div>
				<a href="../content?sid=${ArticleId}" class="issue-item__title visitable">
					<h3 lang="en" class="issue-item__title issue-item__title__en">${ArticleTitle}</h3></a>
					<div class="loa comma">
					<p class="article-authors" title="${AuthorsName}">${AuthorsName}</p>
					</div>
						<ul class="rlist--inline separator issue-item__details">
							<li><label>First Published:</label><span class="bold"> &nbsp;${date_uploaded}</span></li>
						</ul>
						<div class="content-item-format-links">
							<ul class="rlist--inline separator">
							<li><a href="../content?sid=${ArticleId}&title=${ArticleTitle}#content" title="Abstract" aria-label="Abstract for ${ArticleTitle}">Abstract</a></li>
							<li><a href="../content?sid=${ArticleId}&title=${ArticleTitle}#fulltext" title="Full text" aria-label="Full text for ${ArticleTitle}">Full text</a></li>
							<li><a href="../useruploads/manuscripts/${ArticleFile}" target="_blank" title="ePDF" class="downloadLink" aria-label="PDF for ${ArticleTitle}">PDF</a></li>
							<li><a href="" title="References" aria-label="References for ${ArticleTitle}">References</a></li>
                            <li title="Views" aria-label="Views for ${ArticleTitle}"><span>${viewsCount}</span> Views</li>
                            <li title="Downloads" aria-label="Downloads for ${ArticleTitle}"><span>${DownloadsCount}</span> Downloads</li>
                            <li title="Share" class="shareButton" aria-label="Share for ${ArticleTitle}">Share</li>
						</ul>
					</div>
                      <!-- Hidden share options dropdown -->
  <div class="share-options" style="display: none;">
    <ul class="rlist--inline separator">
      <li title="Share on ASFIScholar" class="shareOption" data-platform="asfischolar" aria-label="Share on ASFIScholar"><img src="./images/ASFIScholar_Logo.png" alt="" width="64px" height="34px"> ASFISCHOLAR</li>
      <li title="Share on Twitter" class="shareOption" data-platform="twitter" aria-label="Share on Twitter"><?xml version="1.0" ?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" width="24px" height="24px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"/></svg> (Twitter)</li>
      <li title="Share on Facebook" class="shareOption" data-platform="facebook" aria-label="Share on Facebook"><?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" height="32px" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z" style="fill:#1877f2;fill-rule:nonzero;"/><path d="M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z" style="fill:#fff;fill-rule:nonzero;"/></g></svg> Facebook</li>
      <li title="Share on LinkedIn" class="shareOption" data-platform="linkedin" aria-label="Share on LinkedIn"><?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.0//EN'  'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'><svg enable-background="new 0 0 32 32" height="32px" id="Layer_1" version="1.0" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle clip-rule="evenodd" cx="16" cy="16" fill="#007BB5" fill-rule="evenodd" r="16"/><g><rect fill="#FFFFFF" height="14" width="4" x="7" y="11"/><path d="M20.499,11c-2.791,0-3.271,1.018-3.499,2v-2h-4v14h4v-8c0-1.297,0.703-2,2-2c1.266,0,2,0.688,2,2v8h4v-7    C25,14,24.479,11,20.499,11z" fill="#FFFFFF"/><circle cx="9" cy="8" fill="#FFFFFF" r="2"/></g></g><g/><g/><g/><g/><g/><g/></svg> LinkedIn</li>
      <li title="Share on WhatsApp" class="shareOption" data-platform="whatsapp" aria-label="Share on WhatsApp"><?xml version="1.0" ?><svg id="Layer_1" style="enable-background:new 0 0 1000 1000;" height="32px" width="32px" version="1.1" viewBox="0 0 1000 1000" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
	.st0{fill:#25D366;}
	.st1{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
</style><title/><g><path class="st0" d="M500,1000L500,1000C223.9,1000,0,776.1,0,500v0C0,223.9,223.9,0,500,0h0c276.1,0,500,223.9,500,500v0   C1000,776.1,776.1,1000,500,1000z"/><g><g id="WA_Logo"><g><path class="st1" d="M733.9,267.2c-62-62.1-144.6-96.3-232.5-96.4c-181.1,0-328.6,147.4-328.6,328.6      c0,57.9,15.1,114.5,43.9,164.3L170.1,834l174.2-45.7c48,26.2,102,40,157,40h0.1c0,0,0,0,0,0c181.1,0,328.5-147.4,328.6-328.6      C830.1,411.9,796,329.3,733.9,267.2z M501.5,772.8h-0.1c-49,0-97.1-13.2-139-38.1l-10-5.9L249,755.9l27.6-100.8l-6.5-10.3      c-27.3-43.5-41.8-93.7-41.8-145.4c0.1-150.6,122.6-273.1,273.3-273.1c73,0,141.5,28.5,193.1,80.1c51.6,51.6,80,120.3,79.9,193.2      C774.6,650.3,652,772.8,501.5,772.8z M651.3,568.2c-8.2-4.1-48.6-24-56.1-26.7c-7.5-2.7-13-4.1-18.5,4.1      c-5.5,8.2-21.2,26.7-26,32.2c-4.8,5.5-9.6,6.2-17.8,2.1c-8.2-4.1-34.7-12.8-66-40.8c-24.4-21.8-40.9-48.7-45.7-56.9      c-4.8-8.2-0.5-12.7,3.6-16.8c3.7-3.7,8.2-9.6,12.3-14.4c4.1-4.8,5.5-8.2,8.2-13.7c2.7-5.5,1.4-10.3-0.7-14.4      c-2.1-4.1-18.5-44.5-25.3-61c-6.7-16-13.4-13.8-18.5-14.1c-4.8-0.2-10.3-0.3-15.7-0.3c-5.5,0-14.4,2.1-21.9,10.3      c-7.5,8.2-28.7,28.1-28.7,68.5c0,40.4,29.4,79.5,33.5,84.9c4.1,5.5,57.9,88.4,140.3,124c19.6,8.5,34.9,13.5,46.8,17.3      c19.7,6.3,37.6,5.4,51.7,3.3c15.8-2.4,48.6-19.9,55.4-39c6.8-19.2,6.8-35.6,4.8-39C665,574.4,659.5,572.4,651.3,568.2z"/></g></g></g></g></svg> WhatsApp</li>
 <li title="Copy Link to Share" class="shareOption" data-platform="instagram" aria-label="Copy Link to Share"><?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height="32px" width="32px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon points="304,96 288,96 288,176 368,176 368,160 304,160  "/><path d="M325.3,64H160v48h-48v336h240v-48h48V139L325.3,64z M336,432H128V128h32v272h176V432z M384,384H176V80h142.7l65.3,65.6V384   z"/></g></svg> Copy Link</li>
    </ul>
  </div>
			</div>
           
            `;}
        


                        if (ArticleListFront) {
                            ArticleListFront.innerHTML += `
                        <div class="issue-item wow fadeInLeft" data-wow-delay="200ms">
				<div class="doi-access-wrapper"><span class="item-category">${ArticleType}</span>
                <span style="margin-right:60px;">${openAccessFOrFront} ${AddEditorsChoice}</span>
                </div>
				<a href="./content?sid=${ArticleId}" class="issue-item__title visitable">
					<h3 lang="en" class="issue-item__title issue-item__title__en">${ArticleTitle}</h3></a>
					<div class="loa comma">
					<p class="article-authors" title="${AuthorsName}">${AuthorsName}</p>
					</div>
						<ul class="rlist--inline separator issue-item__details">
							<li><label>First Published:</label><span class="bold"> &nbsp;${date_uploaded}</span></li>
						</ul>
						<div class="content-item-format-links">
							<ul class="rlist--inline separator">
							<li><a href="./content?sid=${ArticleId}&title=${ArticleTitle}#content" title="Abstract" aria-label="Abstract for ${ArticleTitle}">Abstract</a></li>
							<li><a href="./content?sid=${ArticleId}&title=${ArticleTitle}#fulltext" title="Full text" aria-label="Full text for ${ArticleTitle}">Full text</a></li>
							<li><a href="../useruploads/manuscripts/${ArticleFile}" target="_blank" title="ePDF" class="downloadLink" aria-label="PDF for ${ArticleTitle}">PDF</a></li>
							<li><a href="" title="References" aria-label="References for ${ArticleTitle}">References</a></li>
                            <li title="Views" aria-label="Views for ${ArticleTitle}"><span>${viewsCount}</span> Views</li>
                            <li title="Downloads" aria-label="Downloads for ${ArticleTitle}"><span>${DownloadsCount}</span> Downloads</li>
                            <li title="Share" class="shareButton" aria-label="Share for ${ArticleTitle}">Share</li>
						</ul>
					</div>
                     <!-- Hidden share options dropdown -->
  <div class="share-options" style="display: none;">
    <ul class="rlist--inline separator">
      <li title="Share on ASFIScholar" class="shareOption" data-platform="asfischolar" aria-label="Share on ASFIScholar"><img src="./images/ASFIScholar_Logo.png" alt="" width="64px" height="34px"> ASFISCHOLAR</li>
      <li title="Share on Twitter" class="shareOption" data-platform="twitter" aria-label="Share on Twitter"><?xml version="1.0" ?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" width="24px" height="24px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"/></svg> (Twitter)</li>
      <li title="Share on Facebook" class="shareOption" data-platform="facebook" aria-label="Share on Facebook"><?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" height="32px" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z" style="fill:#1877f2;fill-rule:nonzero;"/><path d="M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z" style="fill:#fff;fill-rule:nonzero;"/></g></svg> Facebook</li>
      <li title="Share on LinkedIn" class="shareOption" data-platform="linkedin" aria-label="Share on LinkedIn"><?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.0//EN'  'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'><svg enable-background="new 0 0 32 32" height="32px" id="Layer_1" version="1.0" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle clip-rule="evenodd" cx="16" cy="16" fill="#007BB5" fill-rule="evenodd" r="16"/><g><rect fill="#FFFFFF" height="14" width="4" x="7" y="11"/><path d="M20.499,11c-2.791,0-3.271,1.018-3.499,2v-2h-4v14h4v-8c0-1.297,0.703-2,2-2c1.266,0,2,0.688,2,2v8h4v-7    C25,14,24.479,11,20.499,11z" fill="#FFFFFF"/><circle cx="9" cy="8" fill="#FFFFFF" r="2"/></g></g><g/><g/><g/><g/><g/><g/></svg> LinkedIn</li>
      <li title="Share on WhatsApp" class="shareOption" data-platform="whatsapp" aria-label="Share on WhatsApp"><?xml version="1.0" ?><svg id="Layer_1" style="enable-background:new 0 0 1000 1000;" height="32px" width="32px" version="1.1" viewBox="0 0 1000 1000" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
	.st0{fill:#25D366;}
	.st1{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
</style><title/><g><path class="st0" d="M500,1000L500,1000C223.9,1000,0,776.1,0,500v0C0,223.9,223.9,0,500,0h0c276.1,0,500,223.9,500,500v0   C1000,776.1,776.1,1000,500,1000z"/><g><g id="WA_Logo"><g><path class="st1" d="M733.9,267.2c-62-62.1-144.6-96.3-232.5-96.4c-181.1,0-328.6,147.4-328.6,328.6      c0,57.9,15.1,114.5,43.9,164.3L170.1,834l174.2-45.7c48,26.2,102,40,157,40h0.1c0,0,0,0,0,0c181.1,0,328.5-147.4,328.6-328.6      C830.1,411.9,796,329.3,733.9,267.2z M501.5,772.8h-0.1c-49,0-97.1-13.2-139-38.1l-10-5.9L249,755.9l27.6-100.8l-6.5-10.3      c-27.3-43.5-41.8-93.7-41.8-145.4c0.1-150.6,122.6-273.1,273.3-273.1c73,0,141.5,28.5,193.1,80.1c51.6,51.6,80,120.3,79.9,193.2      C774.6,650.3,652,772.8,501.5,772.8z M651.3,568.2c-8.2-4.1-48.6-24-56.1-26.7c-7.5-2.7-13-4.1-18.5,4.1      c-5.5,8.2-21.2,26.7-26,32.2c-4.8,5.5-9.6,6.2-17.8,2.1c-8.2-4.1-34.7-12.8-66-40.8c-24.4-21.8-40.9-48.7-45.7-56.9      c-4.8-8.2-0.5-12.7,3.6-16.8c3.7-3.7,8.2-9.6,12.3-14.4c4.1-4.8,5.5-8.2,8.2-13.7c2.7-5.5,1.4-10.3-0.7-14.4      c-2.1-4.1-18.5-44.5-25.3-61c-6.7-16-13.4-13.8-18.5-14.1c-4.8-0.2-10.3-0.3-15.7-0.3c-5.5,0-14.4,2.1-21.9,10.3      c-7.5,8.2-28.7,28.1-28.7,68.5c0,40.4,29.4,79.5,33.5,84.9c4.1,5.5,57.9,88.4,140.3,124c19.6,8.5,34.9,13.5,46.8,17.3      c19.7,6.3,37.6,5.4,51.7,3.3c15.8-2.4,48.6-19.9,55.4-39c6.8-19.2,6.8-35.6,4.8-39C665,574.4,659.5,572.4,651.3,568.2z"/></g></g></g></g></svg> WhatsApp</li>
<li title="Copy Link to Share" class="shareOption" data-platform="instagram" aria-label="Copy Link to Share"><?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height="32px" width="32px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon points="304,96 288,96 288,176 368,176 368,160 304,160  "/><path d="M325.3,64H160v48h-48v336h240v-48h48V139L325.3,64z M336,432H128V128h32v272h176V432z M384,384H176V80h142.7l65.3,65.6V384   z"/></g></svg> Copy Link</li>
    </ul>
  </div>
			</div>
           
            `;
                        }
                        // const downloadLinks = document.querySelectorAll(".downloadLink");
                        // downloadLinks.forEach(link =>{
                        //     link.setAttribute("href", `../useruploads/manuscripts/${ArticleFile}`)
                        //     link.setAttribute("download", `${ArticleTitle}.pdf`)
                        
                        //     link.addEventListener("click", function(){
                        //         DownloadItem(buffer)
                        //     })
                        // })
                    } else {
                        console.log("Server Error")
                    }
                })
        };


    } else {
        if (ArticleListContainer) {

            ArticleListContainer.innerHTML = `     
        <div class="article-wrapper wow fadeInLeft" data-wow-delay="200ms">
            <h4>Nothing to show yet</h4>

        </div>
        `
        }

        if (ArticleListFront) {
            ArticleListFront.innerHTML = `      
        <div class="article-wrapper wow fadeInLeft" data-wow-delay="200ms">
            <h4>Nothing to show yet</h4>

        </div>

        `
        }
    }
}


CreateTypeOptionsForIssues();

export {
    UpdateIssues,
}