import "./NavbarButtons.css"
import {Link} from "react-router-dom";
import INavbarButton from "./INavbarButton.ts";

function ButtonB(props: INavbarButton) {
    return (
        <Link to={props.to} className={"navbar-item navbar-button button-B"}>
            <div className={"navbar-item-content"}>
                { props.title }
            </div>
        </Link>
    )
}

export default ButtonB;