import "../Buttons.css"
import "./ColorButton.css"
import IButton from "../IButton.ts";

function ColorButtonB(props: IButton) {
    return (
        <button className={"color-button-B"}>
            {props.title}
        </button>
    )
}

export default ColorButtonB;