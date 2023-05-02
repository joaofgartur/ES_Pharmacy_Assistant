import "./FormEmail.css"
import IFormItem from "../item/IFormsItem.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FormItem from "../item/FormItem.tsx";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";

function FormEmail(props: IFormItem) {
    return (
        <div className={"form-item"}>
            <FontAwesomeIcon className={"form-item-icon"} icon={faEnvelope} />
            <FormItem title={props.title} input_type={props.input_type} placeholder={props.placeholder} name={props.name}/>
        </div>
    )
}

export default FormEmail