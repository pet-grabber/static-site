import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

const loadApp = () => {
  alert("Loading app.");
}

onAuthStateChanged(auth, user => {
  if (user) {
    document.body.style.display = 'block';
  } else {
    window.location.href = "/login.html";
  }
})
