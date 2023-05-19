import IFormsItem from "./IFormsItem.ts";
import "./FormItem.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function FormItem(props: IFormsItem) {
    return (
        <div className={"form-item"}>
            <FontAwesomeIcon className={"form-item-icon"} icon={props.icon} />
                <div className={"form-item-content"}>
                    <h3>{props.title}</h3>
                    <input type={props.input_type} placeholder={props.placeholder} name={props.name}/>
                </div>
        </div>
    )
}

export default FormItem;