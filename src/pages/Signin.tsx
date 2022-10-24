import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { logInWithEmailAndPassword } from "../firebase";
import { Context } from "../global-context";
import { REGISTER } from "../utils/paths";
import Form from "../components/form";

const Signin = () => {
  const { email, setEmail, password, setPassword, signInWithGoogle }:any =
    useContext(Context);
  const login = (event: Event) => {
    event.preventDefault();
    logInWithEmailAndPassword(email, password);
  };

  return (
    <>
      <Form
        {...{
          email,
          setEmail,
          password,
          setPassword,
          signInWithGoogle,
        }}
        onSubmit={login}
        footer={
          <>
            Don't have an account yet? <Link to={REGISTER}>Register</Link>
          </>
        }
      />
    </>
  );
};

export default Signin;
