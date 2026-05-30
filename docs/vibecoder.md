# VibeCode Integration Guide

Easy MicroPulse integration for VibeCode AI-generated applications.

## What is VibeCode?

VibeCode creates full web apps/websites from AI prompts. This guide helps VibeCode users integrate MicroPulse feedback widgets into their generated applications.

## Quick Integration

### For React/Next.js Apps

**Prompt to VibeCode:**

```
Add MicroPulse feedback widget to my app:

1. Install @micropulse/react package
2. Add this component at the bottom of the main layout:

<MicroPulseWidget 
  surveyId="YOUR_SURVEY_ID"
  baseUrl="YOUR_MICROPULSE_URL"
/>

Import from '@micropulse/react'
```

**VibeCode will generate:**

```tsx
// Install command it runs
npm install @micropulse/react

// Code it adds to your layout
import { MicroPulseWidget } from '@micropulse/react'

export default function Layout({ children }) {
  return (
    <>
      {children}
      <MicroPulseWidget 
        surveyId="abc-123-xyz"
        baseUrl="https://yourdomain.com"
      />
    </>
  )
}
```

### For HTML/Vanilla Sites

**Prompt to VibeCode:**

```
Add this script tag before </body>:

<script 
  src="YOUR_MICROPULSE_URL/widget.js"
  data-survey-id="YOUR_SURVEY_ID"
  async
></script>
```

**VibeCode will add:**

```html
<!DOCTYPE html>
<html>
<body>
  <!-- Your app content -->
  
  <script 
    src="https://yourdomain.com/widget.js"
    data-survey-id="abc-123-xyz"
    async
  ></script>
</body>
</html>
```

---

## Step-by-Step Guide

### Step 1: Create MicroPulse Survey

1. Sign up at your MicroPulse instance
2. Create a survey in dashboard
3. Copy the Survey ID (e.g., `abc-123-xyz`)
4. Note your MicroPulse URL (e.g., `https://micropulse.yourdomain.com`)

### Step 2: Choose Integration Method

Based on what VibeCode generated:

