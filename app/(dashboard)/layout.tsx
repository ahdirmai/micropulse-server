import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-dark">
      <nav className="bg-dark-400 border-b border-dark-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg"></div>
              <h1 className="text-xl font-bold text-white">MicroPulse</h1>
            </div>
            <div className="flex items-center gap-6">
              <a href="/dashboard" className="text-sm text-gray-400 hover:text-brand transition">
                Dashboard
              </a>
              <a href="/dashboard/upgrade" className="text-sm text-gray-400 hover:text-brand transition">
                Upgrade
              </a>
              <span className="text-sm text-gray-400">{user.email}</span>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
