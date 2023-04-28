import IPageContainer from "./IPageContainer.ts";
import Navbar from "../../components/navbar/Navbar.tsx";

function PageContainer(props: IPageContainer) {
    return (
        <div className={"page-container"}>
            <Navbar />
            { props.children }
        </div>
    )
}

export default  PageContainer
