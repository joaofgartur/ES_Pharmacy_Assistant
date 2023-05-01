import { Link } from "react-router-dom";
import INavbarLogo from "./INavbarLogo.ts";
import "./NavbarLogo.css"

function NavbarLogo(props: INavbarLogo) {
    return (
        <Link to={props.to} className={"navbar-logo"}>
            <div className={"navbar-logo-content"}>
                { props.title }
            </div>
        </Link>
    )
}

export default NavbarLogo;