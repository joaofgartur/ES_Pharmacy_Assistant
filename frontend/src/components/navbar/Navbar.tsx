import './Navbar.css'
import NavbarItem from "./item/NavbarItem.tsx";
import NavbarLogo from "./logo/NavbarLogo.tsx";
import ButtonA from "./buttons/ButtonA.tsx";
import ButtonB from "./buttons/ButtonB.tsx";
import NavbarUser from "./user/NavbarUser.tsx";
import {useEffect, useState} from "react";

function Navbar() {
    const [user , setUser] = useState("");

    useEffect(() => {
        setUser("asd");
    }, []);

    return (
        <div className={"navbar"}>
            <div className={"left"}>
                <NavbarLogo to={"/"} title={"SmartPharmacy"} />
            </div>
            <div className={"right"}>
                <div className={"right-content"}>
                    {
                        user.length ?
                            <NavbarItem to={"/prescription"} title={"Scan QR"} />
                            :
                            undefined
                    }
                    <NavbarItem to={"/contact"} title={"Contact"} />
                    <NavbarItem to={"/about"} title={"About"}/>
                    {
                        user.length ?
                            <NavbarUser to={"/user"} title={user}/>
                            :
                            <ButtonA to={"/register"} title={"Sign Up"}/>
                    }
                    {
                        user.length ?
                            undefined
                            :
                            <ButtonB to={"/login"} title={"Login"}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
