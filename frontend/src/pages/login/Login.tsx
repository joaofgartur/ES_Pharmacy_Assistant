import "./Login.css"
import AuthForm from "../../components/forms/AuthForm.tsx";
import {useContext, useEffect, useState} from "react";
import AccountContext from "../../containers/page/AccountContext.ts";
import { Navigate } from "react-router-dom";
function Login() {

    const account = useContext(AccountContext);

    useEffect(() => {
        console.log(account)
    }, [])

    const accountContext = useContext(AccountContext)
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const data = localStorage.getItem('account')
        console.log(data)
        if(data)
            accountContext.setAccount(JSON.parse(data))
    }, [])

    useEffect(() => {
        console.log(accountContext.account)
        setLoaded(true)
    }, [accountContext.account])

    return (
        !loaded ? undefined
        :
        !accountContext.account ?
            <div className={"login"}>
                <AuthForm type={"login"}/>
            </div>
        : <Navigate to={'/prescription'}></Navigate>
    )
}

export default Login;