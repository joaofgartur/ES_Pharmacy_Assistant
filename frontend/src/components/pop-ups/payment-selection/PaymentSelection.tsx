import Popup from "reactjs-popup";
import "./PaymentSelection.css"
import ColorButtonA from "../../buttons/color-button/ColorButtonA.tsx";
import {Link} from "react-router-dom";

interface IPaymentSection {
    code: string
}

function PaymentSelection(params: IPaymentSection) {
    return (
        <Popup trigger={<button className="button">Payment</button>} modal>
            <div className={"title"}>Select payment method</div>
            <div className={"payment-methods"}>
                <Link to={`/payment/faceid?id=${params.code}`}>
                    <ColorButtonA title={"Face recognition"} />
                </Link>
                <Link to={`/pay?id=${params.code}`}>
                    <ColorButtonA title={"Credit card"} />
                </Link>
                <Link to={`/pay?id=${params.code}`}>
                    <ColorButtonA title={"Cash"} />
                </Link>
            </div>
        </Popup>
    )
}

export default PaymentSelection;