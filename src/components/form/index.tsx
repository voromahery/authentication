import "./index.scss";
import { useLocation } from "react-router-dom";
import {
  signinWithSocialNetwork,
  googleProvider,
  facebookProvider,
  twitterProvider,
  githubProvider,
} from "../../firebase";
import { useContext } from "react";
import { Context } from "../../global-context";

import { REGISTER } from "../../utils/paths";

import { ReactComponent as GoogleIcon } from "../../assets/google-icon.svg";
import { ReactComponent as FacebookIcon } from "../../assets/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "../../assets/twitter-icon.svg";
import { ReactComponent as GithubIcon } from "../../assets/github-icon.svg";
import { ReactComponent as SecurityIcon } from "../../assets/security-icon.svg";
import { ReactComponent as MailIcon } from "../../assets/mail-icon.svg";

type Props = {
  onSubmit: React.Dispatch<any>;
  footer: any;
};

const Form = ({ onSubmit, footer }: Props) => {
  const location = useLocation();

  const { email, setEmail, password, setPassword }: any = useContext(Context);

  return (
    <div className="card-wrapper">
      <div className="card">
        <header>
          <h1>devchallenge</h1>
        </header>

        <div className="intro-wrapper">
          <h2 className="intro-heading">
            {location.pathname === REGISTER
              ? "  Join thousands of learners from around the world"
              : "Login"}
          </h2>
          {location.pathname === "/" && (
            <p className="intro-paragraph">
              Master web development by making real-life projects. There are
              multiple paths for you to choose
            </p>
          )}
        </div>
        <div className="form-wrapper">
          <form onSubmit={onSubmit}>
            <div className="input-wrapper email">
              <label htmlFor="email">
                <MailIcon />
              </label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper password">
              <label htmlFor="password">
                <SecurityIcon />
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="submit-btn">
              {location.pathname === REGISTER ? "Start coding now" : "Login"}
            </button>
          </form>
          <p className="alternative-registration">
            or continue with these social profile
          </p>
          <ul className="social-list">
            <li
              className="list-item google"
              onClick={() => signinWithSocialNetwork(googleProvider)}
            >
              <GoogleIcon />
            </li>
            <li
              className="list-item facebook"
              onClick={() => signinWithSocialNetwork(facebookProvider)}
            >
              <FacebookIcon />
            </li>
            <li
              className="list-item twitter"
              onClick={() =>
                signinWithSocialNetwork(
                  twitterProvider,
                  "The request for elevating the Twitter API is still pending. Thank you so much for your patience"
                )
              }
            >
              <TwitterIcon />
            </li>
            <li
              className="list-item github"
              onClick={() => signinWithSocialNetwork(githubProvider)}
            >
              <GithubIcon />
            </li>
          </ul>
          <p className="member-link">{footer}</p>
        </div>
      </div>
    </div>
  );
};

export default Form;
