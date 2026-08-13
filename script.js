const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const passwordField = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");
const strengthLabel = document.getElementById("strengthLabel");

const charsets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+{}[]<>?/",
};

lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
});

document.getElementById("generateBtn").addEventListener("click", generatePassword);
document.getElementById("copyBtn").addEventListener("click", copyPassword);

function generatePassword() {
  const length = parseInt(lengthInput.value, 10);
  const selected = ["uppercase", "lowercase", "numbers", "symbols"]
    .filter((key) => document.getElementById(key).checked);

  if (selected.length === 0) {
    alert("Select at least one character type.");
    return;
  }

  // Guarantee at least one character from each selected set
  let password = selected.map((key) => randomChar(charsets[key]));

  const allChars = selected.map((key) => charsets[key]).join("");
  for (let i = password.length; i < length; i++) {
    password.push(randomChar(allChars));
  }

  password = shuffle(password).slice(0, length).join("");
  passwordField.value = password;
  updateStrength(password, selected.length);
}

function randomChar(charset) {
  return charset[Math.floor(Math.random() * charset.length)];
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function updateStrength(password, varietyCount) {
  const length = password.length;
  let score = 0;

  if (length >= 8) score++;
  if (length >= 12) score++;
  if (length >= 16) score++;
  if (varietyCount >= 3) score++;

  const levels = [
    { label: "Weak", color: "var(--weak)", width: "25%" },
    { label: "Fair", color: "var(--weak)", width: "40%" },
    { label: "Good", color: "var(--medium)", width: "65%" },
    { label: "Strong", color: "var(--strong)", width: "85%" },
    { label: "Very Strong", color: "var(--strong)", width: "100%" },
  ];

  const level = levels[Math.min(score, levels.length - 1)];
  strengthBar.style.width = level.width;
  strengthBar.style.background = level.color;
  strengthLabel.textContent = `Strength: ${level.label}`;
}

function copyPassword() {
  if (!passwordField.value) {
    alert("Generate a password first.");
    return;
  }
  navigator.clipboard.writeText(passwordField.value).then(() => {
    const btn = document.getElementById("copyBtn");
    const original = btn.textContent;
    btn.textContent = "✅";
    setTimeout(() => (btn.textContent = original), 1200);
  });
}

// Generate one on page load for a nice first impression
window.addEventListener("DOMContentLoaded", generatePassword);
