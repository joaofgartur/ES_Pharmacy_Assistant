import IClientDetails from "./IClientDetails.ts";
import "./ClientDetails.css"
import ClientDetailsItem from "./item/ClientDetailsItem.tsx";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import {faPhone} from "@fortawesome/free-solid-svg-icons";

function ClientDetails(props: IClientDetails) {
    return (
        <div className={"client-details"}>
            <div className={"top"}>
                <img src={props.photo} alt="Lamp" />
                <div className={"client-name"}>
                    <h2>{props.name}</h2>
                </div>
            </div>
            <div className={"bottom"}>
                <ClientDetailsItem data={props.email} icon={faEnvelope}/>
                <ClientDetailsItem data={props.phoneNumber} icon={faPhone}/>
            </div>
        </div>
    )
}

export default ClientDetails;