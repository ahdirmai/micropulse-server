# Plan: Easy MicroPulse Integration for VibeCode Users

## Context

**Target Users:** VibeCode platform users who create web apps/websites autonomously using AI (just prompt → app generated)

**Problem:** Current MicroPulse integration requires manual script tag insertion. VibeCode users (and their AI code generator) need multiple integration methods that are:
- Easy for AI to understand and generate
- Framework-agnostic (works with any stack VibeCode generates)
- Well-documented for AI consumption
- Flexible (React components, vanilla JS, or direct API)

**Goal:** Make MicroPulse the easiest feedback widget to integrate into AI-generated apps

---

## Recommended Approach

### 1. **Keep Current Vanilla Widget** ✅ (Already Done)
- Single script tag integration
- Works with any framework/no framework
- Perfect for simple HTML sites

### 2. **Create React SDK Package** 🆕
- NPM package: `@micropulse/react`
- React hooks and components for React/Next.js apps
- Zero Supabase dependency (API-driven via fetch)
- Minimal bundle size

### 3. **Create Integration Documentation** 🆕
- AI-friendly docs with code examples
- Multiple integration paths clearly documented
- Copy-paste ready code snippets
- Troubleshooting guide

### 4. **Direct API Integration Guide** 🆕
- For custom implementations
- REST API documentation
- Authentication (none needed for widget)
- Rate limits and error handling

---

## Implementation Plan

### **Phase 1: React SDK (NPM Package)**

#### File Structure
```
packages/react-sdk/
├── src/
│   ├── hooks/
│   │   ├── useSurvey.ts          # Fetch survey data
│   │   ├── useSubmitResponse.ts  # Submit response
│   │   └── useRespondentId.ts    # Track respondent
│   ├── components/
│   │   ├── MicroPulseWidget.tsx  # Main widget component
│   │   ├── SurveyFAB.tsx         # Floating action button
│   │   └── SurveyCard.tsx        # Survey form card
│   ├── types/
│   │   └── index.ts              # Re-export from lib/types.ts
│   ├── styles/
│   │   └── widget.css            # CSS modules (no Tailwind)
│   └── index.ts                  # Public exports
├── package.json
├── tsconfig.json
└── README.md
```

#### Core Hooks

**`useSurvey(surveyId: string, baseUrl: string)`**
```typescript
// Fetches survey from GET /api/widget/[id]
// Returns: { survey, loading, error }
// Caches result to prevent re-fetches
```

**`useSubmitResponse(surveyId: string, baseUrl: string)`**
```typescript
// Submits to POST /api/responses
// Manages respondent ID via localStorage
// Tracks session storage to prevent duplicates
// Returns: { submit, loading, error, success }
```

**`useRespondentId()`**
```typescript
// Generate/retrieve persistent ID from localStorage
// Format: r_{random}_{timestamp}
// Already implemented in vanilla widget (public/widget.js:356-363)
```

#### Main Component

**`<MicroPulseWidget surveyId={string} baseUrl={string} />`**
```typescript
// Wrapper component that:
// 1. Uses useSurvey to fetch data
// 2. Renders FAB in bottom-right
// 3. Shows survey card on click
// 4. Uses useSubmitResponse for form submission
// 5. Supports all 4 survey types (rating, nps, choice, text)
// 6. Session storage prevents re-display
```

#### Package.json
```json
{
  "name": "@micropulse/react",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    ".": "./dist/index.js",
    "./hooks": "./dist/hooks/index.js"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "typescript": "^6.0.3",
    "@types/react": "^19.0.0",
    "tsup": "^8.0.0"
  }
}
```

#### Files to Modify/Create
- **CREATE**: `packages/react-sdk/` (new directory)
- **REFERENCE**: `lib/types.ts` (copy types)
- **REFERENCE**: `public/widget.js` (port logic to React)
- **UPDATE**: `package.json` (add workspace for monorepo)

---

### **Phase 2: Integration Documentation**

#### Create Documentation Site
**Location**: `docs/` or `app/docs/` (Next.js route)

**Pages to Create**:

1. **`docs/quickstart.md`**
   - Choose your framework
   - 3 integration methods side-by-side
   - Copy-paste examples

2. **`docs/react.md`**
   ```tsx
   // Installation
   npm install @micropulse/react
   
   // Usage
   import { MicroPulseWidget } from '@micropulse/react'
   
   function App() {
     return (
       <>
         <YourApp />
         <MicroPulseWidget 
           surveyId="your-survey-id"
           baseUrl="https://yourdomain.com"
         />
       </>
     )
   }
   ```

3. **`docs/vanilla.md`**
   ```html
   <!-- Paste before </body> -->
   <script 
     src="https://yourdomain.com/widget.js"
     data-survey-id="your-survey-id"
     async
   ></script>
   ```

4. **`docs/api.md`**
   - REST API endpoints
   - Request/response formats
   - Error codes
   - Rate limiting (100/month free tier)

5. **`docs/vibecoder.md`** (VibeCode-specific)
   - Prompt templates for VibeCode AI
   - Example: "Add MicroPulse feedback widget to my app with survey ID xxx"
   - Common VibeCode frameworks (React, Next.js, vanilla)
   - Troubleshooting VibeCode-generated apps

#### Files to Create
- **CREATE**: `docs/quickstart.md`
- **CREATE**: `docs/react.md`
- **CREATE**: `docs/vanilla.md`
- **CREATE**: `docs/api.md`
- **CREATE**: `docs/vibecoder.md`
- **UPDATE**: `app/page.tsx` (add link to docs)
- **OPTIONAL**: `app/docs/[slug]/page.tsx` (Next.js docs route)

---

### **Phase 3: API Documentation Enhancement**

#### Update API Route Comments
Add JSDoc comments to existing endpoints for AI/developer clarity:

