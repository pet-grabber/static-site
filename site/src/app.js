import { auth, database } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, set } from 'firebase/database';

let mode = ""; // Mobile or PC
let direction = "stop";

if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
  mode = "mobile";
} else {
  mode = "pc";
}

if (mode === "mobile") {
  document.getElementById("wasd").style.display = "none";
} else if (mode === "pc") {
  document.getElementById("movement-container").style.display = "none";
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
  direction = "";
  for (const key in keyObj) {
    if (keyObj[key]) {
      direction += key; // This will combine e.g., "wd" if both pressed
    }
  }
  switch (direction) {
    case "w":
      direction = "forward";
      break;
    case "wa":
      direction = "forward_left";
      break;
    case "wd":
      direction = "forward_right";
      break;
    case "s":
      direction = "backward";
      break;
    case "as":
      direction = "backward_left";
      break;
    case "sd":
      direction = "backward_right";
      break;
    default:
      direction = "stop";
  }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// Call move() continuously only if on PC
if (mode === "pc") {
  setInterval(move, 100);
}

const targetClass = "dpad-button";

document.addEventListener('touchstart', function(event) {
  if (event.target.classList.contains(targetClass)) {
    direction = event.target.id;
  }
});

document.addEventListener('touchend', function(event) {
  direction = "stop";
});

/* Sliders */
let slider1 = document.getElementById("range1");
let slider2 = document.getElementById("range2");
let output1 = document.getElementById("text1");
let output2 = document.getElementById("text2");

slider1.oninput = function () {
  output1.innerHTML = this.value;
}

slider2.oninput = function () {
  output2.innerHTML = this.value;
}

/* https://stackoverflow.com/questions/26993363/javascript-change-elements-that-have-certain-class-and-attribute-pure-javasc */
window.onload = function() {
  slider1.value = 90;
  slider2.value = 90;
}


/* Gripping */
let gripBtn = document.getElementById("grip-button");

gripBtn.addEventListener("click", gripFunction);

let grip = false;

function gripFunction() {
  if (!grip) {
    grip = true;
    gripBtn.innerHTML = "Grip: On";
  } else {
    grip = false;
    gripBtn.innerHTML = "Grip: Off";
  }
}

function writeUserData(directie, umar, brat, cleste) {
  if (directie === undefined) directie = null;
  if (umar === undefined) umar = null;
  if (brat === undefined) brat = null;
  if (cleste === undefined) cleste = null;

  set(ref(database, 'commands/'), {
    directie: directie,
    umar: Number(umar),
    brat: Number(brat),
    cleste: cleste
  });
  document.getElementById("test-text").innerHTML = direction;
}

/* https://stackoverflow.com/questions/457826/pass-parameters-in-setinterval-function */
setInterval( function() { writeUserData(direction, output1.innerHTML, output2.innerHTML, grip); }, 100);