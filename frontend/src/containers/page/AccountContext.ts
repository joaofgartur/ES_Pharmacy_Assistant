import {createContext} from "react";
import IAccount from "./IAccount";
import * as React from "react";

interface IAccountContext {
    account: IAccount | undefined;
    setAccount: React.Dispatch<React.SetStateAction<IAccount | undefined>>
}

const AccountContext = createContext<IAccountContext>({} as IAccountContext)

export default AccountContext
