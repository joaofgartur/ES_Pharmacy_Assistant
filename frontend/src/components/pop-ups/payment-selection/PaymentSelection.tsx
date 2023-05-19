import Popup from "reactjs-popup";
import "./PaymentSelection.css"
import ColorButtonA from "../../buttons/color-button/ColorButtonA.tsx";
import {Link} from "react-router-dom";

function PaymentSelection() {
    return (
        <Popup trigger={<button className="button">Payment</button>} modal>
            <div className={"title"}>Select payment method</div>
            <div className={"payment-methods"}>
                <Link to={"/payment/faceid"}>
                    <ColorButtonA title={"Face recognition"} />
                </Link>
                <Link to={"/sales"}>
                    <ColorButtonA title={"Credit card"} />
                </Link>
                <Link to={"/sales"}>
                    <ColorButtonA title={"Cash"} />
                </Link>
            </div>
        </Popup>
    )
}

export default PaymentSelection;