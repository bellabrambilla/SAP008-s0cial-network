import { firebaseApp } from './config.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from './firebase.js';

const auth = getAuth(firebaseApp);
const store = getFirestore(firebaseApp);

export const createCollection = collection(store, 'posts');

export function templatePost(text) {
  const post = {
    name: auth.currentUser.displayName,
    text,
    userId: auth.currentUser.uid,
    likes: [],
    comments: 0,
    date: new Date().toLocaleDateString('pt-br'),
  };
  return post;
}

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

export const deletePost = (postId) => {
  const docDelete = doc(store, 'posts', postId);
  return deleteDoc(docDelete);
};

export function signUp(email, pass, displayName) {
  return createUserWithEmailAndPassword(auth, email, pass);
}

// eslint-disable-next-line max-len
export const logInWithEmailAndPassword = (email, pass) => signInWithEmailAndPassword(auth, email, pass);

const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
