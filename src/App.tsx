import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "./utils/Navigate";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  registerWithEmailAndPassword,
  db,
  logout,
} from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";

import EditForm from "./pages/editForm";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import Details from "./pages/details";
import Menu from "./components/menu";
import { EDIT, HOME, REGISTER, LOGIN } from "./utils/paths";

export type Props = {
  data: {
    name: string;
    email: string;
    Phone: string;
    image: string;
    bio: string;
    password: string;
  };
};

const App = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, loading, error]: any = useAuthState(auth);

  const [newImage, setNewImage] = useState<string>("");

  const userData = {
    name: user?.displayName,
    email: user?.email,
    Phone: user?.phoneNumber,
    image: newImage || user?.photoURL,
    bio: "",
    password: "*".repeat(9),
  };

  console.log('user::::::', user);

  return (
    <div>
      {user && <Menu data={userData} />}
      <Routes>
        <Route
          path={LOGIN}
          element={
            <Signin
              {...{
                email,
                setEmail,
                password,
                setPassword,
                signInWithGoogle,
              }}
            />
          }
        />
        <Route
          path={REGISTER}
          element={
            <Register
              {...{
                email,
                setEmail,
                password,
                setPassword,
                registerWithEmailAndPassword,
                signInWithGoogle,
              }}
            />
          }
        />
        <Route path={HOME} element={<Details data={userData} />} />
        <Route
          path={EDIT}
          element={
            <EditForm
              data={userData}
              setNewImage={setNewImage}
              newImage={newImage}
            />
          }
        />
      </Routes>
      {user ? (
        <Navigate to={HOME} replace={true} />
      ) : (
        <Navigate to={REGISTER} replace={true} />
      )}
    </div>
  );
};

export default App;
