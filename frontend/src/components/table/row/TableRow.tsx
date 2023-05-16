import "./TableRow.css"
function TableRow(props: ITableRow) {

    return (
        <tr className={"table-row"}>
            {props.content.map((val, rowID) => <td key={rowID}>{val}</td>)}
        </tr>
    );
}

export default TableRow;