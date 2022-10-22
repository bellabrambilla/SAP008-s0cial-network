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
  query,
  getDocs,
  doc,
  updateDoc,
  orderBy,
  updateProfile,
} from './firebase.js';

// iniciando autenticação
const auth = getAuth(firebaseApp);

// inicializando a firestore
const store = getFirestore(firebaseApp);

// As funções descritas na documentação serão inicializadas e escritas aqui.
export const createCollection = collection(store, 'posts');

// Migrar para outra pasta

export function templatePost(text) {
  const post = {
    name: auth.currentUser.displayName,
    text,
    id: auth.currentUser.uid,
    likes: [],
    comments: 0,
    date: new Date().toLocaleDateString('pt-br'),
  };
  return post;
}

// Função posts
export const createPost = (post) => addDoc(createCollection, post);

export const getPosts = () => {
  const postDataBase = query(collection(store, 'posts'));
  return getDocs(postDataBase);
};
// export const editPosts = async (text, postId) => {
//   const docEdit = doc(store, 'posts', postId);
//   return updateDoc(docEdit, {
//     text,
//     // "tag": hashTag,
//     // "data": currentDate
//   });
// };
export const editPosts = (text, postId) => {
  const docEdit = doc(store, 'posts', postId);
  return updateDoc(docEdit, {
    text,
  });
};

// Função de cadastro
export function signUp(email, pass, displayName, photoUrl, uid) {
  return createUserWithEmailAndPassword(auth, email, pass, displayName, photoUrl, uid);
}

// login com e-mail e senha
// eslint-disable-next-line max-len
export const logInWithEmailAndPassword = (email, pass) => signInWithEmailAndPassword(auth, email, pass);

// login com Google
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
