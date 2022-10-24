import React, { createContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  signInWithGoogle,
  registerWithEmailAndPassword,
  db,
  storage,
} from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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
  message: string;
  setMessage: React.Dispatch<string>;
  file: any;
  setFile: React.Dispatch<any>;
  newImage: string;
  setNewImage: React.Dispatch<string>;
  newName: string;
  setNewName: React.Dispatch<string>;
  newBio: string;
  setNewBio: React.Dispatch<string>;
  newPhone: string;
  setNewPhone: React.Dispatch<string>;
  newEmail: string;
  setNewEmail: React.Dispatch<string>;
  newPassword: string;
  setNewPassword: React.Dispatch<string>;
  percent: number;
  setPercent: React.Dispatch<number>;
  uploadImage:  React.Dispatch<any>;
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
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<any>("");
  const [newImage, setNewImage] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newBio, setNewBio] = useState<string>("");
  const [newPhone, setNewPhone] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [percent, setPercent] = useState<number>(0);
  const [user]: any = useAuthState(auth);

  const userData = {
    name: user?.displayName,
    email: user?.email,
    image: user?.photoURL,
    password: "*".repeat(9),
  };

  const uploadImage = (event: any) => {
    setFile(event.target.files[0]);
  };

  const updateAvatar = () => {
    const storageRef = ref(storage, `/files/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    file?.name &&
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // update progress
          setPercent(percent);
        },
        (err) => {
          console.log(err);
          setMessage("An error occurred");
        },
        () =>
          // download url
          getDownloadURL(uploadTask?.snapshot?.ref).then((url: string) => {
            file?.name && setNewImage(url);
          })
      );
  };

  useEffect(() => {
    updateAvatar();
    console.log(message, percent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file?.name]);

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
        message,
        setMessage,
        file,
        setFile,
        newImage,
        setNewImage,
        newName,
        setNewName,
        newBio,
        setNewBio,
        newPhone,
        setNewPhone,
        newEmail,
        setNewEmail,
        newPassword,
        setNewPassword,
        percent,
        setPercent,
        uploadImage,
        signInWithGoogle,
        registerWithEmailAndPassword,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { GlobalContext, Context };
