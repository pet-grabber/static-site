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
});

/* Movement handling WASD */
let keyObj = {
  w: false,
  a: false,
  s: false,
  d: false
};

function keyDownHandler(e) {
  if (e.key in keyObj) {
    keyObj[e.key] = true;
  }
}

function keyUpHandler(e) {
  if (e.key in keyObj) {
    keyObj[e.key] = false;
  }
}

function move() {
  let direction = "";
  for (const key in keyObj) {
    if (keyObj[key]) {
      direction += key; // This will combine e.g., "wd" if both pressed
    }
  }
  document.getElementById("movement").innerHTML = ("Moving: " + direction); // You can change this to actual logic
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// Call move() continuously
setInterval(move, 100);

