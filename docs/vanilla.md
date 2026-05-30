# Vanilla JavaScript Integration

Embed MicroPulse widget with a single script tag. Works with any framework or no framework.

## Installation

### HTML / Static Sites

Paste before closing `</body>` tag:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <!-- Your content -->
  <h1>Welcome</h1>
  
  <!-- MicroPulse Widget -->
  <script 
    src="https://yourdomain.com/widget.js"
    data-survey-id="abc-123-xyz"
    async
  ></script>
</body>
</html>
```

### WordPress

**Method 1: Theme Footer**

Edit `footer.php` in your theme:

```php
<!-- Before wp_footer() -->
<script 
  src="https://yourdomain.com/widget.js"
  data-survey-id="abc-123-xyz"
  async
></script>
<?php wp_footer(); ?>
```

**Method 2: Plugin (Recommended)**

Use "Insert Headers and Footers" plugin:
1. Install plugin
2. Settings → Insert Headers and Footers
3. Paste script in "Scripts in Footer"

### Shopify

1. Admin → Online Store → Themes
2. Actions → Edit Code
3. Open `theme.liquid`
4. Paste before `</body>`

### Webflow

1. Project Settings → Custom Code
2. Paste in "Footer Code"
3. Publish site

## Configuration

### Required Attribute

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `data-survey-id` | string | Survey ID from dashboard | `"abc-123-xyz"` |

### Script URL

Use your MicroPulse deployment URL:
- Production: `https://yourdomain.com/widget.js`
- Development: `http://localhost:3001/widget.js`

## Behavior

### Display Logic

1. Widget loads asynchronously (doesn't block page)
2. Appears as FAB (Floating Action Button) bottom-right
3. Shows once per session
4. After submission, hidden for remainder of session

### Session Storage

Widget uses `sessionStorage` to prevent re-display:

```javascript
// Key format
sessionStorage.getItem('micropulse_{surveyId}')
// Value: '1' when completed
```

Clear to test again:
```javascript
sessionStorage.removeItem('micropulse_abc-123')
```

### Respondent Tracking

Persistent ID stored in `localStorage`:

```javascript
localStorage.getItem('micropulse_rid')
// Format: r_{random}_{timestamp}
```

Anonymous - no PII collected.

## Advanced Usage

### Multiple Surveys

Different surveys on different pages:

```html
<!-- Homepage -->
<script src="https://yourdomain.com/widget.js" data-survey-id="homepage-survey"></script>

<!-- Product Page -->
<script src="https://yourdomain.com/widget.js" data-survey-id="product-survey"></script>
```

### Conditional Loading

Load widget only on specific pages:

```html
<script>
  if (window.location.pathname === '/checkout') {
    const script = document.createElement('script')
    script.src = 'https://yourdomain.com/widget.js'
    script.setAttribute('data-survey-id', 'checkout-survey')
    script.async = true
    document.body.appendChild(script)
  }
</script>
```

### Event Tracking (Custom)

Track when widget is submitted:

```javascript
// Listen for response submission
window.addEventListener('storage', (e) => {
  if (e.key && e.key.startsWith('micropulse_')) {
    console.log('Survey completed:', e.key)
    // Your analytics code here
  }
})
```

## Technical Details

### File Size

- Widget script: **<5KB** gzipped
- No external dependencies
- Pure vanilla JavaScript

### Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance

- Async loading (non-blocking)
- Shadow DOM for CSS isolation
- No framework dependencies
- Lighthouse score: 100 (no impact)

### Security

- CSP compatible
- No inline scripts
- No external dependencies
- CORS enabled

## Styling

Widget uses Shadow DOM - your site's CSS won't affect it.

Custom colors (Pro plan only):

```html
<script 
  src="https://yourdomain.com/widget.js"
  data-survey-id="abc-123"
  data-color="#FF0000"
  async
></script>
```

## Troubleshooting

### Widget not showing

**Check browser console for errors:**

```javascript
// Test if script loaded
console.log(document.querySelector('[data-survey-id]'))

// Check session storage
console.log(sessionStorage.getItem('micropulse_abc-123'))
```

**Common issues:**
- Survey not "Active" in dashboard
- Wrong survey ID
- Already completed this session
- CORS issue (using file://)

### Clear widget state

```javascript
// Clear session (allow re-display)
sessionStorage.clear()

// Clear respondent ID (generate new)
localStorage.removeItem('micropulse_rid')

// Reload page
location.reload()
```

### Test locally

Use local server, not file:// protocol:

```bash
# Python
python -m http.server 8000

# Node
npx http-server

# PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## Examples

See `/examples/vanilla` for:
- Basic HTML site
- WordPress integration
- Multi-page survey
- Conditional loading

## Support

- [API Reference](api.md)
- [Quickstart Guide](quickstart.md)
- GitHub Issues: [your-repo]
