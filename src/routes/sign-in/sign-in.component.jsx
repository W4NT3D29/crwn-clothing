import React from "react";
import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const SingIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    };
    return (
        <div>
            <h1>Sing In Page</h1>
            <button onClick={logGoogleUser}>Sign In With Google Popup</button>
        </div>
    );
};

export default SingIn;
