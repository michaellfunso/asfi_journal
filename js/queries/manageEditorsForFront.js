import { EndPoint, parentDirectoryName } from "../constants.js";
// import { quill } from "../forms/quill.js";

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
                    
                                        const disciplineContainer = document.createElement('div');
                                        disciplineContainer.classList.add('edit-subject');
                                        disciplineContainer.setAttribute("style", "display:flex; flex-wrap:wrap;")
                                        // disciplineContainer.innerHTML = `<h3>${discipline.discipline}</h3>`;
                                        sectionContainer.appendChild(disciplineContainer);

                                        // Get Editors related to that discipline 
                                        fetch(`${EndPoint}/editorsSections/sectionalEditors.php?field=${sectionName}`, {
                                            method: "GET"
                                        }).then(res => res.json())
                                            .then(data => {
                                                if (data.status === "success") {
                                                    const editors = data.editors;
                                                    editors.forEach(editor => {
                                                        const editorContainer = document.createElement('div');
                                                        editorContainer.classList.add('edit-head-container');
                                                        editorContainer.innerHTML = `
                                                        <div class="indi-editors" >        
                                                        <div class="avatar" style="background-image: url('./useruploads/editors/${editor.photo}')"></div>
                                                        
                                                         <div class="editor-info" id="${editor.photo}" onclick="openModal('${editor.prefix}', '${editor.fullname}', '${editor.country}','${editor.photo}', '${editor.discipline}', '${editor.id}', '${editor.field}')">
                                                         <h4 style="font-size:14px;">${editor.prefix} ${editor.fullname}</h4>    
                                                         <p style="margin-left:8px;" style="background:green;">  ${editor.discipline}, ${editor.country}</p>
                                                      
                                                         </div>   
                                                         <button class="btn btn-danger rounded" style="height:fit-content; width:fit-content;" onclick="DeleteEditor('${editor.id}')"><i class="fa fa-trash"></i></button>
                                                          </div>`;
                                                        disciplineContainer.appendChild(editorContainer);
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

// Finally Submit and Edit theauthor
const EditAuthorForm = document.getElementById('editAuthor')
EditAuthorForm.addEventListener("submit", function(e){
    e.preventDefault()
    const formData = new FormData(EditAuthorForm);
    const tempDiv = document.getElementById('quilleditor');

    // // Render the extracted HTML into the specified div
    // contentDiv.innerHTML += tempDiv;
    const quill = new Quill(tempDiv, {
        modules: {
            toolbar: [
              ['bold', 'italic'],
              ['link', 'blockquote', 'code-block', 'image'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ 'header': [1, 2, false] }],
              [{ 'color': [] }],                             // add color picker 
              ['clean']
            ],
          },
          theme: 'snow',
        });
    formData.append('bio', JSON.stringify(quill.getContents().ops));

    const body = document.querySelector("body")

    body.removeAttribute("id")
    // formData.append('Author_content', JSON.stringify(quill.getContents().ops));
    // console.log(JSON.stringify(quill.getContents().ops))

    fetch(`${parentDirectoryName}/actions/updateEditor/`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log server response
        if(data.success){
            alert("Author Edited Successfully")
            window.location.href = "../manageEditors.html"
        }else if(data.error){
            alert(data.error)
            body.setAttribute("id", "formNotSubmitted")
        }else{
            alert(data.message)
            body.setAttribute("id", "formNotSubmitted")
        }

    })
    .catch(error => {
        console.error('Error:', error);
    });
})

const deleteEditor = document.getElementById("deleteEditor")
deleteEditor.addEventListener("submit", function(e){
    e.preventDefault()

    const formData = new FormData(deleteEditor)
    fetch(`${parentDirectoryName}/actions/deleteEditor/`,{
        method:"POST",
        body:formData
    }).then(res => res.json())
    .then(data =>{
        if(data.success){
            alert(data.success)
        }else{
            alert(data.error)
        }
        window.location.reload()
    })
})