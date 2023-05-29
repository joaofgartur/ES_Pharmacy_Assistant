import "./Pay.css"
import { v4 as uuidv4 } from 'uuid'
import AuthContainer from "../../containers/auth/AuthContainer.tsx";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AccountContext from "../../containers/page/AccountContext.ts";

function Pay() {

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

    const [paymentCode, setPaymentCode] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState('')
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const code = searchParams.get('id');
        setPaymentCode(`${code}`)
    }, [])

    useEffect(() => {
        if(!paymentCode) return
        fetch(`http://localhost:3000/payment/pay?id=${paymentCode}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'uuid': accountContext.account?.email!,
                Authorization: `Bearer ${accountContext.account!.token}`
            }
        }).then(res => res.json())
        .then(res => {
            console.log(res)
        })

        const id = setInterval(() => {
            fetch(`http://localhost:3000/payment/status?id=${paymentCode}`, {
                headers: {
                    Authorization: `Bearer ${accountContext.account!.token}`
                }
            })
            .then(res => res.json())
            .then(res => {
                setStatus(res.msg)
            })
        }, 1000)

        return () => clearInterval(id)
    }, [paymentCode])

    return (
        <AuthContainer>
            <div className={"pay"}>
                <div className="info">
                    {paymentCode ? status : 'Loading'}
                </div>
            </div>
        </AuthContainer>
    )
}

export default Pay;