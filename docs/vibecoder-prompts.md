# VibeCode Prompt Templates

Quick copy-paste prompts for integrating MicroPulse with VibeCode AI.

> **Before using:** Replace `YOUR_SURVEY_ID` and `YOUR_MICROPULSE_URL` with actual values from your dashboard.

---

## React / Next.js Apps

```
Install @micropulse/react package and add MicroPulseWidget component:

1. Run: npm install @micropulse/react

2. In app/layout.tsx (or pages/_app.tsx), add:

import { MicroPulseWidget } from '@micropulse/react'

<MicroPulseWidget 
  surveyId="YOUR_SURVEY_ID"
  baseUrl="YOUR_MICROPULSE_URL"
/>

Place it at the bottom of the component, after all other content.
```

---

## HTML / Static Sites

```
Add MicroPulse widget script before closing </body> tag:

<script 
  src="YOUR_MICROPULSE_URL/widget.js"
  data-survey-id="YOUR_SURVEY_ID"
  async
></script>
```

---

## Vue / Nuxt Apps

```
In app.vue or nuxt.config.ts, add this script tag:

<script 
  src="YOUR_MICROPULSE_URL/widget.js"
  data-survey-id="YOUR_SURVEY_ID"
  async
></script>
```

---

## Custom API Integration

```
Implement MicroPulse using direct API:

1. Fetch survey:
GET YOUR_MICROPULSE_URL/api/widget/YOUR_SURVEY_ID

2. Display survey.question and capture user answer

3. Submit response:
POST YOUR_MICROPULSE_URL/api/responses
Body: {
  "survey_id": "YOUR_SURVEY_ID",
  "answer": userAnswer,
  "respondent_id": generateUniqueId(),
  "page_url": window.location.href
}
Headers: Content-Type: application/json
```

---

## Environment Variables (Next.js)

```
Add to .env.local:

NEXT_PUBLIC_MICROPULSE_URL=YOUR_MICROPULSE_URL
NEXT_PUBLIC_MICROPULSE_SURVEY_ID=YOUR_SURVEY_ID

Then in code:

<MicroPulseWidget 
  surveyId={process.env.NEXT_PUBLIC_MICROPULSE_SURVEY_ID}
  baseUrl={process.env.NEXT_PUBLIC_MICROPULSE_URL}
/>
```

---

## Multiple Surveys (Different Pages)

```
Add conditional rendering based on page:

const pathname = usePathname()

const getSurveyId = () => {
  if (pathname === '/') return 'homepage-survey-id'
  if (pathname === '/pricing') return 'pricing-survey-id'
  if (pathname === '/checkout') return 'checkout-survey-id'
  return null
}

{getSurveyId() && (
  <MicroPulseWidget 
    surveyId={getSurveyId()}
    baseUrl="YOUR_MICROPULSE_URL"
  />
)}
```

---

## Troubleshooting Prompts

### If widget not showing:

```
Check MicroPulse widget integration:
1. Verify script tag or import exists
2. Console.log to check for errors
3. Ensure survey ID matches dashboard
4. Confirm survey status is "Active"
```

### If TypeScript errors:

```
Install type definitions:
npm install --save-dev @types/react @types/react-dom

Ensure @micropulse/react is in dependencies (not devDependencies)
```

### If build fails:

```
Re-install dependencies:
rm -rf node_modules package-lock.json
npm install
```

---

## Quick Reference Card

Copy-paste this into VibeCode:

```
MICROPULSE INTEGRATION CHEATSHEET

React/Next.js:
→ npm install @micropulse/react
→ import { MicroPulseWidget } from '@micropulse/react'
→ <MicroPulseWidget surveyId="ID" baseUrl="URL" />

HTML/Static:
→ <script src="URL/widget.js" data-survey-id="ID" async></script>

API:
→ GET URL/api/widget/ID (fetch survey)
→ POST URL/api/responses (submit answer)

Replace:
- ID = survey ID from MicroPulse dashboard
- URL = your MicroPulse deployment URL
```

---

## Full Documentation

For detailed guides:
- [Complete VibeCode Guide](vibecoder.md)
- [React Integration](react.md)
- [Vanilla JS Guide](vanilla.md)
- [API Reference](api.md)
