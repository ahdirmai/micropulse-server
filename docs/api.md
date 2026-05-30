# API Reference

REST API documentation for custom MicroPulse integrations.

## Base URL

```
https://yourdomain.com
```

Replace with your MicroPulse deployment URL.

## Authentication

**Public endpoints** - No authentication required for widget operations.

Dashboard operations require session authentication (magic link).

## Endpoints

### GET /api/widget/{id}

Fetch survey data for rendering widget.

**Public:** ✅ No authentication required  
**CORS:** Enabled (`Access-Control-Allow-Origin: *`)

#### Request

```http
GET /api/widget/abc-123-xyz HTTP/1.1
Host: yourdomain.com
```

#### Response

```json
{
  "question": "How would you rate your experience?",
  "type": "rating",
  "options": null
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `question` | string | Survey question text |
| `type` | string | `"rating"` \| `"nps"` \| `"choice"` \| `"text"` |
| `options` | string[] \| null | Answer options (only for `choice` type) |

#### Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 404 | Survey not found or not active |

#### Example

```javascript
const surveyId = 'abc-123-xyz'
const response = await fetch(`https://yourdomain.com/api/widget/${surveyId}`)
const survey = await response.json()

console.log(survey.question) // "How would you rate..."
console.log(survey.type)     // "rating"
```

---

### POST /api/responses

Submit survey response.

**Public:** ✅ No authentication required  
**CORS:** Enabled (`Access-Control-Allow-Origin: *`)  
**Rate Limit:** 100 responses/month (free tier), unlimited (pro tier)

#### Request

```http
POST /api/responses HTTP/1.1
Host: yourdomain.com
Content-Type: application/json

{
  "survey_id": "abc-123-xyz",
  "answer": "5",
  "respondent_id": "r_abc123",
  "page_url": "https://example.com/page"
}
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `survey_id` | string | ✅ Yes | Survey UUID |
| `answer` | string | ✅ Yes | User's answer (max 500 chars) |
| `respondent_id` | string | ✅ Yes | Unique respondent ID |
| `page_url` | string | ✅ Yes | URL where survey was answered |

#### Response

**Success (200):**
```json
{
  "success": true
}
```

**Limit Reached (403):**
```json
{
  "error": "Monthly response limit reached. Upgrade to Pro for unlimited responses."
}
```

**Invalid Request (400):**
```json
{
  "error": "Missing required fields"
}
```

or

```json
{
  "error": "Answer too long (max 500 characters)"
}
```

or

```json
{
  "error": "Survey not active"
}
```

#### Status Codes

| Code | Meaning |
|------|---------|
| 200 | Response submitted successfully |
| 400 | Invalid request (missing fields, survey inactive) |
| 403 | Rate limit reached (free tier) |
| 500 | Server error |

#### Example

```javascript
const response = await fetch('https://yourdomain.com/api/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    survey_id: 'abc-123-xyz',
    answer: '5',
    respondent_id: generateRespondentId(),
    page_url: window.location.href
  })
})

if (response.status === 403) {
  const error = await response.json()
  console.log('Limit reached:', error.error)
}
```

---

## Data Types

### Survey Types

```typescript
type SurveyType = 'rating' | 'nps' | 'choice' | 'text'
```

| Type | Answer Format | Description |
|------|---------------|-------------|
| `rating` | `"1"` to `"5"` | Star rating (1-5) |
| `nps` | `"0"` to `"10"` | Net Promoter Score (0-10) |
| `choice` | One of `options` | Multiple choice (max 5 options) |
| `text` | Free text | Open text response (max 500 chars) |

### Answer Validation

```javascript
// Rating: 1-5
const answer = "5" // ✅ Valid
const answer = "0" // ❌ Invalid (must be 1-5)

// NPS: 0-10
const answer = "10" // ✅ Valid
const answer = "11" // ❌ Invalid (must be 0-10)

// Choice: must match options
const answer = "Option A" // ✅ Valid if in survey.options
const answer = "Other" // ❌ Invalid if not in survey.options

// Text: max 500 characters
const answer = "Great product!" // ✅ Valid
const answer = "a".repeat(501) // ❌ Invalid (too long)
```

