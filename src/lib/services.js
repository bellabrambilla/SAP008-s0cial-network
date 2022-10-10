import { firebaseApp} from "./config.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getFirestore,
  collection, 
  addDoc
} from "./firebase.js";

// iniciando autenticação
const auth = getAuth(firebaseApp);

//inicializando a firestore
const store = getFirestore(firebaseApp);

export const createCollection = collection(store,"posts")

//Migrar para outra pasta
export function templatePost(text){
   const post ={
    name: auth.currentUser.displayName,
    text:text,
    user_id:"Admin",
    likes:[] ,
    comments: 0,
    data: 0, 
  }
return post;  
}

export const createPost = (post)=>{
 return addDoc(createCollection, post)
};

    
//set houver um usuário logado => faz alguma coisa (fazer função)
// firebaseApp.auth().onAuthStateChanged((user)=>{
//   console.log(user)
// })
//fazer função para pegar os dados de usuário
// const user = autcurrentUser;
// if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  // const displayName = user.displayName;
  // const email = user.email;
  // const photoURL = user.photoURL;
  // const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  // const uid = user.uid;
// }

//As funções descritas na documentação serão inicializadas e escritas aqui. LEMBRAR de exportá-las para os templates!

export function signUp(email, pass) {
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
}

//login com e-mail e senha
export const logInWithEmailAndPassword = (email, pass) => {
  return signInWithEmailAndPassword(auth, email, pass);
};

//login com Google
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
 return signInWithPopup(auth, provider);
};
