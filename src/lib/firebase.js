export {initializeApp} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
export {firebaseApp} from "./config.js";
export {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
 // onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";