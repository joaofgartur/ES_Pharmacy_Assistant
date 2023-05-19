import IButton from "../IButton.ts";
import "./SimpleButton.css"

function SimpleButton(props: IButton) {
    return (
        <button className={"simple-button"}>
            {props.title}
        </button>
    )
}

export default SimpleButton;