import "./FaceRecognition.css";
import React, {useCallback, useState} from "react";
import Webcam from "react-webcam";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons/faRotateRight";
import {faCamera} from "@fortawesome/free-solid-svg-icons";

function FaceRecognition() {
    const [webcamActive, setWebcamActive] = useState(true);
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const screenshot = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        setWebcamActive(false);
        console.log(imgSrc)
    }, [webcamRef, setImgSrc]);

    const resetCamera = () => {
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

                </div>
            </div>
        </div>
    )
}

export default FaceRecognition;