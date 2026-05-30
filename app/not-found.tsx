import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="text-center">
        <div className="inline-block mb-8">
          <div className="text-9xl font-bold bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent">
            404
          </div>
        </div>
        <p className="text-2xl text-gray-400 mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-brand text-white rounded-xl hover:bg-brand-600 transition font-semibold shadow-lg shadow-brand/20"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
