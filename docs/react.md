# React Integration Guide

Use MicroPulse in React and Next.js apps with the official React SDK.

## Installation

```bash
npm install @micropulse/react
```

## Basic Usage

### Next.js App Router

```tsx
// app/layout.tsx or app/page.tsx
import { MicroPulseWidget } from '@micropulse/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <MicroPulseWidget 
          surveyId="abc-123-xyz"
          baseUrl="https://yourdomain.com"
        />
      </body>
    </html>
  )
}
```

### Next.js Pages Router

```tsx
// pages/_app.tsx
import { MicroPulseWidget } from '@micropulse/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <MicroPulseWidget 
        surveyId="abc-123-xyz"
        baseUrl="https://yourdomain.com"
      />
    </>
  )
}
```

### Create React App / Vite

```tsx
// App.tsx
import { MicroPulseWidget } from '@micropulse/react'

function App() {
  return (
    <div className="App">
      <YourContent />
      <MicroPulseWidget 
        surveyId="abc-123-xyz"
        baseUrl="https://yourdomain.com"
      />
    </div>
  )
}
```

## API Reference

### `<MicroPulseWidget>`

Main component that renders the feedback widget.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `surveyId` | string | ✅ Yes | Survey ID from MicroPulse dashboard |
| `baseUrl` | string | ✅ Yes | Your MicroPulse instance URL |

#### Example

```tsx
<MicroPulseWidget 
  surveyId="abc-123-xyz"
  baseUrl="https://micropulse.yourdomain.com"
/>
```

## Advanced Usage

### Custom Implementation with Hooks

Use hooks directly for full control:

```tsx
import { useSurvey, useSubmitResponse, useRespondentId } from '@micropulse/react/hooks'

function CustomSurvey() {
  const surveyId = 'abc-123'
  const baseUrl = 'https://yourdomain.com'
  
  const { survey, loading, error } = useSurvey(surveyId, baseUrl)
  const respondentId = useRespondentId()
  const { submit, loading: submitting } = useSubmitResponse(
    surveyId,
    baseUrl,
    respondentId
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading survey</div>
  if (!survey) return null

  return (
    <div>
      <h3>{survey.question}</h3>
      <button onClick={() => submit('5')}>
        Submit Answer
      </button>
    </div>
  )
}
```

### Hooks API

#### `useSurvey(surveyId, baseUrl)`

Fetch survey data from MicroPulse API.

**Returns:**
```typescript
{
  survey: {
    question: string
    type: 'rating' | 'nps' | 'choice' | 'text'
    options: string[] | null
  } | null
  loading: boolean
  error: Error | null
}
```

#### `useSubmitResponse(surveyId, baseUrl, respondentId)`

Submit survey response.

**Returns:**
```typescript
{
  submit: (answer: string) => Promise<void>
  loading: boolean
  error: Error | null
  success: boolean
}
```

#### `useRespondentId()`

Get or generate persistent respondent ID from localStorage.

**Returns:** `string`

## Environment Variables

For Next.js, set in `.env.local`:

```bash
NEXT_PUBLIC_MICROPULSE_URL=https://yourdomain.com
```

Then use:

```tsx
<MicroPulseWidget 
  surveyId="abc-123"
  baseUrl={process.env.NEXT_PUBLIC_MICROPULSE_URL}
/>
```

## TypeScript Support

Full TypeScript support included:

```tsx
import type { SurveyType, SurveyData } from '@micropulse/react'

const surveyType: SurveyType = 'rating' // 'rating' | 'nps' | 'choice' | 'text'
```

## Bundle Size

- Main component: ~5KB
- Styles: ~3.5KB
- **Total: ~9KB** (gzipped)

Zero dependencies except React peer deps.

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- React 18+ or React 19+

## Troubleshooting

### Widget not appearing

1. Check survey is "Active" in dashboard
2. Verify `surveyId` matches dashboard
3. Check `baseUrl` is correct (no trailing slash)

### CORS errors

Make sure your MicroPulse instance has CORS enabled. The widget makes requests to:
- `GET /api/widget/{id}`
- `POST /api/responses`

### SSR/Hydration Issues

Widget checks `typeof window !== 'undefined'` before accessing localStorage/sessionStorage. Safe for SSR.

## Examples

See `/examples` directory for:
- Next.js App Router
- Next.js Pages Router
- Vite + React
- Custom hook implementation

## Support

- GitHub Issues: [your-repo/issues]
- Email: support@yourdomain.com
- Docs: [your-domain.com/docs]
