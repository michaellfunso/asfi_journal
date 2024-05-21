import { GetCookie } from "./setCookies.js";
import { getTransactions } from "./transactions/getTranscations.js";
import { ValidateLogin } from "./vaidateLogin.js";

const uid = GetCookie("u_id")

ValidateLogin()
getTransactions(uid)