## Respondent ID

Generate persistent ID for tracking:

```javascript
function generateRespondentId() {
  // Check localStorage first
  let id = localStorage.getItem('micropulse_rid')
  
  if (!id) {
    // Generate new ID
    const random = Math.random().toString(36).substring(2, 11)
    const timestamp = Date.now().toString(36)
    id = `r_${random}${timestamp}`
    
    // Store for future use
    localStorage.setItem('micropulse_rid', id)
  }
  
  return id
}
```

Format: `r_{random}_{timestamp}`  
Example: `r_abc123def_lx9k2m`

## Session Tracking

Prevent duplicate submissions:

```javascript
// Check if already submitted this session
const storageKey = `micropulse_${surveyId}`
if (sessionStorage.getItem(storageKey)) {
  console.log('Already submitted this session')
  return
}

// After successful submission
sessionStorage.setItem(storageKey, '1')
```

## Rate Limiting

### Free Tier
- **100 responses per month** per user account
- Counter resets on calendar month
- Applies to survey owner, not respondent

### Pro Tier
- **Unlimited responses**
- No monthly cap

### Checking Limit

Submit normally - API returns 403 when limit reached:

```javascript
const response = await fetch('/api/responses', { method: 'POST', ... })

if (response.status === 403) {
  const { error } = await response.json()
  // "Monthly response limit reached. Upgrade to Pro..."
  showUpgradePrompt()
}
```

## Error Handling

```javascript
async function submitResponse(surveyId, answer) {
  try {
    const response = await fetch('/api/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        survey_id: surveyId,
        answer,
        respondent_id: generateRespondentId(),
        page_url: window.location.href
      })
    })

    // Check for rate limit
    if (response.status === 403) {
      const { error } = await response.json()
      throw new Error(error)
    }

    // Check for other errors
    if (!response.ok) {
      throw new Error('Failed to submit response')
    }

    return await response.json()
  } catch (error) {
    console.error('Submission error:', error.message)
    throw error
  }
}
```

## CORS Configuration

All widget endpoints support cross-origin requests:

```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

Preflight requests (OPTIONS) are handled automatically.

## Example Implementations

### Minimal Widget

```javascript
async function loadMicroPulseSurvey(surveyId) {
  // Fetch survey
  const survey = await fetch(`/api/widget/${surveyId}`)
    .then(r => r.json())
  
  // Render based on type
  if (survey.type === 'rating') {
    renderRatingWidget(survey)
  }
  
  // Submit handler
  async function handleSubmit(answer) {
    await fetch('/api/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        survey_id: surveyId,
        answer,
        respondent_id: getOrCreateRespondentId(),
        page_url: location.href
      })
    })
  }
}
```

### Mobile App (Swift)

```swift
struct Survey: Codable {
    let question: String
    let type: String
    let options: [String]?
}

func fetchSurvey(id: String) async throws -> Survey {
    let url = URL(string: "https://yourdomain.com/api/widget/\(id)")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode(Survey.self, from: data)
}

func submitResponse(surveyId: String, answer: String) async throws {
    let url = URL(string: "https://yourdomain.com/api/responses")!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    
    let body: [String: String] = [
        "survey_id": surveyId,
        "answer": answer,
        "respondent_id": getRespondentId(),
        "page_url": "app://survey"
    ]
    
    request.httpBody = try JSONEncoder().encode(body)
    try await URLSession.shared.data(for: request)
}
```

## Webhooks

*Coming soon* - Real-time notifications when responses are submitted.

## Support

- [Quickstart Guide](quickstart.md)
- [React Integration](react.md)
- [Vanilla JS Integration](vanilla.md)
- GitHub Issues: [your-repo]
