import './Navbar.css'
import NavbarItem from "./item/NavbarItem.tsx";

function Navbar() {
    return (
        <div className={"navbar"}>
            <NavbarItem to={"/"} title={"Home"} />
            <NavbarItem to={"/login"} title={"Login"} />
        </div>
    )
}

export default Navbar
