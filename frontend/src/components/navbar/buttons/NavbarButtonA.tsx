import "./NavbarButtons.css"
import {Link} from "react-router-dom";
import INavbarButton from "./INavbarButton.ts";

function NavbarButtonA(props: INavbarButton) {
    return (
        <Link to={props.to} className={"navbar-item navbar-button button-A"}>
            <div className={"navbar-item-content"}>
                { props.title }
            </div>
        </Link>
    )
}

export default NavbarButtonA;