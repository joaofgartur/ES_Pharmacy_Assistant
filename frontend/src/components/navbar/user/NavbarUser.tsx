import "./NavbarUser.css"
import {Link} from "react-router-dom";
import INavbarUser from "./INavbarUser.ts";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
function NavbarUser(props: INavbarUser) {
    return (
        <div className={"navbar-item navbar-user"}>
            <FontAwesomeIcon icon={faUser} />
            <Link to={props.to} className={"navbar-user-content"}>
                <div className={"navbar-item-content"}>
                    { props.title }
                </div>
            </Link>
        </div>

    )
}

export default NavbarUser;