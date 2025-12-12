# Password Generator

Built for speed and clarity: a zero-dependency password generator with polished UI/UX, inline validation, and clipboard fallbacks so it behaves predictably in any browser.

## Highlights
- **Instant demo:** Open `index.html`—no build, no install.
- **Guardrails included:** Length validation (2–15), “choose at least one set” checks, and clear status messages.
- **Clipboard smart:** Uses the Clipboard API when available, guides the user to Ctrl/Cmd+C when it is not.
- **Mobile friendly:** Responsive layout with accessible labels and ARIA live regions for feedback.
- **Tested & linted:** Jest unit tests for generator logic; ESLint on by default.

## Screenshots

![Password Generator](./screenshots/screenshot_1.png)

![Password Generator — With Password](./screenshots/screenshot_1.png)

## Tech Stack
- HTML/CSS/Vanilla JS (no build tooling required)
- Jest for unit testing
- ESLint (recommended config) for linting
- npm scripts for test/lint orchestration

## How to use
1) Open `index.html` in a browser.  
2) Choose length and character sets (uppercase, lowercase, numbers, symbols).  
3) Click **Generate Password**, then tap the clipboard icon to copy.  
4) If the Clipboard API is blocked, the app highlights the password and tells the user how to copy manually.

## Local development
- Run tests: `npm test`
- Lint: `npm run lint`
- Key files: `index.html` (markup), `styles.css` (layout/theme), `script.js` (logic & DOM wiring), `__tests__/script.test.js` (unit tests).

## What this demonstrates
- Thoughtful UX for edge cases (invalid input, clipboard failures).
- Clean, dependency-free front-end architecture.
- Discipline with automated tests and linting, even on small utilities.
