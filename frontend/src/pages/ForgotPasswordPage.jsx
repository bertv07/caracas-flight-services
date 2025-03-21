import ForgotPasswordForm from "../components/auth/ForgotPasswordForm"
import "../styles/auth.css"
import NavBar from "../components/auth/navBarAuth"
export default function ForgotPasswordPage() {
  return(
    <div>
      <NavBar></NavBar>
      <ForgotPasswordForm /> 
    </div>
  )
}

