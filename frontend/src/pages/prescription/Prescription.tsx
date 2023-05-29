import "./Prescription.css"
import {useEffect, useState} from "react";
import ClientDetails from "../../components/client-details/ClientDetails.tsx";
import Table from "../../components/table/Table.tsx";
import ITableHeader from "../../components/table/header/ITableHeader.ts";
import ITableRow from "../../components/table/row/ITableRow.ts";
import PaymentSelection from "../../components/pop-ups/payment-selection/PaymentSelection.tsx";

function Prescription() {
    const [clientName, setClientName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState('')

    const header: ITableHeader = {
        header: ["Name", "Quantity", "Dosage"]
    };

    const [body, setBody] = useState<ITableRow[]>([])

    /*const body: Array<ITableRow> = [
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
    ];*/

    function scanQR() {
        fetch('http://localhost:3000/qr/scan', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(res => {
                let parsed = []
                let id = 0
                for(let item of res.purchase) {
                    parsed.push({id, content: [item.name, item.quantity, item.frequency]})
                    id++
                }
                setCode(res.payment_code)
                setBody(parsed)
            })
    }


    useEffect(() =>  {
        setClientName("Bill Doors");
        setPhoneNumber("966699444");
        setEmail("billdoors@gmail.com");
        scanQR()
    }, [])

    return(
        <div className={"prescription"}>
            <div className={"prescription-container"}>
                <div className={"left"}>
                    <ClientDetails name={clientName} email={email} phoneNumber={phoneNumber} photo={"https://www.azquotes.com/picture-quotes/quote-bill-door-was-impressed-miss-flitworth-could-actually-give-the-word-revenue-which-had-terry-pratchett-34-91-11.jpg"}/>
                </div>
                <div className={"right"}>
                    <div className={"prescription-details"}>
                        <div className={"title"}>
                            <h1>PRESCRIBED DRUGS</h1>
                            <div className={"bar"}></div>
                        </div>
                        <div className={"table-sect"}>
                            <Table checklist_column={true} header={header} body={body}/>
                        </div>
                    </div>
                    <div className={"button-sect"}>
                        <PaymentSelection code={code}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Prescription;