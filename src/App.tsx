import { useState, useEffect } from "react";
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
  currentUser: {
    name: string;
    email: string;
    Phone: string;
    image: string;
    bio: string;
    password: string;
  };
};

const App = () => {
  const [currentUser, setCurrentUser] = useState<any>({
    name: "",
    email: "",
    Phone: "",
    image: "",
    bio: "",
    password: "*".repeat(9),
  });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, loading, error]: any = useAuthState(auth);

  const userData = {
    name: user?.displayName,
    email: user?.email,
    Phone: user?.phoneNumber,
    image: user?.photoURL,
    bio: "",
    password: "*".repeat(9),
  };

  useEffect(() => {
    setCurrentUser(userData);
  }, [user]);
  console.log(user);

  return (
    <div>
      {user && <Menu currentUser={currentUser} />}
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
        <Route path={HOME} element={<Details currentUser={currentUser} />} />
        <Route
          path={EDIT}
          element={
            <EditForm
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
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
