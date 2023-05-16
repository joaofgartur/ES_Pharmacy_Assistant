import IClientDetailsItem from "./IClientDetailsItem.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./ClientDetailsItem.css"

function ClientDetailsItem(props: IClientDetailsItem) {
    return (
        <div className={"client-details-item"}>
            <FontAwesomeIcon className={"icon"} icon={props.icon} />
            <p> {props.data} </p>
        </div>
    )
}

export default ClientDetailsItem;