# Accessibility Auditor for React Applications

Proof of concept for automated accessibility auditing in React apps using axe-core and Playwright, with a proposed extension for AI-powered semantic analysis.

---

## What this project does

Audits a React application against WCAG 2.0 A, AA and WCAG 2.1 AA standards. Generates a structured JSON report with all violations found, including the WCAG criterion, CSS selector, and severity.

---

## What is implemented

- Headless browser automation with Playwright
- WCAG auditing with axe-core
- Structured JSON reports
- Demo React app with 10 intentional accessibility issues for testing

## What is proposed for future iterations

- AI-powered semantic analysis using Claude API for issues axe cannot detect
- Automatic GitHub PR creation for predictable fixes
- GitHub Actions workflow for scheduled nightly runs

---

## Project structure

---

## Prerequisites

- Node.js 18+
- npm 9+

---

## Installation

```bash
git clone <repository-url>
cd accessibility-auditor

cd demo-app
npm install

cd ../auditor
npm install
npx playwright install chromium
```

---

## How to run

Open two terminals.

Terminal 1 — start the React app:

```bash
cd demo-app
npm run dev
```

Terminal 2 — run the audit:

```bash
cd auditor
node audit.js
```

The report is generated in the `reports/` folder.

---

## Key insight — why axe alone is not enough

The demo app has 10 intentional accessibility issues. axe-core detects only 3 of them. The remaining 7 require semantic context that automated rule engines cannot evaluate — this is exactly where AI-powered analysis adds value to the pipeline.

### Detected by axe-core:
- Missing image alt
- Form inputs without labels
- Insufficient color contrast

### Not detected by axe — would require AI:
- Div styled as heading without using h1
- Broken heading hierarchy
- Icon-only button without aria-label
- Non-descriptive link text ("click here")
- Div with onClick instead of button
- Missing main landmark
- Form without semantic structure

---

## Proposed AI integration

The next iteration would:

1. Read source code of React components
2. Send the axe report + source to Claude API
3. Detect semantic issues axe missed
4. Create GitHub Issues for complex cases and PRs for simple auto-fixable ones

---

## Limitations

Automated tools detect 30-40% of accessibility issues. AI-assisted analysis adds another 30-40%. The remaining 20-30% requires manual testing with real users with disabilities.

---

## Author

Adrian — www.linkedin.com/in/yamidcastao