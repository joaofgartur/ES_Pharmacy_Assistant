import "./Sales.css"
import ITableHeader from "../../components/table/header/ITableHeader.ts";
import ITableRow from "../../components/table/row/ITableRow.ts";
import Table from "../../components/table/Table.tsx";
import { useContext, useEffect, useState } from "react";
import AccountContext from "../../containers/page/AccountContext.ts";

const header: ITableHeader = {
    header: ["Sale", "Value", "Delivery Status"]
};

const body: Array<ITableRow> = [
    { id: 0, content: ['Aspirin', '2 tablets', 'Twice a day'] },
    { id: 1, content: ['Ibuprofen', '1 tablet', 'Every 4 hours'] },
    { id: 2, content: ['Paracetamol', '1 tablet', 'Three times a day'] },
    { id: 3, content: ['Amoxicillin', '1 capsule', 'Once a day'] },
    { id: 4, content: ['Loratadine', '1 tablet', 'Once daily'] },
    { id: 5, content: ['Omeprazole', '1 capsule', 'Once daily'] },
    { id: 6, content: ['Simvastatin', '1 tablet', 'At bedtime'] },
    { id: 7, content: ['Metformin', '2 tablets', 'Twice a day'] },
    { id: 8, content: ['Sertraline', '1 tablet', 'Once daily'] },
    { id: 9, content: ['Prednisone', '1 tablet', 'Once daily'] },
    { id: 10, content: ['Acetaminophen', '1 tablet', 'Every 6 hours'] },
    { id: 11, content: ['Ciprofloxacin', '1 tablet', 'Twice a day'] },
    { id: 12, content: ['Losartan', '1 tablet', 'Once daily'] },
    { id: 13, content: ['Atorvastatin', '1 tablet', 'Once daily'] },
    { id: 14, content: ['Fluoxetine', '1 capsule', 'Once daily'] },
    { id: 15, content: ['Warfarin', '1 tablet', 'Once daily'] },
    { id: 16, content: ['Metoprolol', '1 tablet', 'Twice a day'] },
    { id: 17, content: ['Levothyroxine', '1 tablet', 'Once daily'] },
    { id: 18, content: ['Cetirizine', '1 tablet', 'Once daily'] },
    { id: 19, content: ['Gabapentin', '1 capsule', 'Three times a day'] },
];

function Sales() {
    const accountContext = useContext(AccountContext)
    const [loaded, setLoaded] = useState(false);
    const [orders, setOrders] = useState<any>([])

    useEffect(() => {
        const data = localStorage.getItem('account')
        console.log(data)
        if(data)
            accountContext.setAccount(JSON.parse(data))
    }, [])

    useEffect(() => {
        console.log(accountContext.account)
        setLoaded(true)
    }, [accountContext.account])

    function getOrders() {
        fetch('http://localhost:3000/payment/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accountContext.account!.token}`
            },
        }).then(res => res.json())
            .then(res => {
                let ords = []
                for(let order of res) {
                    let parsed = []
                    let id = 0
                    for(let item of order.order) {
                        parsed.push({id, content: [item.name, item.quantity, item.frequency]})
                        id++
                    }
                    ords.push({
                        id: order.id,
                        status: order.status,
                        payed: order.payed,
                        items: parsed
                    })
                }
                setOrders(ords)
            })
    }


    useEffect(() =>  {
        if(accountContext.account?.token) {
            getOrders()
        }
    }, [loaded])

    return(
        <div className={"container"}>
            <div className={"left"}>
                <div className={"title"}>
                    <h2>Pharmacy robot</h2>
                </div>
                <div className={"stats"}>

                </div>
            </div>
            <div className={"bar"}></div>
            <div className={"right"}>
                <div className={"title"}>
                    <h2>All sales</h2>
                </div>
                {
                    orders.map((order: any, index: any) =>
                    <div key={index} className={"table-sect"}>
                        <p>Order ID: {order.id}</p>
                        <p>Order Payed: {order.payed ? 'YES' : 'NO'}</p>
                        <p>Order Status: {order.status}</p>
                        <Table checklist_column={false} header={header} body={order.items}/>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Sales;