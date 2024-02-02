function navigateSection(sectionId) {
    var currentSection = document.querySelector('.form-section:not(.hidden)');
    var nextSection = document.getElementById(sectionId);

    if (currentSection && nextSection && !nextSection.classList.contains('hidden')) {
        currentSection.classList.add('hidden');
        nextSection.classList.remove('hidden');
        nextSection.classList.add('fade-in');

        // Update navigation list
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
        if(FileSize > 50000){
            alert("File is too large")
        }
        if (!(FileType === "application/msword" || FileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || FileType === "application/pdf")){

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