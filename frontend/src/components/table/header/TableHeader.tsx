import ITableHeader from "./ITableHeader.ts";
import "./TableHeader.css";

function TableHeader(props: ITableHeader) {
    return (
        <tr className={"table-header"}>
            {props.header.map((head, headID) => <th key={headID} >{head}</th>)}
        </tr>
    );
}

export default TableHeader;