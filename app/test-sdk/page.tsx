import { MicroPulseWidget } from '@micropulse/react'

export default function TestSDKPage() {
  // Use the test survey ID we created earlier
  const surveyId = 'dedbf2e1-29cd-4b03-9590-cb1a084e322f'
  const baseUrl = process.env.NEXT_PUBLIC_WIDGET_BASE_URL || 'http://localhost:3001'

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React SDK Test Page
          </h1>
          <p className="text-gray-600 mb-6">
            Testing @micropulse/react package integration
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="font-semibold text-blue-900 mb-2">Test Details</h2>
            <div className="text-sm text-blue-800 space-y-1">
              <div><strong>Survey ID:</strong> {surveyId}</div>
              <div><strong>Base URL:</strong> {baseUrl}</div>
              <div><strong>SDK:</strong> @micropulse/react</div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Sample Content</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="text-sm text-gray-500 mt-8">
              👉 Look for the orange FAB button in the bottom-right corner
            </p>
          </div>
        </div>
      </div>

      {/* MicroPulse Widget */}
      <MicroPulseWidget
        surveyId={surveyId}
        baseUrl={baseUrl}
      />
    </div>
  )
}
