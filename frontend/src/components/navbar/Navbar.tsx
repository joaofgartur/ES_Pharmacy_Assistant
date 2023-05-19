import './Navbar.css'
import NavbarItem from "./item/NavbarItem.tsx";
import NavbarLogo from "./logo/NavbarLogo.tsx";
import ButtonA from "../buttons/color-button/ColorButtonA.tsx";
import ColorButtonB from "../buttons/color-button/ColorButtonB.tsx";
import {useEffect, useState} from "react";
import SimpleButton from "../buttons/simple-button/SimpleButton.tsx";
import ButtonWithIcon from "../buttons/button-with-icon/ButtonWithIcon.tsx";

function Navbar() {
    const [user , setUser] = useState("");

    useEffect(() => {
        setUser("");
    }, []);

    return (
        <div className={"navbar"}>
            <div className={"left"}>
                <NavbarItem to={"/"} className={""}>
                    <NavbarLogo title={"SmartPharmacy"} />
                </NavbarItem>
            </div>
            <div className={"right"}>
                {
                    user.length ?
                        <NavbarItem to={"/prescription"} className={""}>
                            <SimpleButton title={"Scan QR"}/>
                        </NavbarItem>
                        :
                        undefined
                }
                <NavbarItem to={"/contact"} className={""}>
                    <SimpleButton title={"Contact"}/>
                </NavbarItem>
                <NavbarItem to={"/about"} className={""}>
                    <SimpleButton title={"About"}/>
                </NavbarItem>
                {
                    user.length ?
                        <NavbarItem to={"/user"} className={""}>
                            <ButtonWithIcon title={user}/>
                        </NavbarItem>
                        :
                        <NavbarItem to={"/register"} className={""}>
                            <ButtonA title={"Sign Up"}/>
                        </NavbarItem>
                }
                {
                    user.length ?
                        undefined
                        :
                        <NavbarItem to={"/login"} className={""}>
                            <ColorButtonB title={"Login"}/>
                        </NavbarItem>
                }
            </div>
        </div>
    )
}

export default Navbar
