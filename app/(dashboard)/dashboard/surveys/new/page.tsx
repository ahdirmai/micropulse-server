'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { SurveyType } from '@/lib/types'
import { createSurvey } from './actions'

export default function NewSurveyPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [question, setQuestion] = useState('')
  const [type, setType] = useState<SurveyType>('rating')
  const [options, setOptions] = useState(['', '', ''])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    formData.append('options', JSON.stringify(options))

    const result = await createSurvey(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
    // If successful, redirect happens in server action
  }

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, ''])
    }
  }

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Survey</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Internal Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
            placeholder="e.g., Homepage Feedback Q1 2024"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question
          </label>
          <textarea
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none resize-none"
            placeholder="e.g., How would you rate your experience?"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'rating', label: 'Star Rating (1-5)', icon: '⭐' },
              { value: 'nps', label: 'NPS Score (0-10)', icon: '📊' },
              { value: 'choice', label: 'Multiple Choice', icon: '☑️' },
              { value: 'text', label: 'Open Text', icon: '💬' },
            ].map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setType(t.value as SurveyType)}
                className={`p-4 border-2 rounded-lg text-left transition ${
                  type === t.value
                    ? 'border-brand bg-brand-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{t.icon}</div>
                <div className="font-medium text-sm">{t.label}</div>
              </button>
            ))}
          </div>
        </div>

        <input type="hidden" name="type" value={type} />

        {type === 'choice' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer Options (max 5)
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  required
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                  placeholder={`Option ${index + 1}`}
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {options.length < 5 && (
              <button
                type="button"
                onClick={addOption}
                className="text-sm text-brand hover:text-brand-600"
              >
                + Add Option
              </button>
            )}
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <Link
            href="/dashboard"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-600 transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Survey'}
          </button>
        </div>
      </form>
    </div>
  )
}
