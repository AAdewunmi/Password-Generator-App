// Maps the character type toggles to their generator helpers.
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

/**
 * Builds a function that updates a status message element.
 * @param {HTMLElement | null} messageEl - Target element for status text.
 * @returns {(text: string, variant?: "success" | "error") => void}
 */
function createShowMessage(messageEl) {
  // Returns a UI helper for consistent status messaging.
  return function showMessage(text, variant = "success") {
    if (!messageEl) return;
    messageEl.textContent = text;
    messageEl.classList.remove("error", "success");
    messageEl.classList.add(variant);
  };
}

/**
 * Adds clipboard copy behavior to a control element.
 * Falls back to manual selection when the Clipboard API is unavailable.
 * @param {HTMLElement | null} clipboardEl - Button/icon to trigger copy.
 * @param {HTMLElement | null} resultEl - Element containing the password text.
 * @param {(text: string, variant?: "success" | "error") => void} showMessage - UI notifier.
 */
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

/**
 * Hooks up password generation to the UI controls.
 * Validates inputs, triggers generation, and surfaces status messages.
 * @param {HTMLElement | null} generateEl - Generate button element.
 * @param {{lengthEl: HTMLInputElement, lowercaseEl: HTMLInputElement, uppercaseEl: HTMLInputElement, numbersEl: HTMLInputElement, symbolsEl: HTMLInputElement}} inputs - Form controls.
 * @param {HTMLElement | null} resultEl - Display element for the generated password.
 * @param {(text: string, variant?: "success" | "error") => void} [showMessageFn] - Optional UI notifier.
 */
function attachGenerateHandler(
  generateEl,
  inputs,
  resultEl,
  showMessageFn = () => {}
) {
  if (!generateEl || !resultEl) return;

  const { lengthEl, lowercaseEl, uppercaseEl, numbersEl, symbolsEl } = inputs;

  generateEl.onclick = () => {
    // Gather user settings and validate before generating.
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

/**
 * Initializes DOM references and event handlers when the page is ready.
 */
function init() {
  // Wire up DOM elements and event handlers.
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
  // Build the active generator list based on toggles.
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

  // Cycle through available generators to spread character types evenly.
  const chars = [];
  for (let i = 0; chars.length < length; i += 1) {
    const generator = generators[i % generators.length];
    chars.push(generator());
  }

  return chars.join("");
}

/**
 * Returns a random lowercase ASCII letter.
 * @returns {string}
 */
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

/**
 * Returns a random uppercase ASCII letter.
 * @returns {string}
 */
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

/**
 * Returns a random numeric digit.
 * @returns {string}
 */
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

/**
 * Returns a random symbol from the allowed set.
 * @returns {string}
 */
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
