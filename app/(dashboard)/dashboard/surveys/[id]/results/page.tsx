import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: survey } = await supabase
    .from('surveys')
    .select('*')
    .eq('id', id)
    .single()

  if (!survey) {
    notFound()
  }

  const { data: responses } = await supabase
    .from('responses')
    .select('*')
    .eq('survey_id', id)
    .order('created_at', { ascending: false })

  const totalResponses = responses?.length || 0

  let statsJSX = null

  if (survey.type === 'rating' || survey.type === 'nps') {
    const distribution: Record<string, number> = {}
    let sum = 0

    responses?.forEach(r => {
      const val = r.answer
      distribution[val] = (distribution[val] || 0) + 1
      sum += parseInt(val)
    })

    const average = totalResponses > 0 ? (sum / totalResponses).toFixed(1) : '0'
    const max = survey.type === 'rating' ? 5 : 10
    const range = Array.from({ length: max + 1 }, (_, i) => (survey.type === 'rating' ? i + 1 : i).toString())

    statsJSX = (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Distribution</h2>
        <div className="text-3xl font-bold text-brand mb-6">{average} avg</div>
        <div className="space-y-3">
          {range.map(val => {
            const count = distribution[val] || 0
            const percentage = totalResponses > 0 ? (count / totalResponses) * 100 : 0
            return (
              <div key={val} className="flex items-center gap-3">
                <span className="w-8 text-sm text-gray-600">{val}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-brand h-full rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-16 text-sm text-gray-600 text-right">{count} ({percentage.toFixed(0)}%)</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  } else if (survey.type === 'choice' && survey.options) {
    const distribution: Record<string, number> = {}
    responses?.forEach(r => {
      const val = r.answer
      distribution[val] = (distribution[val] || 0) + 1
    })

    statsJSX = (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Results</h2>
        <div className="space-y-3">
          {survey.options.map((opt: string) => {
            const count = distribution[opt] || 0
            const percentage = totalResponses > 0 ? (count / totalResponses) * 100 : 0
            return (
              <div key={opt} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="text-sm text-gray-900 mb-1">{opt}</div>
                  <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="bg-brand h-full rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
                <span className="w-20 text-sm text-gray-600 text-right">{count} ({percentage.toFixed(0)}%)</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  } else if (survey.type === 'text') {
    statsJSX = (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Recent Responses (max 50)</h2>
        <div className="space-y-3">
          {responses?.slice(0, 50).map(r => (
            <div key={r.id} className="border-l-4 border-brand pl-4 py-2">
              <p className="text-gray-900">{r.answer}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(r.created_at).toLocaleString()} • {r.page_url}
              </p>
            </div>
          ))}
          {totalResponses === 0 && (
            <p className="text-gray-500 text-center py-8">No responses yet</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{survey.title}</h1>
          <p className="text-gray-600">{survey.question}</p>
        </div>
        <Link
          href={`/api/export/${id}`}
          className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-600 transition"
        >
          Export CSV
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900">{totalResponses}</div>
            <div className="text-sm text-gray-600">Total Responses</div>
          </div>
          <div>
            <div className="text-3xl font-bold capitalize text-gray-900">{survey.type}</div>
            <div className="text-sm text-gray-600">Question Type</div>
          </div>
          <div>
            <div className={`text-3xl font-bold ${
              survey.status === 'active' ? 'text-green-600' :
              survey.status === 'paused' ? 'text-yellow-600' :
              'text-gray-600'
            }`}>
              {survey.status}
            </div>
            <div className="text-sm text-gray-600">Status</div>
          </div>
        </div>
      </div>

      {statsJSX}
    </div>
  )
}
