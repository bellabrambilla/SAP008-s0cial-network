import { firebaseApp } from './config.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getFirestore,
  collection,
  addDoc,
} from './firebase.js';

// iniciando autenticação
const auth = getAuth(firebaseApp);

// inicializando a firestore
const store = getFirestore(firebaseApp);

// As funções descritas na documentação serão inicializadas e escritas aqui. LEMBRAR de exportá-las para os templates!
export const createCollection = collection(store, 'posts');

// Migrar para outra pasta
export function templatePost(text) {
  const post = {
    name: auth.currentUser.displayName,
    text,
    user_id: 'Admin',
    likes: [],
    comments: 0,
    data: 0,
  };
  return post;
}

export const createPost = (post) => addDoc(createCollection, post);

// Função de cadastro
export function signUp(email, pass, displayName, photoUrl) {
  return createUserWithEmailAndPassword(auth, email, pass);
}

// login com e-mail e senha
// eslint-disable-next-line max-len
export const logInWithEmailAndPassword = (email, pass) => signInWithEmailAndPassword(auth, email, pass);

// login com Google
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
