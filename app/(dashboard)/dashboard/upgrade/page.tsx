import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function UpgradePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Get user settings
  let { data: settings } = await supabase
    .from('user_settings')
    .select('tier')
    .eq('user_id', user.id)
    .single()

  // Create settings if not exists
  if (!settings) {
    await supabase
      .from('user_settings')
      .insert({ user_id: user.id, tier: 'free' })
    settings = { tier: 'free' }
  }

  const currentTier = settings?.tier || 'free'

  // Get monthly response count
  const { data: monthlyCount } = await supabase.rpc(
    'count_user_monthly_responses',
    { p_user_id: user.id }
  )

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white mb-2">Upgrade Your Plan</h1>
        <p className="text-gray-400">Choose the plan that works for you</p>
      </div>

      {/* Current Usage */}
      <div className="bg-gradient-to-br from-dark-300 to-dark-400 rounded-2xl border border-dark-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-400 mb-1">Current Plan</div>
            <div className="text-2xl font-bold text-white capitalize">{currentTier}</div>
          </div>
          {currentTier === 'free' && (
            <div>
              <div className="text-sm text-gray-400 mb-1">This Month</div>
              <div className="text-2xl font-bold text-brand">{monthlyCount || 0} / 100</div>
              <div className="text-xs text-gray-500">responses</div>
            </div>
          )}
        </div>
        {currentTier === 'free' && monthlyCount && monthlyCount >= 80 && (
          <div className="mt-4 p-3 bg-brand/10 border border-brand/30 rounded text-sm text-brand">
            ⚠️ You're approaching your monthly limit. Upgrade to Pro for unlimited responses.
          </div>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-gradient-to-br from-dark-300 to-dark-400 rounded-2xl border-2 border-dark-200 p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-black text-white mb-2">FREE</h3>
              <p className="text-sm text-gray-400">For side projects</p>
            </div>
            {currentTier === 'free' && (
              <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs font-bold text-green-400">
                CURRENT
              </div>
            )}
          </div>

          <div className="mb-8">
            <div className="text-5xl font-black text-white mb-2">
              Rp0<span className="text-xl text-gray-500">/mo</span>
            </div>
          </div>

          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <span className="text-brand text-lg">✓</span>
              <span className="text-gray-300"><strong className="text-white">100 responses</strong> per month</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand text-lg">✓</span>
              <span className="text-gray-300">Unlimited surveys</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand text-lg">✓</span>
              <span className="text-gray-300">All 4 question types</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand text-lg">✓</span>
              <span className="text-gray-300">Real-time analytics</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand text-lg">✓</span>
              <span className="text-gray-300">CSV export</span>
            </li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-br from-brand-500/20 to-brand-600/10 rounded-2xl border-2 border-brand-500/50 p-8 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand rounded-full text-sm font-black">
            RECOMMENDED
          </div>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-black text-white mb-2">PRO</h3>
              <p className="text-sm text-gray-400">For real businesses</p>
            </div>
            {currentTier === 'pro' && (
              <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs font-bold text-green-400">
                CURRENT
              </div>
            )}
          </div>

          <div className="mb-8">
            <div className="text-5xl font-black text-white mb-2">
              99K<span className="text-xl text-gray-400">/mo</span>
            </div>
            <p className="text-sm text-gray-400">Billed monthly in IDR</p>
          </div>

          <ul className="space-y-3 text-sm mb-8">
            <li className="flex items-center gap-3">
              <span className="text-brand text-lg">✓</span>
              <span className="text-white font-bold">Unlimited responses</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand text-lg">✓</span>
              <span className="text-gray-300">Everything in Free, plus:</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand text-lg">✓</span>
              <span className="text-gray-300">Remove branding</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand text-lg">✓</span>
              <span className="text-gray-300">Custom widget colors</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand text-lg">✓</span>
              <span className="text-gray-300">Priority support</span>
            </li>
          </ul>

          {currentTier === 'free' ? (
            <div className="space-y-3">
              <div className="block w-full text-center py-4 bg-brand text-dark font-black rounded-xl hover:bg-brand-400 transition cursor-not-allowed opacity-50">
                COMING SOON
              </div>
              <p className="text-xs text-gray-400 text-center">
                Payment integration coming soon. Contact us to upgrade manually.
              </p>
            </div>
          ) : (
            <div className="block w-full text-center py-4 bg-dark-500 text-gray-400 rounded-xl cursor-not-allowed">
              Your current plan
            </div>
          )}
        </div>
      </div>

      {/* Features Comparison */}
      <div className="mt-12 bg-gradient-to-br from-dark-300 to-dark-400 rounded-2xl border border-dark-200 p-8">
        <h3 className="text-2xl font-black mb-6">Feature Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-200">
                <th className="text-left py-3 text-gray-400 font-medium">Feature</th>
                <th className="text-center py-3 text-gray-400 font-medium">Free</th>
                <th className="text-center py-3 text-gray-400 font-medium">Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-200">
              <tr>
                <td className="py-3 text-gray-300">Monthly responses</td>
                <td className="text-center py-3">100</td>
                <td className="text-center py-3 text-brand font-bold">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-300">Surveys</td>
                <td className="text-center py-3">Unlimited</td>
                <td className="text-center py-3">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-300">Question types</td>
                <td className="text-center py-3">All 4</td>
                <td className="text-center py-3">All 4</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-300">Branding removal</td>
                <td className="text-center py-3 text-gray-600">✗</td>
                <td className="text-center py-3 text-brand">✓</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-300">Custom colors</td>
                <td className="text-center py-3 text-gray-600">✗</td>
                <td className="text-center py-3 text-brand">✓</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-300">Support</td>
                <td className="text-center py-3">Email</td>
                <td className="text-center py-3 text-brand">Priority</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
