export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="text-center">
              <div className="h-10 bg-gray-200 rounded mx-auto mb-2 w-20"></div>
              <div className="h-4 bg-gray-200 rounded mx-auto w-24"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
