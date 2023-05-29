import {useContext, useEffect, useState} from "react";
import AccountContext from "../page/AccountContext.ts";
import IAuthContainer from "./IAuthContainer.ts";
import {Navigate} from "react-router-dom";

function AuthContainer(props: IAuthContainer) {

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
        !accountContext.account && !loaded ? <div></div>
        : accountContext.account ? props.children
        : <Navigate to={'/login'}></Navigate>
    )

}

export default AuthContainer
