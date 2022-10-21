import React from "react";
import Form from "../components/form";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/paths";

type Props = {
  email: string;
  password: string;
  signInWithGoogle: React.Dispatch<any>;
  registerWithEmailAndPassword: any;
  setEmail: React.Dispatch<string>;
  setPassword: React.Dispatch<string>;
};

const Register = ({
  email,
  password,
  setEmail,
  setPassword,
  signInWithGoogle,
  registerWithEmailAndPassword,
}: Props) => {
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
