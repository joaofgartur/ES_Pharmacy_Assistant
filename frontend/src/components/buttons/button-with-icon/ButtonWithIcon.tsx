import IButton from "../IButton.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import "./ButtonWithIcon.css"

function ButtonWithIcon(props: IButton) {
    return (
        <div className={"user-button"}>
            <FontAwesomeIcon icon={faUser} />
            <button>
                {props.title}
            </button>
        </div>
    )
}

export default ButtonWithIcon;