import { EndPoint } from "../constants.js";

const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", function(e) {
    e.preventDefault();
// Define constant variables for element IDs
const ARTICLE_TYPE = "article_type";
const MANUSCRIPT_FILE = "manuscript_file";
const COVER_LETTER = "cover_letter";
const TABLES = "tables";
const FIGURES = "figures";
const SUPPLEMENTARY_MATERIALS = "supplementary_materials";
const GRAPHIC_ABSTRACT = "graphic_abstract";
const MANUSCRIPT_FULL_TITLE = "manuscript_full_title";
const MANUSCRIPT_RUNNING_TITLE = "manuscript_running_title";
const ABSTRACT_BACKGROUND = "abstract_background";
const ABSTRACT_OBJECTIVES = "abstract_objectives";
const ABSTRACT_METHOD = "abstract_method";
const ABSTRACT_RESULTS = "abstract_results";
const ABSTRACT_DISCUSSION = "abstract_discussion";
const UNSTRUCTURED_ABSTRACT = "unstructured_abstract";
const AUTHORS_PREFIX = "authors_prefix";
const AUTHORS_FIRST_NAME = "authors_first_name";
const AUTHORS_LAST_NAME = "authors_last_name";
const AUTHORS_MIDDLE_NAME = "authors_middle_name";
const AUTHORS_HIGHEST_DEGREE = "authors_highest_degree";
const AUTHORS_INSTITUTION = "authors_institution";
const INSTITUTION_CITY = "institution_city";
const INSTITUTION_COUNTRY = "institution_country";
const AUTHORS_EMAIL = "authors_email";
const AUTHORS_PHONENUMBER = "authors_phonenumber";
const AUTHORS_WHATSAPP_NUMBER = "authors_whatsapp_number";

// Create FormData and append form data
const formData = new FormData();
const articleType = document.getElementById(ARTICLE_TYPE);
const manuscriptFileInput = document.getElementById(MANUSCRIPT_FILE);
const coverLetterInput = document.getElementById(COVER_LETTER);
const tablesInput = document.getElementById(TABLES);
const figuresInput = document.getElementById(FIGURES);
const supplementaryMaterialsInput = document.getElementById(SUPPLEMENTARY_MATERIALS);
const graphicAbstractInput = document.getElementById(GRAPHIC_ABSTRACT);
const manuscriptFullTitleInput = document.getElementById(MANUSCRIPT_FULL_TITLE);
const manuscriptRunningTitleInput = document.getElementById(MANUSCRIPT_RUNNING_TITLE);
const abstractBackgroundInput = document.getElementById(ABSTRACT_BACKGROUND);
const abstractObjectivesInput = document.getElementById(ABSTRACT_OBJECTIVES);
const abstractMethodInput = document.getElementById(ABSTRACT_METHOD);
const abstractResultsInput = document.getElementById(ABSTRACT_RESULTS);
const abstractDiscussionInput = document.getElementById(ABSTRACT_DISCUSSION);
const unstructuredAbstractInput = document.getElementById(UNSTRUCTURED_ABSTRACT);
const authorsPrefixInput = document.getElementById(AUTHORS_PREFIX);
const authorsFirstNameInput = document.getElementById(AUTHORS_FIRST_NAME);
const authorsLastNameInput = document.getElementById(AUTHORS_LAST_NAME);
const authorsMiddleNameInput = document.getElementById(AUTHORS_MIDDLE_NAME);
const authorsHighestDegreeInput = document.getElementById(AUTHORS_HIGHEST_DEGREE);
const authorsInstitutionInput = document.getElementById(AUTHORS_INSTITUTION);
const institutionCityInput = document.getElementById(INSTITUTION_CITY);
const institutionCountryInput = document.getElementById(INSTITUTION_COUNTRY);
const authorsEmailInput = document.getElementById(AUTHORS_EMAIL);
const authorsPhonenumberInput = document.getElementById(AUTHORS_PHONENUMBER);
const authorsWhatsappNumberInput = document.getElementById(AUTHORS_WHATSAPP_NUMBER);

// Append form data
formData.append(ARTICLE_TYPE, articleType.value)
formData.append(MANUSCRIPT_FILE, manuscriptFileInput.files[0]);
formData.append(COVER_LETTER, coverLetterInput.files[0]);
formData.append(TABLES, tablesInput.files[0]);
formData.append(FIGURES, figuresInput.files[0]);
formData.append(SUPPLEMENTARY_MATERIALS, supplementaryMaterialsInput.files[0]);
formData.append(GRAPHIC_ABSTRACT, graphicAbstractInput.files[0]);
formData.append(MANUSCRIPT_FULL_TITLE, manuscriptFullTitleInput.value);
formData.append(MANUSCRIPT_RUNNING_TITLE, manuscriptRunningTitleInput.value);
formData.append(ABSTRACT_BACKGROUND, abstractBackgroundInput.value);
formData.append(ABSTRACT_OBJECTIVES, abstractObjectivesInput.value);
formData.append(ABSTRACT_METHOD, abstractMethodInput.value);
formData.append(ABSTRACT_RESULTS, abstractResultsInput.value);
formData.append(ABSTRACT_DISCUSSION, abstractDiscussionInput.value);
formData.append(UNSTRUCTURED_ABSTRACT, unstructuredAbstractInput.value);
formData.append(AUTHORS_PREFIX, authorsPrefixInput.value);
formData.append(AUTHORS_FIRST_NAME, authorsFirstNameInput.value);
formData.append(AUTHORS_LAST_NAME, authorsLastNameInput.value);
formData.append(AUTHORS_MIDDLE_NAME, authorsMiddleNameInput.value);
formData.append(AUTHORS_HIGHEST_DEGREE, authorsHighestDegreeInput.value);
formData.append(AUTHORS_INSTITUTION, authorsInstitutionInput.value);
formData.append(INSTITUTION_CITY, institutionCityInput.value);
formData.append(INSTITUTION_COUNTRY, institutionCountryInput.value);
formData.append(AUTHORS_EMAIL, authorsEmailInput.value);
formData.append(AUTHORS_PHONENUMBER, authorsPhonenumberInput.value);
formData.append(AUTHORS_WHATSAPP_NUMBER, authorsWhatsappNumberInput.value);

    fetch(`${EndPoint}/uploadManuscript.php`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Log server response
        if(data === "Success"){
            alert("Upload Successful")
            window.location.href = "/public/dashboard/"
        }else[
            alert("Internal Server Error")
        ]
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
