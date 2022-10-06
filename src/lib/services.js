import { firebaseApp } from "./config.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  //onAuthStateChanged
} from "./firebase.js";

// iniciando autenticação
const auth = getAuth(firebaseApp);

//As funções descritas na documentação serão inicializadas e escritas aqui. LEMBRAR de exportá-las para os templates!

export function signUp(email, pass) {
  createUserWithEmailAndPassword(auth, email, pass)
    // .then((userCredential) => {
    //   // Signed in
    //   const user = userCredential.user;
    //   console.log("entrou", user);
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(errorCode, ":", errorMessage);
    // });
}

//login com e-mail e senha
export const logInWithEmailAndPassword = (email, pass) => {
  return signInWithEmailAndPassword(auth, email, pass);
  // .then((userCredential) => {
  //   const user = userCredential.user;
  //   console.log("logou", user);
  //   navigateTo("#home");
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   console.log(errorCode, ":", errorMessage);
  // });
};

//login com Google
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
 return signInWithPopup(auth, provider);
};
