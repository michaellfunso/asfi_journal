

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

function updateNavigationList(currentSectionId, Nextitem) {

   const item = document.getElementById(currentSectionId)
   const next = document.getElementById(Nextitem);
    item.setAttribute("class", "active-nav")
    next.removeAttribute("class")

    const Lock = item.querySelector("i")
    const LockNext = next.querySelector("i")
    LockNext.innerText = "lock_open"

    Lock.innerHTML = "<span></span>";
}


        function showNext(nextSection, currentSection, navItemId, Nextitem, prevSection, headerMessageIndex) {
    document.getElementById(currentSection).classList.add('hidden');
    document.getElementById(nextSection).classList.remove('hidden');
    document.getElementById(nextSection).classList.add('fade-in');
    updateNavigationList(navItemId, Nextitem)
    const buttons = document.getElementById(prevSection);
    if(buttons){
        buttons.querySelector(".submit-next").style.display="none";
    }
    scrollTo(0, 0);  // Scroll to the top of the page if needed
            // HEader messages 
            const headerMessageContainer = document.getElementById("headerMessage")
        headerMessageContainer.innerHTML = headerMessages[headerMessageIndex]


}
function reviewAll(index) {
    const hiddenItms = document.querySelectorAll(".form-section");
    const removeButton = document.querySelectorAll(".submit-next");
    const showSubmit = document.querySelector("#submit_manuscript");
    hiddenItms.forEach(item=>{
        item.classList.remove('hidden');
    })

    removeButton.forEach(item=>{
        item.style.display="none";
    })
    const headerMessageContainer = document.getElementById("headerMessage")

    headerMessageContainer.innerHTML = headerMessages[index]

    showSubmit.removeAttribute('hidden');

}

function addAuthorInput() {
    var authorContainer = document.getElementById('author-information');
    var addAuthor = document.getElementById('addAuthor');

    // Create new input fields for the new author
    var newAuthorInputs = document.createElement('div');
    newAuthorInputs.innerHTML = `
    
        <div style="display: flex; justify-content: space-between; width: 150%;">
    <div style="margin-right: 10px;">
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
    <div style="margin-right: 10px;">
        <label for="">Full Name:</label>
        <div style="display: flex;">
            <input type="text" class="form-control" placeholder="Full Name..." name="authors_first_name[]">
        <input type="text" class="form-control" placeholder="Last Name..." name="authors_last_name[]">
        <input type="text" class="form-control" placeholder="Other Name..." name="authors_other_name[]">
        </div>
    </div>
    <div style="margin-right: 10px;">
                            <label for="">Affiliation:</label>
                            <div style="display: flex;">
                            <input type="text" class="form-control" placeholder="Affiliation..." name="affiliation[]">
                            <input type="text" class="form-control" placeholder="Affiliation City..." name="affiliation_city[]">
                            <input type="text" class="form-control" placeholder="Affiliation Country..." name="affiliation_country[]">
                            </div>
                        </div>
                
                        <div style="border-bottom: 1px solid #404040; margin-bottom: 12px;">
                            <label for="">Email:</label>
                            <input type="email" class="form-control" placeholder="Email..." name="email[]">
                        </div>
                        <div style="width: 20px; height: 20px; color:white; font-weight:bold; background-color: red; border-radius:6px; display-flex; justify-content: center; align-item: center">x</div>
        </div>

    `;

    // Append the new author inputs to the container
    addAuthor.appendChild(newAuthorInputs);

}