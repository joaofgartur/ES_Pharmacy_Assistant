import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PageContainer from "./containers/page/PageContainer.tsx";
import Home from "./pages/home/Home.tsx";
import Registration from "./pages/registration/Registration.tsx";
import Login from "./pages/login/Login.tsx";
import Prescription from "./pages/prescription/Prescription.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={
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
        </Routes>
    </BrowserRouter>,
)
