# Password Generator (WIP)

Lightweight in-browser password generator built with plain HTML/CSS/JS. The UI is in place; generation logic is still to be finished.

## Quick start
- Clone/download the repo and open `index.html` in your browser (no build step or dependencies).
- Toggle options in the settings panel and click **Generate Password** (logic placeholder right now).
- Click the clipboard icon to copy once functionality is implemented.

## Project status
- ✅ Layout and styling (`index.html`, `styles.css`) ready for desktop/mobile.
- ⏳ Password generation and clipboard copy logic (`script.js`) not implemented yet.
- ⚠️ Inputs currently accept values but do not produce a password until logic is added.

## Intended behavior (to implement)
- Generate passwords of configurable length (2–15 chars) using selected character sets: uppercase, lowercase, numbers, symbols.
- Display generated password in the result area and allow one-click copy.
- Graceful validation for invalid length/selection states.

## Local development notes
- Tech stack: vanilla HTML/CSS/JavaScript; no external build tools.
- Start by wiring JS to DOM elements (see IDs/classes in `index.html`).
- Add basic unit tests with your preferred approach (e.g., Jest + JSDOM) if desired.

## Roadmap / TODO
- [ ] Implement password generation utilities and DOM event handlers.
- [ ] Add clipboard copy with success/error feedback.
- [ ] Input validation and inline messages.
- [ ] Basic automated tests and linting.
- [ ] Deployment instructions (static hosting).
