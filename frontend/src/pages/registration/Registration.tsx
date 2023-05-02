import "./Registration.css"
import AuthForm from "../../components/forms/AuthForm.tsx";
function Registration() {
    return (
        <div className={"registration"}>
            <AuthForm type={"register"}/>
        </div>
    )
}

export default Registration;