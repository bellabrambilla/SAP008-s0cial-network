export { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js';
export { firebaseApp } from './config.js';
export {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
export {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  doc,
  updateDoc,
  orderBy,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';
