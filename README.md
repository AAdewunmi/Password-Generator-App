# Password Generator

Lightweight in-browser password generator built with plain HTML/CSS/JS.

## Quick start
- Clone/download the repo and open `index.html` in your browser (no build step or dependencies).
- Choose length (2–15) and character types, then click **Generate Password**.
- Click the clipboard icon to copy the generated password; inline feedback confirms success/error.
- Run `npm test` for unit tests and `npm run lint` for ESLint checks.

## Project status
- ✅ Layout and styling (`index.html`, `styles.css`) ready for desktop/mobile.
- ✅ Password generation and clipboard copy logic (`script.js`) implemented.
- ✅ Validation with inline feedback for empty selections, invalid length, and clipboard failures.

## Behavior
- Generate passwords of configurable length (2–15 chars) using selected character sets: uppercase, lowercase, numbers, symbols.
- Display generated password in the result area and allow one-click copy.
- Inline status messages for invalid length, missing selection, and clipboard fallback instructions.

## Local development notes
- Tech stack: vanilla HTML/CSS/JavaScript; no external build tools.
- Start by wiring JS to DOM elements (see IDs/classes in `index.html`).
- Add basic unit tests with your preferred approach (e.g., Jest + JSDOM) if desired.

## Roadmap / TODO
- [x] Implement password generation utilities and DOM event handlers.
- [x] Add clipboard copy with success/error feedback.
- [x] Input validation and inline messages.
- [x] Basic automated tests and linting.
