import { initializeApp } from "firebase/app";
import env from "ts-react-dotenv";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

export const facebookProvider = new FacebookAuthProvider();

export const twitterProvider = new TwitterAuthProvider();

export const githubProvider = new GithubAuthProvider();

export const storage = getStorage(app);

const signinWithSocialNetwork = async (provider, twitterMessage) => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        authProvider: "local",
        email: user.email,
        bio: "",
        phone: "",
      });
    }
  } catch (err) {
    if (err.message.includes("account-exists-with-different-credential")) {
      alert("Sorry, this account is already used");
    } else {
      alert(twitterMessage || err.message);
    }
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      authProvider: "local",
      email,
      bio: "",
      phone: "",
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signinWithSocialNetwork,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
