import React, { createContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  signInWithGoogle,
  registerWithEmailAndPassword,
  db,
} from "./firebase";

interface currentUserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  bio: string;
  password: string;
}

type AuthStates = {
  user: any;
  currentUser: currentUserType;
  setCurrentUser: React.Dispatch<currentUserType>;
  email: string;
  setEmail: React.Dispatch<string>;
  password: string;
  setPassword: React.Dispatch<string>;
  signInWithGoogle: React.Dispatch<any>;
  registerWithEmailAndPassword: React.Dispatch<any>;
};

const Context = createContext<AuthStates | null>(null);

const GlobalContext = (props: any) => {
  const [currentUser, setCurrentUser] = useState({
    id: "",
    bio: "",
    name: "",
    email: "",
    phone: "",
    image: "",
    password: "*".repeat(9),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user]: any = useAuthState(auth);

  const userData = {
    name: user?.displayName,
    email: user?.email,
    image: user?.photoURL,
    password: "*".repeat(9),
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDoc(doc(db, "users", user?.uid));
      setCurrentUser({
        ...userData,
        bio: data.data()?.bio,
        id: user?.uid,
        phone: data.data()?.phone,
      });
    };
    user && getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Context.Provider
      value={{
        user,
        currentUser,
        setCurrentUser,
        email,
        setEmail,
        password,
        setPassword,
        signInWithGoogle,
        registerWithEmailAndPassword,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { GlobalContext, Context };
