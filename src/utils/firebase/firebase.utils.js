import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCZoCg38eJnvn5p-DzmgrO5HvjR4k5Vjtc",
    authDomain: "crwn-clothing-db-b278a.firebaseapp.com",
    projectId: "crwn-clothing-db-b278a",
    storageBucket: "crwn-clothing-db-b278a.appspot.com",
    messagingSenderId: "636699724118",
    appId: "1:636699724118:web:0f3e7530e605476aedaef7",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        } catch (error) {
            console.log("Error creating the user", error.message);
        }
    }
    return userDocRef;
};
