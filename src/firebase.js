import { initializeApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  browserSessionPersistence,
  setPersistence
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseApp = initializeApp({
//   file deepcode ignore HardcodedNonCryptoSecret: it's safe to include the firebase config file api key in the client side
  apiKey: "AIzaSyBWn8uw4FvMMJEuueTpKWBsP61e8vWNAws",
  authDomain: "pet-grabber.firebaseapp.com",
  projectId: "pet-grabber",
  storageBucket: "pet-grabber.firebasestorage.app",
  messagingSenderId: "368088508063",
  appId: "1:368088508063:web:1bb6619fedc74aa4e964aa",
  measurementId: "G-QH99SWQXJS",
  databaseURL: "https://pet-grabber-default-rtdb.europe-west1.firebasedatabase.app/"
})

const auth = getAuth(firebaseApp);
// connectAuthEmulator(auth, "http://localhost:9099");

setPersistence(auth, browserSessionPersistence);

const database = getDatabase(firebaseApp);

export { auth, database };

