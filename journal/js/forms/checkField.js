function navigateSection(sectionId) {
    var currentSection = document.querySelector('.form-section:not(.hidden)');
    var nextSection = document.getElementById(sectionId);

    if (currentSection && nextSection && !nextSection.classList.contains('hidden')) {
        currentSection.classList.add('hidden');
        nextSection.classList.remove('hidden');
        nextSection.classList.add('fade-in');

        updateNavigationList(sectionId);
    }
}

function updateNavigationList(currentSectionId) {

   const item = document.getElementById(currentSectionId)
//     var navItems = document.querySelectorAll('#sectionNav li');
//     var currentIndex = Array.from(navItems).findIndex(item => item.textContent.toLowerCase() === currentSectionId);
    item.removeAttribute("disabled")
    item.setAttribute("class", "active-nav")
    const Lock = item.querySelector("i")
    Lock.innerHTML = "<span></span>";

    // for (var i = 0; i < navItems.length; i++) {
    //     navItems[i].removeAttribute('disabled');

    //     if (i > currentIndex) {
    //         navItems[i].setAttribute('disabled');
    //     }
    // }
}
const article_type = document.getElementById("article-type")
const prefix = document.getElementById("article_type")
const article_type_nav = document.getElementById("article_type_nav")

const upload_manuscript_nav = document.getElementById("upload_manuscript_nav")
const title_nav = document.getElementById("title_nav")
const abstract_nav = document.getElementById("abstract_nav")
const author_information_nav = document.getElementById("author_information_nav")
const affiliation_nav = document.getElementById("affiliation_nav")

prefix.addEventListener("change", function() {
if(prefix.value != "" && prefix.value){
const nextButton = article_type.querySelector(".submit-next")
nextButton.removeAttribute("disabled")
article_type_nav.setAttribute("onclick","showNext('article-type', 'upload-manuscript', 'article_type_nav')")
}
})


const upload_manuscript = document.getElementById("upload-manuscript")
const FIleFIelds = upload_manuscript.querySelectorAll("input[type=file]")
    

FIleFIelds.forEach(field =>{
    field.addEventListener("change", function(){
        const FileSize = field.files[0].size
        const FileType = field.files[0].type
        if(field.files[0]){
        if(FileSize > 50000000){
            alert("File is too large")
        }
        if (!(FileType === "application/msword" || FileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || FileType === "application/pdf")){

            alert("Invalid file type. Please upload a Word document (.doc, .docx) or a PDF file (.pdf).");
            field.value = ''; // Clear the file input

        }
        // else{
        //     alert(field.name  + " Cannot Be Empty")
        // }

        if(field.value != "" && field.value){
            const nextButton = upload_manuscript.querySelector(".submit-next")
            nextButton.removeAttribute("disabled")
            upload_manuscript_nav.setAttribute("onclick","showNext('upload-manuscript', 'title', 'upload_manuscript_nav')")

        }
    }
    })

})

const Title = document.getElementById("title")
const Titles = Title.querySelectorAll("input[type=text]")

Titles.forEach(titles =>{
    titles.addEventListener("change", function(){
    if(titles.value != "" && titles.value){
    const nextButton = Title.querySelector(".submit-next")
    nextButton.removeAttribute("disabled")
    title_nav.setAttribute("onclick","showNext('title', 'abstract', 'title_nav')")
    }
})
})

const Abstract = document.getElementById("abstract")
const AbstractFields = Abstract.querySelectorAll("textarea")
// let abstractCount = 0;

AbstractFields.forEach(abFields =>{
    abFields.addEventListener("change", function(){
    if(abFields.value != "" && abFields.value){
        const nextButton = Abstract.querySelector(".submit-next")
        nextButton.removeAttribute("disabled")
        title_nav.setAttribute("onclick","showNext('abstract', 'author-information', 'abstract_nav')")
        // abstractCount += 1
    }
})

// if(abstractCount >= AbstractFields.length){
//     const nextButton = Abstract.querySelector(".submit-next")
//     nextButton.removeAttribute("disabled")
//     title_nav.setAttribute("onclick","showNext('abstract', 'author-information', 'abstract_nav')")
// }
})

const Author_information = document.getElementById("author-information")
const author_field = Author_information.querySelector("#hd")

Author_information.addEventListener("change", function() {
    if(author_field.value != "" && author_field.value){
    const nextButton = Author_information.querySelector(".submit-next")
    nextButton.removeAttribute("disabled")
    author_information_nav.setAttribute("onclick","showNext('author-information', 'affiliation', 'author_information_nav')")
    }
    })

const Affiliation = document.getElementById("affiliation")
const Affiliations = Affiliation.querySelectorAll("input[type=text]")

Affiliations.forEach(affiliations =>{
    affiliations.addEventListener("change", function(){
    if(affiliations.value != "" && affiliations.value){
    const nextButton = Affiliation.querySelector(".submit-next")
    nextButton.removeAttribute("disabled")
    title_nav.setAttribute("onclick","showNext('affiliation', 'author-detials', 'affiliation_nav')")
    }
})

        }else{
            alert(field.name  + " Cannot Be Empty")
        }

       
            const nextButton = upload_manuscript.querySelector(".submit-next")
            nextButton.removeAttribute("disabled")
            article_type_nav.setAttribute("onclick","showNext('article-type', 'upload-manuscript', 'article_type_nav')")
    
    }
    })

})

function showNext(nextSection, currentSection, navItemId) {
    document.getElementById(currentSection).classList.add('hidden');
    document.getElementById(nextSection).classList.remove('hidden');
    document.getElementById(nextSection).classList.add('fade-in');
    updateNavigationList(navItemId)
    scrollTo(0, 0);  // Scroll to the top of the page if needed

}

function addAuthorInput() {
    var authorContainer = document.getElementById('author-information');
    var addAuthor = document.getElementById('addAuthor');

    // Create new input fields for the new author
    var newAuthorInputs = document.createElement('div');
    newAuthorInputs.innerHTML = `
        <div>
            <label for="prefix">Prefix:</label>
            <select name="authors_prefix[]" class="form-control">
                <option value="">Select an Option</option>
                <option value="Prof">Prof.</option>
                <option value="Dr">Dr.</option>
                <option value="Mr">Mr.</option>
                <option value="Mrs">Mrs.</option>
                <option value="Miss">Miss</option>
            </select>
        </div>
        <div>
            <label for="">Full Name:</label>
            <input type="text" class="form-control" placeholder="Author's Full Name..." name="authors_first_name[]">
        </div>
        <div>
                                <label for="">Middle Name:</label>
                                <input type="text" class="form-control" placeholder="Middle Name..." name="authors_middle_name[]">
                            </div>
                    
                            <div style="border-bottom: 1px solid #404040; margin-bottom: 12px;">
                                <label for="">Last Name:</label>
                                <input type="text" class="form-control" placeholder="Last Name..." name="authors_last_name[]">
                            </div>
    `;

    // Append the new author inputs to the container
    addAuthor.appendChild(newAuthorInputs);

}