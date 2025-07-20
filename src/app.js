import { auth, database } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, set } from 'firebase/database';

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

let direction = "";

function move() {
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
      direction = "INVALID";
  }
  document.getElementById("movement").innerHTML = ("Moving: " + direction); // You can change this to actual logic
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// Call move() continuously
setInterval(move, 100);

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

/* Gripping */
let gripBtn = document.getElementById("grip-button");

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

gripBtn.addEventListener("click", gripFunction);

function writeUserData(directie, umar, brat, cleste) {
  set(ref(database, 'commands/'), {
    directie: directie,
    umar: umar,
    brat: brat,
    cleste: cleste
  });
}

/* https://stackoverflow.com/questions/457826/pass-parameters-in-setinterval-function */
setInterval( function() { writeUserData(direction, output1, output2, grip); }, 100);
