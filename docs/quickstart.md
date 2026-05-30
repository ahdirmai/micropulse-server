# MicroPulse Quick Start

Get your feedback widget up and running in 5 minutes.

## Step 1: Create a Survey

1. Sign up at [your-micropulse-url.com]
2. Go to Dashboard → Create Survey
3. Choose question type (Rating, NPS, Choice, or Text)
4. Write your question
5. Copy the Survey ID

## Step 2: Choose Integration Method

Pick the method that matches your stack:

### 🎯 Vanilla JavaScript (Any Framework)

Best for: HTML sites, WordPress, any framework

```html
<script 
  src="https://your-domain.com/widget.js"
  data-survey-id="your-survey-id"
  async
></script>
```

Paste before `</body>` tag. Done!

[Full Vanilla Guide →](vanilla.md)

---

### ⚛️ React / Next.js

Best for: React, Next.js, Remix apps

```bash
npm install @micropulse/react
```

```tsx
import { MicroPulseWidget } from '@micropulse/react'

<MicroPulseWidget 
  surveyId="your-survey-id"
  baseUrl="https://your-domain.com"
/>
```

[Full React Guide →](react.md)

---

### 🔧 Direct API

Best for: Custom implementations, mobile apps, non-JS frameworks

```javascript
// Fetch survey
const survey = await fetch('/api/widget/YOUR_ID').then(r => r.json())

// Submit response
await fetch('/api/responses', {
  method: 'POST',
  body: JSON.stringify({
    survey_id: 'YOUR_ID',
    answer: '5',
    respondent_id: 'unique-id',
    page_url: window.location.href
  })
})
```

[Full API Reference →](api.md)

---

## Step 3: Test It

1. Open your site
2. Widget appears bottom-right
3. Click to open survey
4. Submit test response
5. Check Dashboard for response

## Troubleshooting

**Widget not showing?**
- Check survey ID is correct
- Verify survey status is "Active" in dashboard
- Check browser console for errors

**CORS errors?**
- Endpoints have `Access-Control-Allow-Origin: *`
- File from `file://` won't work - use HTTP server

**Response limit reached?**
- Free tier: 100 responses/month
- Upgrade to Pro for unlimited

## Next Steps

- [React Integration Guide](react.md)
- [Vanilla JS Guide](vanilla.md)
- [API Reference](api.md)
- [VibeCode Integration](vibecoder.md)
