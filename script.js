const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

function createShowMessage(messageEl) {
  return function showMessage(text, variant = "success") {
    if (!messageEl) return;
    messageEl.textContent = text;
    messageEl.classList.remove("error", "success");
    messageEl.classList.add(variant);
  };
}

function attachClipboardHandler(clipboardEl, resultEl, showMessage) {
  if (!clipboardEl || !resultEl) return;

  clipboardEl.onclick = async () => {
    const password = resultEl.innerText;

    if (!password) {
      showMessage("Nothing to copy yet. Generate a password first.", "error");
      return;
    }

    if (!navigator.clipboard || !window.isSecureContext) {
      const range = document.createRange();
      range.selectNodeContents(resultEl);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      showMessage(
        "Press Ctrl+C/Cmd+C to copy the highlighted password.",
        "error"
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      showMessage("Password copied to clipboard!", "success");
    } catch (error) {
      console.error("Clipboard copy failed:", error);
      const range = document.createRange();
      range.selectNodeContents(resultEl);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      showMessage(
        "Press Ctrl+C/Cmd+C to copy the highlighted password.",
        "error"
      );
    }
  };
}

function attachGenerateHandler(
  generateEl,
  inputs,
  resultEl,
  showMessageFn = () => {}
) {
  if (!generateEl || !resultEl) return;

  const { lengthEl, lowercaseEl, uppercaseEl, numbersEl, symbolsEl } = inputs;

  generateEl.onclick = () => {
    const length = Number(lengthEl.value);
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    if (!Number.isInteger(length)) {
      showMessageFn("Password length must be a whole number.", "error");
      return;
    }

    if (length < 2 || length > 15) {
      showMessageFn("Choose a length between 2 and 15 characters.", "error");
      return;
    }

    const finalPassword = generatePassword(
      hasLower,
      hasUpper,
      hasNumber,
      hasSymbol,
      length,
      (text) => showMessageFn(text, "error")
    );

    if (!finalPassword) {
      return;
    }

    resultEl.innerHTML = finalPassword;
    showMessageFn("Password generated.", "success");
  };
}

function init() {
  const resultEl = document.querySelector(".result");
  const lengthEl = document.querySelector(".length");
  const uppercaseEl = document.querySelector(".uppercase");
  const lowercaseEl = document.querySelector(".lowercase");
  const numbersEl = document.querySelector(".numbers");
  const symbolsEl = document.querySelector(".symbols");
  const generateEl = document.querySelector("#generate");
  const clipboard = document.querySelector("#clipboard");
  const messageEl = document.querySelector(".message");

  const showMessage = createShowMessage(messageEl);
  attachClipboardHandler(clipboard, resultEl, showMessage);
  attachGenerateHandler(
    generateEl,
    { lengthEl, lowercaseEl, uppercaseEl, numbersEl, symbolsEl },
    resultEl,
    showMessage
  );
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}

function generatePassword(
  lower,
  upper,
  number,
  symbol,
  length,
  onError = () => {}
) {
  const generators = [
    lower && randomFunc.lower,
    upper && randomFunc.upper,
    number && randomFunc.number,
    symbol && randomFunc.symbol,
  ].filter(Boolean);

  if (generators.length === 0) {
    onError("Select at least one character type.");
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

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    generatePassword,
    getRandomLower,
    getRandomUpper,
    getRandomNumber,
    getRandomSymbol,
  };
}
