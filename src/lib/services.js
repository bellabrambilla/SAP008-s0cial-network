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
  orderBy
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

// Função posts
export const createPost = (post) => {
  return addDoc(createCollection, post);
};

export const getPosts = async () => {
  const postDataBase = query(collection(store, "posts"));
  return await getDocs(postDataBase);
};

export const editPosts = async (text, postId) => {
  const docEdit = doc(store, "posts", postId);
  return await updateDoc(docEdit , {
    "text": text,
    // "tag": hashTag,
    // "data": currentDate
});
}

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
