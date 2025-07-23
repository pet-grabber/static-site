import { auth } from './firebase.js';
import { 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  AuthErrorCodes,
} from 'firebase/auth';

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

/*
const createAccount = async () => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
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
*/

btnLogin.addEventListener("click", loginEmailPassword);

// Detect auth state
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = '/app.html';
  } else {
    console.log("No user!");
  }
});