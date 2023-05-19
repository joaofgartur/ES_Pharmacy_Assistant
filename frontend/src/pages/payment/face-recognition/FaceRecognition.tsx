import "./FaceRecognition.css";
import React, {useCallback, useState} from "react";
import Webcam from "react-webcam";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons/faRotateRight";
import {faCamera, faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import IClientDetails from "../../../components/client-details/IClientDetails.ts";
import {Link} from "react-router-dom";
import ClientDetailsItem from "../../../components/client-details/item/ClientDetailsItem.tsx";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";

const initialClient: IClientDetails = {
    name: "",
    phoneNumber: "",
    email: "",
    photo: "",
};

function FaceRecognition() {
    const [webcamActive, setWebcamActive] = useState(true);
    const [client, setClient] = useState<IClientDetails>(initialClient);
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const screenshot = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        setWebcamActive(false);
        console.log(imgSrc)

        console.log("recognizing client...")

        const newClient: IClientDetails = {
            name: "Bill Doors",
            phoneNumber: "91231231",
            email: "uhaujbasdnfa@dfauiagui.cass",
            photo: "https://www.azquotes.com/picture-quotes/quote-bill-door-was-impressed-miss-flitworth-could-actually-give-the-word-revenue-which-had-terry-pratchett-34-91-11.jpg"
        }

        setClient(newClient);
    }, [webcamRef, setImgSrc]);

    const resetCamera = () => {
        setClient(initialClient);
        setWebcamActive(true);
    }

    return (
        <div className={"face-recognition-container"}>
            <div className={"face-recognition"}>
                <div className={"left"}>
                    <div className={"camera-sect"}>
                        <div className={"camera-container"}>
                            {
                                webcamActive ?
                                    <Webcam
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                    />
                                    :
                                    imgSrc ? <img src={imgSrc} alt={"ups"}/> : undefined
                            }
                        </div>
                        <div className={"controllers"}>
                            {
                                webcamActive ?
                                    <FontAwesomeIcon icon={faCamera} onClick={screenshot}/>
                                    :
                                    <FontAwesomeIcon icon={faRotateRight} onClick={resetCamera}/>
                            }
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
                                    <img className={"photo"} src={client.photo} alt="Lamp" />
                                    <div className={"right-sect"}>
                                        <div className={"infos"}>
                                            <ClientDetailsItem data={client.name} icon={faUser}/>
                                            <ClientDetailsItem data={client.email} icon={faEnvelope}/>
                                            <ClientDetailsItem data={client.phoneNumber} icon={faPhone}/>
                                        </div>
                                        <div className={"controllers"}>
                                            <Link to={"/sales"}>
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

export default FaceRecognition;