**`app/api/widget/[id]/route.ts`**
```typescript
/**
 * GET /api/widget/[id]
 * 
 * Fetch survey data for embedding in widgets
 * 
 * @public No authentication required
 * @cors * (allows any origin)
 * 
 * @param {string} id - Survey UUID
 * @returns {object} { question, type, options }
 * @returns {404} Survey not found or not active
 * 
 * @example
 * fetch('https://yourdomain.com/api/widget/abc-123')
 *   .then(r => r.json())
 *   .then(data => console.log(data.question))
 */
```

**`app/api/responses/route.ts`**
```typescript
/**
 * POST /api/responses
 * 
 * Submit survey response
 * 
 * @public No authentication required
 * @cors * (allows any origin)
 * @ratelimit 100 responses/month (free tier)
 * 
 * @body {object} { survey_id, answer, respondent_id, page_url }
 * @returns {200} { success: true }
 * @returns {403} Monthly limit reached (free tier)
 * @returns {400} Invalid request
 * 
 * @example
 * fetch('https://yourdomain.com/api/responses', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     survey_id: 'abc-123',
 *     answer: '5',
 *     respondent_id: 'r_xyz',
 *     page_url: window.location.href
 *   })
 * })
 */
```

#### Files to Modify
- **UPDATE**: `app/api/widget/[id]/route.ts` (add JSDoc)
- **UPDATE**: `app/api/responses/route.ts` (add JSDoc)

---

### **Phase 4: Embed Page Enhancement**

#### Improve Dashboard Embed Instructions
Add multiple integration tabs on embed page:

**`app/(dashboard)/dashboard/surveys/[id]/embed/embed-client.tsx`**

Add tabs:
1. **Vanilla JS** (current script tag)
2. **React/Next.js** (NPM package usage)
3. **Direct API** (custom implementation guide)

Each tab shows:
- Installation command (if needed)
- Code snippet
- Copy button
- Preview

#### Files to Modify
- **UPDATE**: `app/(dashboard)/dashboard/surveys/[id]/embed/embed-client.tsx`
- **ADD**: Tab component with 3 options
- **ADD**: Syntax highlighting for code blocks

---

### **Phase 5: VibeCode-Specific Helpers**

#### Create Prompt Templates

**File**: `docs/vibecoder-prompts.md`

```markdown
## VibeCode Prompt Templates

### Add MicroPulse to React App
"Add @micropulse/react package and insert <MicroPulseWidget> component 
with surveyId='YOUR_ID' and baseUrl='https://yourdomain.com' at the 
bottom of the main app component"

### Add MicroPulse to HTML Site
"Add this script tag before </body>: 
<script src='https://yourdomain.com/widget.js' 
data-survey-id='YOUR_ID' async></script>"

### Custom Integration
"Fetch survey from GET /api/widget/YOUR_ID and render a custom form 
that posts to /api/responses with survey_id, answer, respondent_id, 
and page_url"
```

#### Files to Create
- **CREATE**: `docs/vibecoder-prompts.md`
- **CREATE**: `public/vibecoder-integration-guide.pdf` (downloadable)

---

## Critical Files Summary

### Files to Create
1. `packages/react-sdk/` - Full React SDK package
2. `docs/quickstart.md` - Quick integration guide
3. `docs/react.md` - React SDK docs
4. `docs/vanilla.md` - Vanilla JS docs
5. `docs/api.md` - API reference
6. `docs/vibecoder.md` - VibeCode-specific guide
7. `docs/vibecoder-prompts.md` - Copy-paste prompts

### Files to Modify
1. `app/api/widget/[id]/route.ts` - Add JSDoc comments
2. `app/api/responses/route.ts` - Add JSDoc comments
3. `app/(dashboard)/dashboard/surveys/[id]/embed/embed-client.tsx` - Multi-tab integration UI
4. `package.json` - Add workspaces for monorepo (if using React SDK)
5. `app/page.tsx` - Add "Docs" link in navigation

### Files to Reference (No Changes)
- `public/widget.js` - Port logic to React SDK
- `lib/types.ts` - Copy types to SDK
- `lib/supabase/client.ts` - Reference pattern (but SDK won't use Supabase)

---

## Verification Steps

### Test React SDK
1. Create test Next.js app
2. `npm install @micropulse/react`
3. Add `<MicroPulseWidget>` component
4. Verify widget loads and submits responses
5. Check localStorage and sessionStorage behavior
6. Test all 4 survey types (rating, nps, choice, text)

### Test Documentation
1. Follow quickstart guide from scratch
2. Test all code examples (copy-paste and run)
3. Verify links and navigation
4. Check mobile responsiveness

### Test VibeCode Prompts
1. Use VibeCode with prompt templates
2. Verify generated code works
3. Adjust prompts based on VibeCode output
4. Document edge cases

### Test API
1. curl GET /api/widget/[id]
2. curl POST /api/responses with sample data
3. Verify CORS headers
4. Test rate limiting (create 101 responses)

---

## Success Metrics

1. **Integration Time**: < 5 minutes from account creation to working widget
2. **Framework Support**: Vanilla JS, React, Next.js, Vue (via vanilla), Svelte (via vanilla)
3. **Documentation Coverage**: 100% of integration paths documented
4. **VibeCode Compatibility**: Prompts generate working code 95%+ of time
5. **NPM Package**: < 50KB bundle size for React SDK

---

## Timeline Estimate

- **Phase 1** (React SDK): 5-7 days
- **Phase 2** (Documentation): 2-3 days
- **Phase 3** (API Docs): 1 day
- **Phase 4** (Embed Page): 1-2 days
- **Phase 5** (VibeCode Helpers): 1 day

**Total**: 10-14 days for complete implementation
