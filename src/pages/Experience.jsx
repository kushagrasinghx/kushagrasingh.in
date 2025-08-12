import { useEffect, useState } from 'react'

export default function Experience() {
  const [items, setItems] = useState([])

  useEffect(() => {
    // works in Vite dev + Vercel deploy
    const url = `${import.meta.env.BASE_URL}experience.json`
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load experience.json')
        return res.json()
      })
      .then(setItems)
      .catch(() => setItems([]))
  }, [])

  return (
    <main className="w-full h-[calc(100vh-100px)] flex flex-col box-border px-[100px] py-[40px] overflow-x-hidden items-center">
      <div className="w-full max-w-[1000px]">
        <h1 className="font-ptserif text-4xl mb-6">experience</h1>
        <p className="text-white/60">roles I’ve held and what I worked on:</p>

        <div className="mt-10 flex flex-col gap-12">
          {items.map((x, i) => (
            <div key={(x.id || x.title || x.role || 'exp') + i}>
              {/* Optional company/logo banner */}
              {x.banner && (
                <div className="w-full h-[180px] bg-gray-800 flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-lg mb-2">
                  <img
                    src={x.banner}
                    alt={x.company || x.role || 'company banner'}
                    className="object-cover w-[1000px] h-[180px] max-w-full"
                    style={{ width: '1000px', height: '180px' }}
                  />
                </div>
              )}

              {/* Experience content */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 pt-4">
                <div className="flex-1">
                  <h2 className="font-dmsans text-2xl mb-1 text-white">
                    {x.role || x.title}
                    {x.company ? (
                      <span className="text-white/60"> · {x.company}</span>
                    ) : null}
                  </h2>
                  {(x.period || x.location) && (
                    <p className="text-white/50 mb-3">
                      {x.period}
                      {x.period && x.location ? ' • ' : ''}
                      {x.location}
                    </p>
                  )}
                  {x.description && (
                    <p className="text-white/70 mb-4">{x.description}</p>
                  )}
                  {Array.isArray(x.highlights) && x.highlights.length > 0 && (
                    <ul className="list-disc ml-5 text-white/80 space-y-1">
                      {x.highlights.map((h, idx) => (
                        <li key={idx}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-col gap-3 min-w-[180px]">
                  {x.link && (
                    <a
                      href={x.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                    >
                      view details
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <p className="text-white/50">No experience to show (yet).</p>
          )}
        </div>
      </div>
    </main>
  )
}
