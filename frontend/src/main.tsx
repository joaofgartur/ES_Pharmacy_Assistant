import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PageContainer from "./containers/page/PageContainer.tsx";
import Home from "./pages/home/Home.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
        <Route path={'/'} element={
            <PageContainer>
                <Home />
            </PageContainer>
        }/>
    </Routes>
  </BrowserRouter>,
)
