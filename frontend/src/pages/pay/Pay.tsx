import "./Pay.css"
import AuthContainer from "../../containers/auth/AuthContainer.tsx";

function Pay() {
    return (
        <AuthContainer>
            <div className={"pay"}>
                <div className="info">
                    Loading...
                </div>
            </div>
        </AuthContainer>
    )
}

export default Pay;