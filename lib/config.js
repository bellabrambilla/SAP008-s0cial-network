import { initializeApp } from './firebase.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCZJLz1dq8bI3mQvcOxXpbZXEj_dd7dwOE',
  authDomain: 'social-network-mia.firebaseapp.com',
  projectId: 'social-network-mia',
  storageBucket: 'social-network-mia.appspot.com',
  messagingSenderId: '333033318484',
  appId: '1:333033318484:web:24c297d8e8efed871d65c1',
  measurementId: 'G-KHPWJXZL63',
};

export const firebaseApp = initializeApp(firebaseConfig);
