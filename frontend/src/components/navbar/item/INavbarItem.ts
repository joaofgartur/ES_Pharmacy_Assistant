import { To } from "react-router-dom";

interface INavbarItem {
    to: To,
    className: string,
    children: string | JSX.Element | JSX.Element[]
}

export default INavbarItem;