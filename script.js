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
