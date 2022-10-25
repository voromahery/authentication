import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/paths";
import { Context } from "../global-context";
import Form from "../components/form";

const Register = () => {
  const { email, password, registerWithEmailAndPassword }: any =
    useContext(Context);

  const register = (e: any) => {
    e.preventDefault();
    registerWithEmailAndPassword(email, password);
  };

  return (
    <>
      <Form
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
