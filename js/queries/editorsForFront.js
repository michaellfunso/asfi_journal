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
                    }
                    uniqueSections.forEach(section => {
                        const sectionName = section.field;
                        const sectionContainer = document.createElement('div');
                        sectionContainer.classList.add('edit-head')
                        sectionContainer.setAttribute("id", sectionName)
                        sectionContainer.innerHTML = ` <span>${sectionName}</span>`;
                        editorsContainer.appendChild(sectionContainer);

                        // Find each discipline related to that section 
                        fetch(`${EndPoint}/editorsSections/editorialFields.php?field=${sectionName}`, {
                            method: "GET"
                        }).then(res => res.json())
                            .then(data => {
                                if (data.status === "success") {
                                    const uniqueDisciplines = data.discipline;

                                    uniqueDisciplines.forEach(discipline => {
                                        const disciplineContainer = document.createElement('div');
                                        disciplineContainer.classList.add('edit-subject');
                                        disciplineContainer.setAttribute("style", "display:flex;")
                                        // disciplineContainer.innerHTML = `<h3>${discipline.discipline}</h3>`;
                                        sectionContainer.appendChild(disciplineContainer);

                                        // Get Editors related to that discipline 
                                        fetch(`${EndPoint}/editorsSections/sectionalEditors.php?discipline=${discipline.discipline}&field=${sectionName}`, {
                                            method: "GET"
                                        }).then(res => res.json())
                                            .then(data => {
                                                if (data.status === "success") {
                                                    const editors = data.editors;
                                                    editors.forEach(editor => {
                                                        const editorContainer = document.createElement('div');
                                                        editorContainer.classList.add('edit-head-container');

                            
                                                        editorContainer.innerHTML = `
                                                        <div class="indi-editors" onclick="openModal('${editor.prefix}', '${editor.fullname}', '${editor.country}','${editor.photo}')">        
                                                        <div class="avatar" style="background-image: url('./useruploads/editors/${editor.photo}')"></div>
                                                         <div class="editor-info" id=${editor.photo}>
                                                         <h4 style="font-size:14px;">${editor.prefix} ${editor.fullname}</h4>    
                                                         <p style="margin-left:8px;" style="background:green;">  ${discipline.discipline}, ${editor.country}</p>
                                                  
                                                         </div>
                                                          </div>`;
                                                        disciplineContainer.appendChild(editorContainer);
                                                    });
                                                } else {
                                                    console.log(data.message);
                                                }
                                            });
                                    });
                                } else {
                                    console.log(data.message);
                                }
                            });
                    });
                } else {
                    console.log("No Editors");
                }
            } else {
                console.log(data.message);
            }
        });
}






GetEditors();
