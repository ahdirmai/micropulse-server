export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-dark-300 rounded-xl w-48 mb-8"></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-dark-300 rounded-2xl border border-dark-200 p-6">
            <div className="h-6 bg-dark-200 rounded-lg w-3/4 mb-2"></div>
            <div className="h-4 bg-dark-200 rounded-lg w-full mb-4"></div>
            <div className="h-4 bg-dark-200 rounded-lg w-1/2 mb-4"></div>
            <div className="flex gap-2">
              <div className="flex-1 h-10 bg-dark-200 rounded-xl"></div>
              <div className="flex-1 h-10 bg-dark-200 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
