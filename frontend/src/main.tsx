import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PageContainer from "./containers/page/PageContainer.tsx";
import Home from "./pages/home/Home.tsx";
import Registration from "./pages/registration/Registration.tsx";
import Login from "./pages/login/Login.tsx";
import Prescription from "./pages/prescription/Prescription.tsx";
import FaceRecognition from "./pages/payment/face-recognition/FaceRecognition.tsx";
import Sales from "./pages/sales/Sales.tsx";
import Logout from './pages/logout/Logout.tsx';
import FaceRecognitionNoCamera from './pages/payment/face-recognition-no-camera/FaceRecognitionNoCamera.tsx';
import Pay from './pages/pay/Pay.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            <Route path={'/logout'} element={
                <PageContainer>
                    <Logout />
                </PageContainer>
            }></Route>
            <Route path={'/'} element={
                <PageContainer>
                    <Home />
                </PageContainer>
            }/>
            <Route path={'/contact'} element={
                <PageContainer>
                    <Home />
                </PageContainer>
            }/>
            <Route path={'/about'} element={
                <PageContainer>
                    <Home />
                </PageContainer>
            }/>
            <Route path={'/register'} element={
                <PageContainer>
                    <Registration/>
                </PageContainer>
            }/>
            <Route path={'/login'} element={
                <PageContainer>
                    <Login/>
                </PageContainer>
            }/>
            <Route path={'/prescription'} element={
                <PageContainer>
                    <Prescription/>
                </PageContainer>
            }/>
            <Route path={'/payment/faceid'} element={
                <PageContainer>
                    <FaceRecognitionNoCamera/>
                </PageContainer>
            }/>
            <Route path={'/payment/cam_faceid'} element={
                <PageContainer>
                    <FaceRecognition/>
                </PageContainer>
            }/>
            <Route path={'/sales'} element={
                <PageContainer>
                    <Sales/>
                </PageContainer>
            }/>
            <Route path={'/pay'} element={
                <PageContainer>
                    <Pay/>
                </PageContainer>
            }/>
        </Routes>
    </BrowserRouter>,
)
