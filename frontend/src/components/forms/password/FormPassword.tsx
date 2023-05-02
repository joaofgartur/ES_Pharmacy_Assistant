import "./FormPassword.css"
import IFormItem from "../item/IFormsItem.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import FormItem from "../item/FormItem.tsx";

function FormPassword(props: IFormItem) {
    return (
        <div className={"form-item"}>
            <FontAwesomeIcon className={"form-item-icon"} icon={faLock} />
            <FormItem title={props.title} input_type={props.input_type} placeholder={props.placeholder} name={props.name}/>
        </div>
    )
}

export default FormPassword;