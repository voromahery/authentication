import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { logInWithEmailAndPassword } from "../firebase";
import { Context } from "../global-context";
import Form from "../components/form";
import { REGISTER } from "../utils/paths";

const Signin = () => {
  const { email, password }: any = useContext(Context);
  const login = (event: Event) => {
    event.preventDefault();
    logInWithEmailAndPassword(email, password);
  };

  return (
    <>
      <Form
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
