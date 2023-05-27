import IPageContainer from "./IPageContainer.ts";
import Navbar from "../../components/navbar/Navbar.tsx";
import "./PageContainer.css"
import { useState } from "react";
import IAccount from "./IAccount";
import AccountContext from "./AccountContext";

function PageContainer(props: IPageContainer) {

    const [account, setAccount] = useState<IAccount | undefined>(undefined)

    return (
        <AccountContext.Provider value={ { account, setAccount } }>
            <div className={"page-container"}>
                <Navbar />
                { props.children }
            </div>
        </AccountContext.Provider>
    )
}

export default  PageContainer
