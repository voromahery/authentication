import React, { useContext } from "react";
import Form from "../components/form";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/paths";
import { Context } from "../global-context";

const Register = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    registerWithEmailAndPassword,
    signInWithGoogle,
    signInWithFacebook,
  }: any = useContext(Context);
  const register = (e: any) => {
    e.preventDefault();
    registerWithEmailAndPassword(email, password);
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
          signInWithFacebook,
        }}
        onSubmit={register}
        footer={
          <>
            Already a member? <Link to={LOGIN}>Login</Link>
          </>
        }
      />
    </>
  );
};

export default Register;
