import "./FormUser.css"
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import IFormItem from "../item/IFormsItem.ts";
import FormItem from "../item/FormItem.tsx";

function FormUser(props: IFormItem) {
    return (
        <div className={"form-item"}>
            <FontAwesomeIcon className={"form-item-icon"} icon={faUser} />
            <FormItem title={props.title} input_type={props.input_type} placeholder={props.placeholder} name={props.name}/>
        </div>
    )
}

export default FormUser;