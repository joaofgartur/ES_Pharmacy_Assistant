import './Navbar.css'
import NavbarItem from "./item/NavbarItem.tsx";
import NavbarLogo from "./logo/NavbarLogo.tsx";
import ButtonA from "../buttons/color-button/ColorButtonA.tsx";
import ColorButtonB from "../buttons/color-button/ColorButtonB.tsx";
import {useContext, useEffect, useState} from "react";
import SimpleButton from "../buttons/simple-button/SimpleButton.tsx";
import ButtonWithIcon from "../buttons/button-with-icon/ButtonWithIcon.tsx";
import AccountContext from '../../containers/page/AccountContext.ts';

function Navbar() {
    const accountContext = useContext(AccountContext)
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const data = localStorage.getItem('account')
        console.log(data)
        if(data)
            accountContext.setAccount(JSON.parse(data))
    }, [])

    useEffect(() => {
        console.log(accountContext.account)
        setLoaded(true)
    }, [accountContext.account])

    return (
        <div className={"navbar"}>
            <div className={"left"}>
                <NavbarItem to={"/"} className={""}>
                    <NavbarLogo title={"SmartPharmacy"} />
                </NavbarItem>
            </div>
            <div className={"right"}>
                {
                    accountContext.account ?
                        <NavbarItem to={"/prescription"} className={""}>
                            <SimpleButton title={"Scan QR"}/>
                        </NavbarItem>
                        :
                        undefined
                }
                {
                    accountContext.account &&
                    <NavbarItem to={"/sales"} className={""}>
                        <SimpleButton title={"Sales"}/>
                    </NavbarItem>
                }
                {
                    accountContext.account ?
                        <NavbarItem to={"/logout"} className={""}>
                            <ButtonWithIcon title={accountContext.account.email!}/>
                        </NavbarItem>
                        :
                        <NavbarItem to={"/register"} className={""}>
                            <ButtonA title={"Sign Up"}/>
                        </NavbarItem>
                }
                {
                    accountContext.account ?
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
