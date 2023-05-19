import ITableHeader from "./header/ITableHeader.ts";
import ITableRow from "./row/ITableRow.ts";

interface ITable {
    header: ITableHeader;
    body: Array<ITableRow>;
    checklist_column: boolean;
}

export default ITable;