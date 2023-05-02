import './Navbar.css'
import NavbarItem from "./item/NavbarItem.tsx";
import NavbarLogo from "./logo/NavbarLogo.tsx";
import NavbarButtonA from "./buttons/NavbarButtonA.tsx";
import NavbarButtonB from "./buttons/NavbarButtonB.tsx";
import NavbarUser from "./user/NavbarUser.tsx";
import {useEffect, useState} from "react";

function Navbar() {
    const [user , setUser] = useState("");

    useEffect(() => {
        setUser("");
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
                            <NavbarItem to={"/prescribe"} title={"Prescribe"} />
                            :
                            undefined
                    }
                    <NavbarItem to={"/contact"} title={"Contact"} />
                    <NavbarItem to={"/about"} title={"About"}/>
                    {
                        user.length ?
                            <NavbarUser to={"/user"} title={user}/>
                            :
                            <NavbarButtonA to={"/register"} title={"Sign Up"}/>
                    }
                    {
                        user.length ?
                            undefined
                            :
                            <NavbarButtonB to={"/login"} title={"Login"}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
