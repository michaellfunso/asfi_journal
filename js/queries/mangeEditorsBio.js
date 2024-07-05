       // Get the modal
       var modal1 = document.getElementById("editorModal1");
       var modal2 = document.getElementById("editorModal2");
       var modal = document.getElementById("editorModal");


       // Get the <span> element that closes the modal
       var span = document.getElementsByClassName("close")[0];

       // Function to open the modal
       function openModal1() {
           modal1.classList.add("show"); // Add the 'show' class
       }

       function openModal(prefix, fullname, country, photo, discipline, id, field) {
           modalContent = modal.querySelector("form")
           GetBio(fullname)

           modalContent.innerHTML = `
           <span class="close" onclick="closeModal()">&times;</span>
           <div class="avatar" style="background-image: url('./useruploads/editors/${photo}')"></div>
   <div class="editor-info submit-body" style="display:flex; flex-direction:column;">
   <select name="prefix"  class="form-control" >
   <option value=${prefix}>${prefix} </option>
          <option value="Prof.">Prof.</option>
                                <option value="Dr.">Dr.</option>
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Miss">Miss</option>
   </select>
       <input class="form-control" type="text" name="fullname" placeholder="Enter Fullname" value= "${fullname}" required/>
       <input class="form-control" type="text" name="discipline" placeholder="Enter Discipline" value="${discipline}"/>
       <input class="form-control" type="text" name="country" placeholder="Enter Country" value="${country}"/>
       <input class="form-control" type="text" name="field" placeholder="Enter Editorial Assignment" value="${field}"/>

       <input class="form-control" name="id" type="hidden" value="${id}"/>

       <div id="quilleditor"></div>

       <input class="form-control" name="verifyCode" type="password" placeholder="Enter Verification Code" required/>


       <button type="submit"  class="signin-btn" >Update</button>
   </div>`
function GetBio(editor){
fetch(`./backend/editorsSections/getBio.php?name=${editor}`, {
method:"GET"
}).then(res=>res.json())
.then(data=>{
const Editor  = data.editor
// Parse the Quill content from the JSON data
const quillContent = JSON.parse(Editor[0].bio);


// Create a Quill instance in "read-only" mode to render the content as HTML
var modal = document.getElementById("editorModal");

const contentDiv = modal.querySelector('form');

function renderQuillAsHTML(deltaContent) {
    // Create a Quill instance in a temporary div
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
  

    // Set the content as Quill Delta and extract the HTML
    quill.setContents(deltaContent);

    // // Get the innerHTML from the Quill editor
    // const htmlContent = tempDiv.innerHTML;



}

// Render the Quill content as HTML in the "content" div
renderQuillAsHTML(quillContent);
})
}



   
           modal.classList.add("show"); // Add the 'show' class
       }

       function openModal2() {
           modal2.classList.add("show");
       }

       // Function to close the modal
       function closeModal1() {
           modal1.classList.remove("show"); // Remove the 'show' class
       }

       function closeModal2() {
           modal2.classList.remove("show"); // Remove the 'show' class
       }

       function closeModal() {
           modal.classList.remove("show"); // Remove the 'show' class
       }

       // Close the modal when the user clicks outside of it
       window.onclick = function (event) {
           if (event.target == modal1) {
               closeModal1();
           }
           if (event.target == modal2) {
               closeModal2();
           }
           if (event.target == modal) {
               closeModal();
           }
       }




