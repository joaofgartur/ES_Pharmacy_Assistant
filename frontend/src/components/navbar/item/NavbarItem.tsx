import './NavbarItem.css';
import { Link } from "react-router-dom";
import INavbarItem from "./INavbarItem.ts";

function NavbarItem(props: INavbarItem) {
    return (
        <Link to={props.to} className={"navbar-item"}>
            <div className={"navbar-item-content"}>
                { props.title }
            </div>
        </Link>
    )
}

export default NavbarItem;