| VibeCode Generated | Integration Method | Prompt Template |
|--------------------|-------------------|-----------------|
| React/Next.js app | React SDK | [React Template](#react-template) |
| HTML/Static site | Vanilla JS | [Vanilla Template](#vanilla-template) |
| Vue/Svelte app | Vanilla JS | [Vanilla Template](#vanilla-template) |
| Custom framework | Direct API | [API Template](#api-template) |

### Step 3: Use Prompt Template

Copy the appropriate template below and replace:
- `YOUR_SURVEY_ID` → Your survey ID
- `YOUR_MICROPULSE_URL` → Your MicroPulse deployment URL

---

## Prompt Templates

### React Template

```
Install @micropulse/react package and add MicroPulse widget:

1. Run: npm install @micropulse/react

2. In the main layout file (app/layout.tsx or pages/_app.tsx), add:

import { MicroPulseWidget } from '@micropulse/react'

<MicroPulseWidget 
  surveyId="YOUR_SURVEY_ID"
  baseUrl="YOUR_MICROPULSE_URL"
/>

Place it at the bottom of the component, after all other content.
```

**Example with real values:**

```
Install @micropulse/react and add feedback widget:

1. npm install @micropulse/react

2. In app/layout.tsx:

import { MicroPulseWidget } from '@micropulse/react'

<MicroPulseWidget 
  surveyId="abc-123-xyz"
  baseUrl="https://micropulse.example.com"
/>
```

### Vanilla Template

```
Add MicroPulse widget script tag:

In the main HTML file, add this before </body>:

<script 
  src="YOUR_MICROPULSE_URL/widget.js"
  data-survey-id="YOUR_SURVEY_ID"
  async
></script>
```

**Example with real values:**

```
Add feedback widget before </body>:

<script 
  src="https://micropulse.example.com/widget.js"
  data-survey-id="abc-123-xyz"
  async
></script>
```

### API Template

```
Add MicroPulse feedback using their API:

1. Fetch survey:
GET YOUR_MICROPULSE_URL/api/widget/YOUR_SURVEY_ID

2. Display the survey.question and get user answer

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

## Common VibeCode Scenarios

### Scenario 1: Next.js App Router

**Prompt:**
```
In app/layout.tsx, install @micropulse/react and add widget component 
at bottom with surveyId="abc-123" and baseUrl="https://micropulse.example.com"
```

**VibeCode generates:**

```tsx
import { MicroPulseWidget } from '@micropulse/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <MicroPulseWidget 
          surveyId="abc-123"
          baseUrl="https://micropulse.example.com"
        />
      </body>
    </html>
  )
}
```

### Scenario 2: Vite + React

**Prompt:**
```
Install @micropulse/react, then in App.tsx add MicroPulseWidget component 
at the end with these props:
- surveyId: "abc-123"  
- baseUrl: "https://micropulse.example.com"
```

**VibeCode generates:**

```tsx
import { MicroPulseWidget } from '@micropulse/react'

function App() {
  return (
    <div className="App">
      <YourContent />
      <MicroPulseWidget 
        surveyId="abc-123"
        baseUrl="https://micropulse.example.com"
      />
    </div>
  )
}
```

### Scenario 3: Static HTML Site

**Prompt:**
```
Add script tag for MicroPulse widget before closing body tag:
src="https://micropulse.example.com/widget.js"
data-survey-id="abc-123"
async
```

**VibeCode generates:**

```html
<!DOCTYPE html>
<html>
<head>...</head>
<body>
  <main>Your content</main>
  
  <script 
    src="https://micropulse.example.com/widget.js"
    data-survey-id="abc-123"
    async
  ></script>
</body>
</html>
```

### Scenario 4: Vue/Nuxt App

**Prompt:**
```
Add MicroPulse widget using vanilla script tag in app.vue or nuxt.config.ts:

<script 
  src="https://micropulse.example.com/widget.js"
  data-survey-id="abc-123"
  async
></script>
```

---

## Troubleshooting VibeCode Apps

### Widget Not Showing

**Check VibeCode generated code:**

1. Verify script tag or import exists
2. Check survey ID matches dashboard
3. Ensure baseUrl is correct

**Test manually:**

```javascript
// In browser console
console.log(document.querySelector('[data-survey-id]'))
// Should show: <script data-survey-id="...">
```

### TypeScript Errors

If VibeCode adds TypeScript and shows errors:

**Prompt:**
```
Install @types/react and @types/react-dom, 
then add @micropulse/react to dependencies
```

### Build Errors

If build fails after adding widget:

**Prompt:**
```
Make sure @micropulse/react is in package.json dependencies,
not devDependencies. Re-run npm install.
```

### SSR/Hydration Errors

For Next.js SSR issues:

**Prompt:**
```
MicroPulseWidget is safe for SSR. If seeing hydration errors,
make sure it's the last component in the tree, after all
dynamic content.
```

---

## Environment Variables

For VibeCode apps using env vars:

**Prompt:**
```
Add to .env.local:
NEXT_PUBLIC_MICROPULSE_URL=https://micropulse.example.com
NEXT_PUBLIC_MICROPULSE_SURVEY_ID=abc-123

Then use:
<MicroPulseWidget 
  surveyId={process.env.NEXT_PUBLIC_MICROPULSE_SURVEY_ID}
  baseUrl={process.env.NEXT_PUBLIC_MICROPULSE_URL}
/>
```

---

## Multiple Surveys

Different surveys on different pages:

**Prompt:**
```
On homepage: use surveyId="homepage-survey"
On pricing page: use surveyId="pricing-survey"  
On checkout: use surveyId="checkout-survey"

Add conditional rendering based on pathname.
```

**VibeCode generates:**

```tsx
const pathname = usePathname()

const getSurveyId = () => {
  if (pathname === '/') return 'homepage-survey'
  if (pathname === '/pricing') return 'pricing-survey'
  if (pathname === '/checkout') return 'checkout-survey'
  return null
}

{getSurveyId() && (
  <MicroPulseWidget 
    surveyId={getSurveyId()}
    baseUrl="https://micropulse.example.com"
  />
)}
```

---

## Advanced: Custom Styling

For VibeCode apps that need custom colors:

**Prompt (Coming Soon):**
```
Add MicroPulseWidget with custom color:
data-color="#FF0000" (for vanilla)
or
color="#FF0000" prop (for React)
```

*Note: Custom colors require Pro plan*

---

## AI Prompt Best Practices

When prompting VibeCode:

✅ **Do:**
- Specify exact package name: `@micropulse/react`
- Include full import path
- Provide complete component with props
- Mention where to place it (bottom of layout)

❌ **Don't:**
- Say "add feedback" (too vague)
- Forget to specify surveyId and baseUrl
- Mix React and vanilla approaches

**Good Prompt:**
```
Install @micropulse/react package, then import MicroPulseWidget 
from '@micropulse/react' and add it at the bottom of app/layout.tsx 
with props surveyId="abc-123" and baseUrl="https://example.com"
```

**Bad Prompt:**
```
add micropulse feedback widget
```

---

## Examples

Full VibeCode integration examples:

- [Next.js App](../examples/vibecode-nextjs)
- [Vite + React](../examples/vibecode-vite)
- [Static HTML](../examples/vibecode-html)

---

## Support

**MicroPulse Docs:**
- [Quickstart](quickstart.md)
- [React Guide](react.md)
- [Vanilla JS Guide](vanilla.md)
- [API Reference](api.md)

**VibeCode Help:**
- Ask VibeCode AI to check MicroPulse docs
- Share this guide link with VibeCode AI
- Use prompt templates above

---

## Quick Reference Card

Copy-paste for VibeCode AI:

```
MICROPULSE INTEGRATION

React/Next.js:
npm install @micropulse/react
import { MicroPulseWidget } from '@micropulse/react'
<MicroPulseWidget surveyId="ID" baseUrl="URL" />

HTML/Static:
<script src="URL/widget.js" data-survey-id="ID" async></script>

Replace:
- ID = survey ID from dashboard
- URL = MicroPulse deployment URL
```
