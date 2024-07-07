import { GetParameters, parentDirectoryName, submissionsEndpoint } from "../constants.js";

const InvitationFor = GetParameters(window.location.href).get("do")
const email = GetParameters(window.location.href).get('e')
const ArticleId = GetParameters(window.location.href).get('a')
const Accept = GetParameters(window.location.href).get("accept")
const Reject = GetParameters(window.location.href).get("reject")
let Action = ""




if(InvitationFor && email && ArticleId && (Accept || Reject)){
    if(Accept){
        Action = 'accept'
    }else if(Reject){
        Action = 'reject'
    }
    if(InvitationFor === "edit"){

    fetch(`${submissionsEndpoint}/backend/editors/invitations?u_id=${email}&a_id=${ArticleId}&invite_for=${InvitationFor}&action=${Action}`, {
        method:"GET",
    }).then(res=>res.json())
    .then(data=>{
        if(data.status === "success"){
            alert(data.message)
            window.location.href = `${parentDirectoryName}portal/editorSignup/?e=${email}`
        }else{
            alert(data.message)
        }
    })
    }else{
        console.log(InvitationFor)
    }
}else{
    window.location.href = `${parentDirectoryName}/dashboard/login`
}