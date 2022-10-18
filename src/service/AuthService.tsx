import axios from "axios";
import env from "ts-react-dotenv";

const API = "https://identitytoolkit.googleapis.com/v1/accounts:"; //This is Firebase REST API for authentication
const TOKEN = env.TOKEN;

type details = {
  email: string;
  password: string;
  returnSecureToken: any;
};

const AuthService = () => {
  const login = async ({ email, password, returnSecureToken }: details) => {
    try {
      return await axios.post(`${API}signInWithPassword?key=${TOKEN}`, {
        email,
        password,
        returnSecureToken,
      });
    } catch (error) {
      throw error;
    }
  };

  const signup = async ({ email, password, returnSecureToken }: details) => {
    try {
      return await axios.post(`${API}signUp?key=${TOKEN}`, {
        email,
        password,
        returnSecureToken,
      });
    } catch (error) {
      throw error;
    }
  };

  const saveTokensInSessionStorage = ({
    idToken,
    refreshToken,
    expiresIn,
    localId,
  }: any) => {
    sessionStorage.setItem("idToken", idToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("expiresIn", expiresIn);
    sessionStorage.setItem("localId", localId);
  };

  const logout = () => {
    sessionStorage.removeItem("idToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("expiresIn");
    sessionStorage.removeItem("localId");
  };
};

export default AuthService();
