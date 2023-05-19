import "../Buttons.css"
import "./ColorButton.css"
import IButton from "../IButton.ts";

function ColorButtonA(props: IButton) {
    return (
        <button className={"color-button-A"}>
            {props.title}
        </button>
    )
}

export default ColorButtonA;