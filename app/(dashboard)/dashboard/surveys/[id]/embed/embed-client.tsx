'use client'

import { useState } from 'react'

type Tab = 'vanilla' | 'react' | 'api'

interface EmbedClientProps {
  embedCode: string
  surveyId: string
  baseUrl: string
}

export default function EmbedClient({ embedCode, surveyId, baseUrl }: EmbedClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>('vanilla')
  const [copied, setCopied] = useState(false)

  const tabs = [
    { id: 'vanilla' as Tab, label: 'Vanilla JS', desc: 'HTML, WordPress, any site' },
    { id: 'react' as Tab, label: 'React / Next.js', desc: 'React, Next.js, Remix' },
    { id: 'api' as Tab, label: 'Direct API', desc: 'Custom implementation' },
  ]

  const getCode = () => {
    if (activeTab === 'vanilla') {
      return embedCode
    }
    if (activeTab === 'react') {
      return `npm install @micropulse/react

import { MicroPulseWidget } from '@micropulse/react'

<MicroPulseWidget
  surveyId="${surveyId}"
  baseUrl="${baseUrl}"
/>`
    }
    return `// Fetch survey data
const survey = await fetch('${baseUrl}/api/widget/${surveyId}')
  .then(r => r.json())

// Submit response
await fetch('${baseUrl}/api/responses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    survey_id: '${surveyId}',
    answer: userAnswer,
    respondent_id: getRespondentId(),
    page_url: window.location.href
  })
})`
  }

  const getInstructions = () => {
    if (activeTab === 'vanilla') {
      return [
        'Copy the code above',
        'Paste before closing </body> tag',
        'Widget appears automatically'
      ]
    }
    if (activeTab === 'react') {
      return [
        'Install @micropulse/react package',
        'Import MicroPulseWidget component',
        'Add to your layout or app component'
      ]
    }
    return [
      'Fetch survey data from widget API',
      'Build your custom UI',
      'Submit response to responses API'
    ]
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Embed Your Survey</h1>
        <p className="text-gray-600">Choose your integration method</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setCopied(false)
              }}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-brand text-brand'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div>{tab.label}</div>
              <div className="text-xs font-normal mt-0.5 opacity-75">{tab.desc}</div>
            </button>
          ))}
        </div>

        {/* Code Block */}
        <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
          <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap break-all">
            {getCode()}
          </pre>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-600 transition"
          >
            {copied ? 'Copied!' : 'Copy Code'}
          </button>

          {activeTab === 'vanilla' && (
            <a
              href="/docs/vanilla.md"
              target="_blank"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              View Docs
            </a>
          )}

          {activeTab === 'react' && (
            <a
              href="/docs/react.md"
              target="_blank"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              View Docs
            </a>
          )}

          {activeTab === 'api' && (
            <a
              href="/docs/api.md"
              target="_blank"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              API Reference
            </a>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Installation Steps</h2>
        <ol className="space-y-3 text-gray-700">
          {getInstructions().map((instruction, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-brand text-white rounded-full flex items-center justify-center text-sm">
                {i + 1}
              </span>
              <span>{instruction}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Preview</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
          <div className="text-sm mb-2">Widget appears as FAB in bottom-right corner</div>
          <div className="inline-block mt-4">
            <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
