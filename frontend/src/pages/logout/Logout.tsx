import { useContext, useEffect } from "react"
import AccountContext from "../../containers/page/AccountContext"
import { Navigate } from "react-router-dom"

function Logout() {

    const accountContext = useContext(AccountContext)

    useEffect(() => {
        localStorage.removeItem('account')
        accountContext.setAccount(undefined)
    }, [])

    return (
        <Navigate to='/login'></Navigate>
    )

}

export default Logout
