import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/form";
import { logInWithEmailAndPassword } from "../firebase";
import { REGISTER } from "../utils/paths";

type Props = {
  email: string;
  password: string;
  signInWithGoogle: React.Dispatch<any>;
  setEmail: React.Dispatch<string>;
  setPassword: React.Dispatch<string>;
};

const Signin = ({
  email,
  setEmail,
  password,
  setPassword,
  signInWithGoogle,
}: Props) => {
  return (
    <div className="card-wrapper">
      <Form
        {...{
          email,
          setEmail,
          password,
          setPassword,
          signInWithGoogle,
        }}
        onSubmit={() => logInWithEmailAndPassword(email, password)}
        footer={
          <>
            Don't have an account yet? <Link to={REGISTER}>Register</Link>
          </>
        }
      />
    </div>
  );
};

export default Signin;
