import "./FaceRecognitionNoCamera.css";
import React, {useContext, useEffect, useState} from "react";
import {faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import IClientDetails from "../../../components/client-details/IClientDetails.ts";
import {Link, useSearchParams} from "react-router-dom";
import ClientDetailsItem from "../../../components/client-details/item/ClientDetailsItem.tsx";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import AccountContext from "../../../containers/page/AccountContext.ts";

const initialClient: IClientDetails = {
    name: "",
    phone: "",
    email: "",
    photo: "",
};

function FaceRecognitionNoCamera() {
    const [client, setClient] = useState<IClientDetails>(initialClient);
    const [image, setImage] = useState<File | undefined>(undefined);
    const [clientImage, setClientImage] = useState<Blob>()

    const accountContext = useContext(AccountContext)
    const [loaded, setLoaded] = useState(false);

    const [searchParams] = useSearchParams()
    const [paymentCode, setPaymentCode] = useState<string | undefined>(undefined);

    useEffect(() => {
        const code = searchParams.get('id');
        setPaymentCode(`${code}`)
    }, [])

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

    useEffect(() => {
        if(!image) return;

        let formData = new FormData();
        formData.append('file', image);

        fetch('http://localhost:3000/face/find', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accountContext.account!.token}`
            },
            body: formData
        }).then(res => {
            if(res.status !== 200)
                setClient(initialClient)
                setClientImage(undefined)
            return res.json()
        })
        .then(res => {
            if(res.success) {
                const blob = new Blob(res.client.photo.data)
                res.client.photo = URL.createObjectURL(blob)
                console.log(res.client.photo)
                setClient(res.client)
            }
        })
    }, [image]);

    useEffect(() => {
        if(!client.email) return
        fetch(`http://localhost:3000/face/get?email=${client.email}`, {
            headers: {
                Authorization: `Bearer ${accountContext.account!.token}`
            }
        })
        .then(r => r.blob())
        .then(r => {
            setClientImage(r)
            console.log(r)
        })
    }, [client])

    return (
        <div className={"face-recognition-container"}>
            <div className={"face-recognition"}>
                <div className={"left"}>
                    <div className={"camera-sect"}>
                        <div className={"camera-container"}>
                            <label>
                                {image ? <img src={URL.createObjectURL(image)}/> : <img></img>}
                            <input type="file" accept="image/png, image/jpg, image/jpeg" hidden onChange={(e) => setImage(e.target.files![0])}/>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={"right"}>
                    <div className={"title"}>
                        <h2>Client Informations</h2>
                    </div>
                    <div className={"infos-container"}>
                        {
                            client.name ?
                                <div className={"client-profile"}>
                                    {
                                        clientImage ?
                                        <img className={"photo"} src={URL.createObjectURL(clientImage)} alt="Lamp" />
                                        :
                                        <img className={"photo"} alt="Lamp" />
                                    }
                                    <div className={"right-sect"}>
                                        <div className={"infos"}>
                                            <ClientDetailsItem data={client.name} icon={faUser}/>
                                            <ClientDetailsItem data={client.email} icon={faEnvelope}/>
                                            <ClientDetailsItem data={client.phone} icon={faPhone}/>
                                        </div>
                                        <div className={"controllers"}>
                                            <Link to={`/pay?id=${paymentCode}`}>
                                                <button className={"color-button-B"}>Confirm</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className={"no-infos"}>
                                    No informations to display
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FaceRecognitionNoCamera;