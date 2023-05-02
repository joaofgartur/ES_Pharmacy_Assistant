import "./Login.css"
import AuthForm from "../../components/forms/AuthForm.tsx";
function Login() {
    return (
        <div className={"login"}>
            <AuthForm type={"login"}/>
        </div>
    )
}

export default Login;