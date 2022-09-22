import { firebaseApp } from "./config.js";
import{getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";


// iniciando autenticação
const auth = getAuth(firebaseApp);

//As funções descritas na documentação serão inicializadas e escritas aqui. LEMBRAR de exportá-las para os templates!

export function signUp(email, pass){
    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("entrou", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, ":", errorMessage);
    });
};

//login com e-mail e senha
export const logInWithEmailAndPassword =(email, pass) => {
  return signInWithEmailAndPassword(auth, email,pass)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("logou", user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, ":", errorMessage);
  });
  }
  
  //login com Google
  const provider = new GoogleAuthProvider;
  export const signInWithGoogle= () =>{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(token, user);
    window.location.hash="#home";
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorCode, ":", errorMessage);
  });
  }