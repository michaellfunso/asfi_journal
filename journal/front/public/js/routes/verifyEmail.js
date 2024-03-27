import { parentDirectoryName } from "./constants.js"
import { SendEmail } from "./email.js"
import { DeleteCookie, GetCookie, SetCookies, hoursToKeep } from "./setCookies.js"

const messageContainer = document.getElementById("messageContainer")
const EmailSent = GetCookie("EmailSent");

const getUser = JSON.parse(GetCookie("userData"))

// SEnd the EMail Once 
    if(GetCookie("userData")){
        const newArray = [getUser]
        
        
            if(newArray.length > 0 && newArray[0].first_name){
                const DateOJ = new Date().getFullYear()
                const newUserData = GetCookie("userData")
        
                const finalUserData = [JSON.parse(newUserData)]

              const FormDataValid= {
                    receiverEmail: finalUserData[0].email,
                    Year: DateOJ,
                    recipientName: `${finalUserData[0].first_name}  ${finalUserData[0].last_name}`,
                    subject: `Welcome to AlphaforexLyfe`,
                    message:  `
                                <div><img src="https://res.cloudinary.com/dll8awuig/image/upload/v1710946645/pf5b8n55pol5kvkpimfa.jpg" width=100% alt=www.alphaforexlyfe.com></div>
                                <h1>Hi there, ${finalUserData[0].first_name}</h1>
                                <h2>Thanks For Joining us,</h2>
                                <p>Please proceed to, verify your email, make a deposit and start earning.</p>
                                `,
                }
                if(EmailSent){
                    console.log("Email Already Sent") 
                 }else{
                    SendEmail(FormDataValid);
                    console.log(FormDataValid.receiverEmail)
                    SetCookies("EmailSent", "jakjajgenvaintpeinpknbjanbajenptkimbae", "Session")
                 }
              
        
        
        
                messageContainer.innerHTML = `<div>We sent an email to ${newArray[0].email}</div><br/>
                <div>Please Check to Verify your email address </div>`
            }else{
                window.location.href = `${parentDirectoryName}/user/register.html`
            }
        }else{
            window.location.href = `${parentDirectoryName}/user/register.html`
        }





