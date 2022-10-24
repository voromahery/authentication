import { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "./utils/Navigate";

import EditForm from "./pages/editForm";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import Details from "./pages/details";
import Menu from "./components/menu";
import { EDIT, HOME, REGISTER, LOGIN } from "./utils/paths";
import { Context } from "./global-context";

const App = () => {
  const { user }: any = useContext(Context);
  const location = useLocation();
  const path = location.pathname;

  const footerClassName = () => {
    if (path === HOME) {
      return "detail";
    } else if (path === EDIT) {
      return "edit";
    } else {
      return "form";
    }
  };

  return (
    <div
      className={
        path === EDIT || path === HOME
          ? "main has-user-page"
          : "main no-user-page"
      }
    >
      {user && <Menu />}
      <Routes>
        <Route path={LOGIN} element={<Signin />} />
        <Route path={REGISTER} element={<Register />} />
        <Route path={HOME} element={<Details />} />
        <Route path={EDIT} element={<EditForm />} />
      </Routes>
      {user ? (
        <Navigate to={HOME} replace={true} />
      ) : (
        <Navigate to={REGISTER} replace={true} />
      )}
      <footer className={`footer-${footerClassName()}`}>
        <div>
          <span>Created by</span>{" "}
          <a href="https://github.com/voromahery">H.Daniel Fabrice</a>
        </div>
        <a href="https://devchallenges.io/">devChallenges.io</a>
      </footer>
    </div>
  );
};

export default App;
