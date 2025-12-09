const resultEl = document.querySelector(".result");
const lengthEl = document.querySelector(".length");
const uppercaseEl = document.querySelector(".uppercase");
const lowercaseEl = document.querySelector(".lowercase");
const numbersEl = document.querySelector(".numbers");
const symbolsEl = document.querySelector(".symbols");
const generateEl = document.querySelector("#generate");
const clipboard = document.querySelector("#clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboard.onclick = async () => {
  const password = resultEl.innerText;

  if (!password) {
    return alert("No result to copy!");
  }

  if (!navigator.clipboard || !window.isSecureContext) {
    const range = document.createRange();
    range.selectNodeContents(resultEl);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    return alert("Press Ctrl+C/Cmd+C to copy the highlighted password.");
  }

  try {
    await navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  } catch (error) {
    console.error("Clipboard copy failed:", error);
    const range = document.createRange();
    range.selectNodeContents(resultEl);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    alert("Press Ctrl+C/Cmd+C to copy the highlighted password.");
  }
};

generateEl.onclick = () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerHTML = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
};

function generatePassword(lower, upper, number, symbol, length) {
  const generators = [
    lower && randomFunc.lower,
    upper && randomFunc.upper,
    number && randomFunc.number,
    symbol && randomFunc.symbol,
  ].filter(Boolean);

  if (generators.length === 0) {
    alert("No Selected Value");
    return "";
  }

  const chars = [];
  for (let i = 0; chars.length < length; i += 1) {
    const generator = generators[i % generators.length];
    chars.push(generator());
  }

  return chars.join("");
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// function getRandomUpper() {
//   return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
// }

// function getRandomNumber() {
//   return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
// }

// function getRandomSymbol() {
//   const symbols = "!@#$%^&*(){}[]=<>/,.";
//   return symbols[Math.floor(Math.random() * symbols.length)];
// }
