import INavbarLogo from "./INavbarLogo.ts";
import "./NavbarLogo.css"

function NavbarLogo(props: INavbarLogo) {
    return (
        <div className={"navbar-logo"}>
            { props.title }
        </div>
    )
}

export default NavbarLogo;