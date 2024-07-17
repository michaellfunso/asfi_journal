import { EndPoint } from "../constants.js";

const editorsContainer = document.getElementById("ae");
const editorialNav = document.getElementById("editorialNav")


// onclick="setActive(${i})"


// Find Each Unique Section 
function GetEditors() {
    fetch(`${EndPoint}/editorsSections/editorialSections.php`, {
        method: "GET"
    }).then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                const uniqueSections = data.fields;
                const modal = document.getElementById("modal")

                if (uniqueSections.length > 0) {
                    for (let i = 0; i < uniqueSections.length; i++) {
                        const editorialSections = uniqueSections[i].field
                        editorialNav.innerHTML += ` <a href="#${editorialSections}" ><li class="">${editorialSections}</li></a>`
                    // }
                    // uniqueSections.forEach(section => {
                        const sectionName = uniqueSections[i].field;
                        const sectionContainer = document.createElement('div');
                        sectionContainer.classList.add('edit-head')
                        sectionContainer.setAttribute("id", sectionName)
                        sectionContainer.innerHTML = ` <span>${sectionName}</span>`;
                        editorsContainer.appendChild(sectionContainer);

                        const mainSectionContainer = document.createElement("div")

                        // Find each editors related to that section 
               
                                        const disciplineContainer = document.createElement('div');
                                        disciplineContainer.classList.add('edit-subject');
                                        // disciplineContainer.setAttribute("style", "display:flex; flex-wrap:wrap;")
                                        mainSectionContainer.setAttribute("style", "display:flex; flex-wrap:wrap;")

                                        // disciplineContainer.innerHTML = `<h3>${discipline.discipline}</h3>`;
                                        mainSectionContainer.appendChild(disciplineContainer);

                                        // Get Editors related to that discipline 
                                        fetch(`${EndPoint}/editorsSections/sectionalEditors.php?field=${encodeURIComponent(sectionName)}`, {
                                            method: "GET"
                                        }).then(res => res.json())
                                            .then(data => {
                                                if (data.status === "success") {
                                                    const editors = data.editors;
                                                    console.log(editors)
                                                    for(let i=0; i<editors.length; i++){

                                                    // }
                                                    // editors.forEach(editor => {
                                                        const editorContainer = document.createElement('div');
                                                        editorContainer.classList.add('edit-head-container');

                            
                                                        editorContainer.innerHTML = `
                                                        <div class="indi-editors" onclick="openModal('${editors[i].prefix}', '${editors[i].fullname}', '${editors[i].country}','${editors[i].photo}')">        
                                                        <div class="avatar" style="background-image: url('./useruploads/editors/${editors[i].photo}')"></div>
                                                         <div class="editor-info" id=${editors[i].photo}>
                                                         <h4 style="font-size:14px;">${editors[i].prefix} ${editors[i].fullname}</h4>    
                                                         <p style="margin-left:8px;" style="background:green;">  ${editors[i].discipline}, ${editors[i].country}</p>
                                                  
                                                         </div>
                                                          </div>`;
                                                        mainSectionContainer.appendChild(editorContainer);
                        sectionContainer.appendChild(mainSectionContainer);

                                                    }
                                                } else {
                                                    console.log(data.message);
                                                }
                                            });
                    
                        }
                } else {
                    console.log("No Editors");
                }
            } else {
                console.log(data.message);
            }
        });
}






GetEditors();
