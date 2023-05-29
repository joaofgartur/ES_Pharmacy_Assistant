import ITable from "./ITable.ts";
import "./Table.css"

function Table(props: ITable) {
    return (
        <table className={"table"}>
            <thead>
                <tr className={"table-header"}>
                    {
                        props.checklist_column ? <th>Generic</th> : undefined
                    }
                    {props.header.header.map((head, headID) => <th key={headID} >{head}</th>)}
                </tr>
            </thead>
            <tbody>
            {
                props.body.map((row, index) =>
                    <tr key={index} className={"table-row"}>
                        {
                            props.checklist_column ? <td><input type="checkbox"/></td> : undefined
                        }
                        {row.content.map((val, rowID) => <td className={"cell"} key={rowID}>{val}</td>)}
                    </tr>
                )
            }
            </tbody>
        </table>
    );
}

export default Table;