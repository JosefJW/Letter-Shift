const words = ["apple", "bicycle", "carpet", "dog", "elephant", "flame", "guitar", "horizon", "igloo", "jungle", "kite", "lighthouse", "mountain", "notebook", "ocean", "penguin", "quilt", "robot", "sunflower", "tiger", "umbrella", "vampire", "whistle", "xylophone", "yarn", "zebra", "autumn", "breeze", "clover", "dolphin", "echo", "forest", "glow", "harmony", "island", "jigsaw", "kingdom", "lemon", "mystic", "noodle", "orchid", "parade", "quicksand", "rainbow", "snowflake", "tornado", "universe", "volcano", "whirlpool", "xenon", "yellow", "zenith", "applepie", "brick", "cloud", "drift", "energy", "flamingo", "grape", "hatch", "isolate", "jumpy", "kiwi", "lunar", "mango", "nectar", "puzzle", "quiver", "rocket", "sapphire", "treasure", "underwater", "velocity", "whale", "x-ray", "yoga", "zeppelin"];
let currentWord = "";
let scrambledWord = "";
let shiftAmount = 0;
let shiftCounter = 0;  // Counter for the number of shifts

function generateWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  shiftAmount = Math.floor(Math.random() * 5) + 1; // Shift by 1-5
  scrambledWord = scrambleWord(currentWord, shiftAmount);
  displayDials(scrambledWord);
  document.getElementById("message").textContent = "";
  shiftCounter = 0; // Reset counter when a new word is generated
  updateShiftCounter();
  document.getElementById("shiftbtn").disabled = false
}

function scrambleWord(word, shift) {
  return word.split("")
             .map(char => String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97))
             .join("");
}

function displayDials(word) {
  const dialsContainer = document.getElementById("dials-container");
  dialsContainer.innerHTML = "";
  for (let char of word) {
    const dial = document.createElement("div");
    dial.className = "dial";
    dial.textContent = char;
    dialsContainer.appendChild(dial);
  }
}

function shiftDials() {
  const shiftInput = parseInt(document.getElementById("shift-amount").value, 10);
  if (isNaN(shiftInput)) {
    document.getElementById("message").textContent = "Please enter a valid number.";
    return;
  }

  const dials = document.querySelectorAll(".dial");
  scrambledWord = scrambledWord.split("").map((char, index) => {
    const newChar = String.fromCharCode(((char.charCodeAt(0) - 97 + shiftInput) % 26 + 26) % 26 + 97);
    dials[index].textContent = newChar;
    return newChar;
  }).join("");

  shiftCounter++;  // Increment the counter each time the player shifts
  updateShiftCounter();  // Update the display with the new count

  if (scrambledWord === currentWord) {
    document.getElementById("message").textContent = `Correct! 🎉`;
    document.getElementById("shiftbtn").disabled = true
  } else {
    document.getElementById("message").textContent = `Not quite, try again! ❌`;
  }
}

// Update the shift counter display
function updateShiftCounter() {
  document.getElementById("shiftcount").value = ""; // Clear the input field
  const shiftCountDisplay = document.getElementById("shiftcount");
  shiftCountDisplay.textContent = ` Shifts: ${shiftCounter}`;
}

// Generate the first word when the page loads
window.onload = generateWord;
