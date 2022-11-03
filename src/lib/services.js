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
  getDoc,
  arrayUnion,
  arrayRemove,
} from './firebase.js';

const auth = getAuth(firebaseApp);
const store = getFirestore(firebaseApp);

export const createCollection = collection(store, 'posts');

export function templatePost(text) {
  const post = {
    name: auth.currentUser.displayName,
    text,
    userId: auth.currentUser.uid,
    likes: [ ],
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

//arrayRemove ( ... elements :  any [] ) : FieldValue
export const likePost = async (postId) => {
  const document = doc(store, 'posts', postId);
  const docSnap = await getDoc(document);
  const likeDoc = docSnap.data().likes;
  const userId  = auth.currentUser.uid;

      if (likeDoc.includes(userId)) {
        updateDoc(document, { likes: arrayRemove(userId) })
      }
      else {
        updateDoc(document, { likes: arrayUnion(userId) })
      }
  };

export function signUp(email, pass, displayName) {
  return createUserWithEmailAndPassword(auth, email, pass);
}

// eslint-disable-next-line max-len
export const logInWithEmailAndPassword = (email, pass) => signInWithEmailAndPassword(auth, email, pass);

const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
