import Popup from "reactjs-popup";
import "./PaymentSelection.css"
import ColorButtonA from "../../buttons/color-button/ColorButtonA.tsx";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";

function PaymentSelection() {

    const [payment, setPayment] = useState('')

    useEffect(() => {
        const uuid = localStorage.getItem('payment_code')
        console.log(uuid)
        if(uuid)
            setPayment(uuid)
    }, [])

    return (
        <Popup trigger={<button className="button">Payment</button>} modal>
            <div className={"title"}>Select payment method</div>
            <div className={"payment-methods"}>
                <Link to={"/payment/faceid"}>
                    <ColorButtonA title={"Face recognition"} />
                </Link>
                <Link to={`/pay/${payment}`}>
                    <ColorButtonA title={"Credit card"} />
                </Link>
                <Link to={`/pay/${payment}`}>
                    <ColorButtonA title={"Cash"} />
                </Link>
            </div>
        </Popup>
    )
}

export default PaymentSelection;