import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBWn8uw4FvMMJEuueTpKWBsP61e8vWNAws",
  authDomain: "pet-grabber.firebaseapp.com",
  projectId: "pet-grabber",
  storageBucket: "pet-grabber.firebasestorage.app",
  messagingSenderId: "368088508063",
  appId: "1:368088508063:web:1bb6619fedc74aa4e964aa",
  measurementId: "G-QH99SWQXJS"
})
const auth = getAuth(firebaseApp);

// Detect auth state
onAuthStateChanged(auth, user => {
  if (user !== null) {
    console.log("Logged in!");
  } else {
    console.log("No use");
  }
});