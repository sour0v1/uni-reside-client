import { GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AuthContext = createContext(null);


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const axiosPublic = useAxiosPublic();

    // create user by email
    const createUserByEmail = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // create user by google
    const createUserByGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    // create user by github
    const createUserByGithub = () => {
        return signInWithPopup(auth, githubProvider);
    }
    // sign in user
    const signInUserByEmail = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // current sign in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            const email = currentUser?.email;
            if(currentUser){
                axiosPublic.post('/jwt', {email}, {withCredentials : true})
                    .then(res => {
                        // console.log(res.data);
                    })
            }
            else{
                // console.log('hello')
                axiosPublic.post('/remove-token', {}, {withCredentials : true})
                    .then(res => {
                        // console.log(res.data);
                    })
            }
            setLoading(false);

        })
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        createUserByEmail,
        loading,
        setLoading,
        signInUserByEmail,
        createUserByGoogle,
        createUserByGithub

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;