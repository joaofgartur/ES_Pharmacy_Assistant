import IFormsItem from "./IFormsItem.ts";
import "./FormItem.css"

function FormItem(props: IFormsItem) {
    return (
        <div className={"form-item-content"}>
            <h3>{props.title}</h3>
            <input type={props.input_type} placeholder={props.placeholder} name={props.name}/>
        </div>
    )
}

export default FormItem;