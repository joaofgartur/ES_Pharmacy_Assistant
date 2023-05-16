import ITable from "./ITable.ts";
import TableHeader from "./header/TableHeader.tsx";
import TableRow from "./row/TableRow.tsx";
import "./Table.css"

function Table(props: ITable) {
    return (
        <table className={"table"}>
            <thead>
                <TableHeader header={props.header.header}/>
            </thead>
            <tbody>
            {
                props.body.map(row => <TableRow id={row.id} content={row.content}/>)
            }
            </tbody>
        </table>
    );
}

export default Table;