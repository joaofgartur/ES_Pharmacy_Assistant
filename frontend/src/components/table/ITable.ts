import ITableHeader from "./header/ITableHeader.ts";

interface ITable {
    header: ITableHeader;
    body: Array<ITableRow>;
}

export default ITable;