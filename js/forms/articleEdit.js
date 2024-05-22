const articleEdit = `
<div id="editorModal1" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <div class="editor-info">

                <form id="uploadArticle" onsubmit="return false" enctype="multipart/form-data">
                    <div >
                        <label for="">Title:</label>
                        <input type="text" class="form-control" placeholder="" name="title" id="title" required>
                    </div>
                    
                    <div>
                        <label for="">Author(s):</label>
                    </div>
                    <div class="group" id="app_2">	

                        <div id="app" >
            
                            <input type="text" id="authorsArray"  name="authorsArray"  class="form-control" v-model="saisie" placeholder="" required/>                                
                            <div class="keywords">
                                <div class="keyword" v-for="(k, i) in keywords">
                                    {{ k }}
                                    <span v-on:click="removeFromArray(i, k)"><i class="fas fa-times"></i></span>
                                </div>		
                            </div>
                    
                        </div>

                        <div >
                            <label for="">Corresponding Authors Email:</label>
                            <input type="email" class="form-control" placeholder="" name="corresponding_author" id="corresponding_author">
                        </div>
              <br>
                    <!-- Course description -->
                                <div class="col-12">
                                    <label for="">Manuscript Contents</label>
                                    <!-- Editor toolbar -->

                                    <!-- Main toolbar -->
                                    <div class="bg-body border rounded-bottom h-400px overflow-hidden" id="quilleditor" style="height: 500px;">
                                    </div>
                                </div> <br>

                    <input type="submit" class="signin-btn" value="Submit" id="submitButton">
                    
                </form>
            </div>
        </div>
    </div>
`

// Get the modal
var modal1 = document.getElementById("editorModal1");
var modal2 = document.getElementById("editorModal2");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to open the modal
function openModal() {
modal1.classList.add("show"); // Add the 'show' class
}

function openModal2() {
modal2.classList.add("show");
}

// Function to close the modal
function closeModal() {
modal1.classList.remove("show"); // Remove the 'show' class
}

function closeModal2() {
modal2.classList.remove("show"); // Remove the 'show' class
}

// Close the modal when the user clicks outside of it
window.onclick = function(event) {
if (event.target == modal1) {
    closeModal();
}
if (event.target == modal2) {
    closeModal2();
}
}