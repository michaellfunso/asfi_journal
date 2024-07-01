import { GetParameters, submissionsEndpoint } from "../constants.js";
const reviewsContainer = document.getElementById("reviewsContainer")
const ArticlesId = GetParameters(window.location.href).get("a")

// Fetch Reviews 
fetch(`${submissionsEndpoint}/backend/accounts/manuscriptReviews.php`, {
    method:"POST",
    body:JSON.stringify({id:ArticlesId}),
    headers:{
        "Content-type" : "application/JSON"
    }
}).then(res => res.json())
.then(data =>{
    if(data){
        const reviewsList = data.reviews
        if(reviewsList.length > 0){
        reviewsList.forEach(review => {
            const OverallRating = new Number(review.novelty_score) + new Number(review.quality_score) + new Number(review.scientific_accuracy_score) + new Number(review.overall_merit_score) + new Number(review.english_level_score)
           
            const SpecificSCore = new Number(review.accurately_reflect_manuscript_subject_score) + new Number(review.clearly_summarize_content_score) + new Number(review.presents_what_is_known_score) + new Number(review.gives_accurate_summary_score) + new Number(review.purpose_clear_score) + new Number(review.method_section_clear_score) + new Number(review.study_materials_clearly_described_score) + new Number(review.research_method_valid_score) + new Number(review.ethical_standards_score) + new Number(review.study_find_clearly_described_score) + new Number(review.result_presented_logical_score) + new Number(review.graphics_complement_result_score) + new Number(review.table_follow_specified_standards_score) + new Number(review.tables_add_value_or_distract_score) + new Number(review.issues_with_title_score) + new Number(review.manuscript_present_summary_of_key_findings_score) + new Number(review.manuscript_highlight_strength_of_study_score) + new Number(review.manuscript_compare_findings_score) + new Number(review.manuscript_discuss_meaning_score) + new Number(review.manuscript_describes_overall_story_score) + new Number(review.conclusions_reflect_achievement_score) + new Number(review.manuscript_describe_gaps_score) + new Number(review.referencing_accurate_score)


            reviewsContainer.innerHTML += `         <tr id="queue_0" name="queue_0" role="row" class="odd">
                         
                                <td data-label="status">              
                                         <div>
                                             <p>
                                                 <a role="link" tabindex="0" data-title="test" id="contactJournalLnk" data-abstract="test" data-id="xik_HqzhLis2ey4NyZxowgCdfEwB7DoB64Umc9Bp7CgUjXzc" data-documentno="thoraxjnl-2020-215540.R2" data-toggle="modal" href="mailto:submissions@asfirj.org" onclick="" data-inviteemail="0" hidefocus="true" style="outline: none;"><i class="fa fa-envelope-o"></i> Contact Journal</a>
                                             </p>
                                         </div>
                                         <ul>
                                             <li>${review.review_id}</li>
                                         </ul>
                               
                                       <br>
                                          <a role="link" tabindex="0" href="../reviewcontent?a=${review.review_id}" hidefocus="true" style="outline: none;">  
                                              Details
                                          </a>    
                                         
                                     </td>
                                     <td>${review.reviewer_email}</td>
                         
                                     <td data-label="ID">${SpecificSCore}/115
                                     
                                     </td>
                                                           
                                     <td data-label="title" style="white-space:pre-wrap">${OverallRating}/20
                                    
                              </td>

                            
                                </tr>`
            
        });
    }else{
        reviewsContainer.innerHTML = `<tr><td>No Reviews Available For this Article </td></tr>`
    }
    }else{
        alert("Could Not Retrieve Data")
        console.log(data.status)
        console.log(data.message)
    }
})