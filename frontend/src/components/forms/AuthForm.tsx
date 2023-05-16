import "./AuthForm.css"
import FormUser from "./user/FormUser.tsx";
import FormEmail from "./email/FormEmail.tsx";
import FormPassword from "./password/FormPassword.tsx";
import IForm from "./IForm.ts";
import React from "react";
import {useNavigate} from "react-router-dom";

function AuthForm(props: IForm) {
    const navigate = useNavigate();

    const handleLogin = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            username: {value: string};
            email: { value: string };
            password: { value: string };
        };

        const email = target.email.value; // typechecks!
        const password = target.password.value; // typechecks!

        console.log(email);
        console.log(password);

        navigate("/");
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            username: {value: string};
            email: { value: string };
            password: { value: string };
        };

        console.log("target")
        console.log(target);

        const username = target.username.value;
        const email = target.email.value; // typechecks!
        const password = target.password.value; // typechecks!

        console.log(username);
        console.log(email);
        console.log(password);

        navigate("/");
    }

    return (
        <div className={"form"}>
            <img src="https://p7.hiclipart.com/preview/435/63/646/%E8%AA%BF%E5%89%A4-pharmacist-physician-pharmacy-medical-prescription-pharmacist.jpg" alt="Lamp" />
            {
                (props.type == "register") ?
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={"form-content"}>
                            <FormUser input_type={"text"} title={"Username"} placeholder={"Username"} name={"username"}/>
                            <FormEmail input_type={"email"} title={"Email"} placeholder={"Email"} name={"email"}/>
                            <FormPassword input_type={"password"} title={"Password"} placeholder={"Password"} name={"password"}/>
                            <FormPassword input_type={"password"} title={"Confirm password"} placeholder={"Password"} name={"password2"}/>
                        </div>
                        <button className={"button"}>Sign Up</button>
                    </form>
                :
                    <form onSubmit={(e) => handleLogin(e)}>
                        <div className={"form-content"}>
                            <FormEmail input_type={"email"} title={"Email"} placeholder={"Email"} name={"email"}/>
                            <FormPassword input_type={"password"} title={"Password"} placeholder={"Password"} name={"password"}/>
                        </div>
                        <button className={"button"}>Sign Up</button>
                    </form>
            }

        </div>
    )
}

export default AuthForm;