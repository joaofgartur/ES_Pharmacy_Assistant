import "./Login.css"
import AuthForm from "../../components/forms/AuthForm.tsx";
import {useContext, useEffect} from "react";
import AccountContext from "../../containers/page/AccountContext.ts";
function Login() {

    const account = useContext(AccountContext);

    useEffect(() => {
        console.log(account)
    }, [])

    return (
        <div className={"login"}>
            <AuthForm type={"login"}/>
        </div>
    )
}

export default Login;