import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  AuthErrorCodes,
  setPersistence,
  browserSessionPersistence
} from 'firebase/auth';

const firebaseApp = initializeApp({
//   file deepcode ignore HardcodedNonCryptoSecret: it's safe to include the firebase config file api key in the client side
  apiKey: "AIzaSyBWn8uw4FvMMJEuueTpKWBsP61e8vWNAws",
  authDomain: "pet-grabber.firebaseapp.com",
  projectId: "pet-grabber",
  storageBucket: "pet-grabber.firebasestorage.app",
  messagingSenderId: "368088508063",
  appId: "1:368088508063:web:1bb6619fedc74aa4e964aa",
  measurementId: "G-QH99SWQXJS"
})

const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");

let btnLogin = document.getElementById("login-button");
let txtEmail = document.getElementById("email");
let txtPassword = document.getElementById("password");

const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
  }
  catch(error) {
    console.log(error);
    if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
      alert("Wrong password. Try again!");
    } else {
      alert(error.message);
    }
  }
}

setPersistence(auth, browserSessionPersistence)
  .then(() => {
  })
  .catch((error) => {
  })

btnLogin.addEventListener("click", loginEmailPassword);

const loadApp = () => {
  alert("Loading app.");
}

// Detect auth state
onAuthStateChanged(auth, user => {
  if (user) {
    loadApp();
  } else {
    console.log("No user!");
  }
});