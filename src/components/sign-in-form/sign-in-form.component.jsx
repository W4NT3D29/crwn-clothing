import React, { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";
import {
    createUserDocumentFromAuth,
    signInAuthUserWhitEmailAndPassword,
    signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Swal from "sweetalert2";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWhitGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWhitEmailAndPassword(
                email,
                password
            );
            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            if (error.code) {
                Swal.fire({
                    title: "Error!",
                    text: error.code,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <div className="buttons-container">
                    <Button type="submit"> Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWhitGoogle}>
                        {" "}
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
