import "./Home.css"
import NavbarButtonB from "../../components/navbar/buttons/NavbarButtonB.tsx";

function Home() {
    return (
        <div className={"home"}>
            <div className={"home-container"}>
                <div className={"home-content"}>
                    <h2 className={"home-title"}>Lorem ipsum dolor sit </h2>
                    <div className={"bar"}></div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
                <NavbarButtonB to={"/more"} title={"Learn more"}/>
            </div>
        </div>
    )
}

export default Home
