import "./AuthForm.css"
import IForm from "./IForm.ts";
import React from "react";
import {useNavigate} from "react-router-dom";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import FormItem from "./item/FormItem.tsx";

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

            <div className={"image"}/>
            {
                (props.type == "register") ?
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={"form-content"}>
                            <FormItem title={"Username"} input_type={"text"} placeholder={"Username"} name={"username"} icon={faUser}/>
                            <FormItem title={"Email"} input_type={"email"} placeholder={"Email"} name={"email"} icon={faEnvelope}/>
                            <FormItem title={"Password"} input_type={"password"} placeholder={"Password"} name={"password"} icon={faLock}/>
                            <FormItem title={"Confirm password"} input_type={"password"} placeholder={"Password"} name={"password2"} icon={faLock}/>
                        </div>
                        <button className={"button"}>Sign Up</button>
                    </form>
                :
                    <form onSubmit={(e) => handleLogin(e)}>
                        <div className={"form-content"}>
                            <FormItem title={"Email"} input_type={"email"} placeholder={"Email"} name={"email"} icon={faEnvelope}/>
                            <FormItem title={"Password"} input_type={"password"} placeholder={"Password"} name={"password"} icon={faLock}/>
                        </div>
                        <button className={"button"}>Sign In</button>
                    </form>
            }

        </div>
    )
}

export default AuthForm;