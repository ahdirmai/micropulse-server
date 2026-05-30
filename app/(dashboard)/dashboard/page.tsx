import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: surveys } = await supabase
    .from('surveys')
    .select(`
      *,
      responses:responses(count)
    `)
    .order('created_at', { ascending: false })

  const surveysWithCount = surveys?.map(survey => ({
    ...survey,
    response_count: survey.responses?.[0]?.count || 0
  })) || []

  // Get user settings and monthly count
  let { data: settings } = await supabase
    .from('user_settings')
    .select('tier')
    .eq('user_id', user!.id)
    .single()

  if (!settings) {
    await supabase
      .from('user_settings')
      .insert({ user_id: user!.id, tier: 'free' })
    settings = { tier: 'free' }
  }

  const currentTier = settings?.tier || 'free'
  let monthlyCount = 0

  if (currentTier === 'free') {
    const { data: count } = await supabase.rpc(
      'count_user_monthly_responses',
      { p_user_id: user!.id }
    )
    monthlyCount = count || 0
  }

  return (
    <div>
      {/* Usage Banner for Free Tier */}
      {currentTier === 'free' && (
        <div className="mb-6">
          <div className={`rounded-xl border p-4 ${
            monthlyCount >= 100 ? 'bg-red-500/10 border-red-500/30' :
            monthlyCount >= 80 ? 'bg-yellow-500/10 border-yellow-500/30' :
            'bg-dark-300 border-dark-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white mb-1">
                  {monthlyCount >= 100 ? '⛔ Response Limit Reached' :
                   monthlyCount >= 80 ? '⚠️ Approaching Limit' :
                   '📊 Monthly Usage'}
                </div>
                <div className="text-xs text-gray-400">
                  {monthlyCount >= 100
                    ? 'New responses blocked until next month or upgrade to Pro'
                    : 'Free tier includes 100 responses per month'}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    monthlyCount >= 100 ? 'text-red-400' :
                    monthlyCount >= 80 ? 'text-yellow-400' :
                    'text-brand'
                  }`}>
                    {monthlyCount} / 100
                  </div>
                  <div className="text-xs text-gray-500">responses</div>
                </div>
                {monthlyCount >= 80 && (
                  <Link
                    href="/dashboard/upgrade"
                    className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-600 transition font-medium text-sm"
                  >
                    Upgrade
                  </Link>
                )}
              </div>
            </div>
            {monthlyCount >= 80 && monthlyCount < 100 && (
              <div className="mt-3 pt-3 border-t border-yellow-500/20">
                <div className="h-2 bg-dark-500 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-red-500 transition-all"
                    style={{ width: `${monthlyCount}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Surveys</h1>
          <p className="text-gray-400">Manage your feedback widgets</p>
        </div>
        <Link
          href="/dashboard/surveys/new"
          className="px-6 py-3 bg-brand text-white rounded-xl hover:bg-brand-600 transition font-semibold shadow-lg shadow-brand/20"
        >
          + Create Survey
        </Link>
      </div>

      {surveysWithCount.length === 0 ? (
        <div className="bg-gradient-to-br from-dark-300 to-dark-400 rounded-2xl border border-dark-200 p-12 text-center">
          <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No surveys yet</h3>
          <p className="text-gray-400 mb-8">Create your first micro survey to start collecting feedback</p>
          <Link
            href="/dashboard/surveys/new"
            className="inline-block px-8 py-4 bg-brand text-white rounded-xl hover:bg-brand-600 transition font-semibold shadow-lg shadow-brand/20"
          >
            Create Your First Survey
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {surveysWithCount.map((survey) => (
            <div
              key={survey.id}
              className="bg-gradient-to-br from-dark-300 to-dark-400 rounded-2xl border border-dark-200 p-6 hover:border-brand-500/30 transition group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-2 group-hover:text-brand-400 transition">{survey.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{survey.question}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                  survey.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                  survey.status === 'paused' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                  'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                }`}>
                  {survey.status}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400 mb-6 pb-4 border-b border-dark-200">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="capitalize">{survey.type}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium text-brand-400">{survey.response_count}</span>
                  <span>responses</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/dashboard/surveys/${survey.id}/results`}
                  className="flex-1 text-center px-4 py-2.5 text-sm bg-dark-500 text-white rounded-xl hover:bg-dark-200 transition font-medium"
                >
                  Results
                </Link>
                <Link
                  href={`/dashboard/surveys/${survey.id}/embed`}
                  className="flex-1 text-center px-4 py-2.5 text-sm bg-brand text-white rounded-xl hover:bg-brand-600 transition font-medium"
                >
                  Embed
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
