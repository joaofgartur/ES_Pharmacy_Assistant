import "./Registration.css"
import AuthForm from "../../components/forms/AuthForm.tsx";
import AuthContainer from "../../containers/auth/AuthContainer.tsx";
function Registration() {
    return (
        <AuthContainer>
            <div className={"registration"}>
                <AuthForm type={"register"}/>
            </div>
        </AuthContainer>
    )
}

export default Registration;