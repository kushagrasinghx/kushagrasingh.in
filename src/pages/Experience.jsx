import { useEffect, useState } from 'react'
import { useTheme } from '../ThemeContext'

export default function Experience() {
  const [items, setItems] = useState([])
  const { theme } = useTheme();

  useEffect(() => {
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
    <main className={`w-full min-h-[calc(100vh-100px)] flex flex-col box-border px-4 sm:px-6 md:px-[100px] py-[24px] md:py-[40px] overflow-x-hidden items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}> 
      <div className="w-full max-w-[1000px] mb-10">
        <h1 className="font-ptserif text-4xl mb-6">experience</h1>
        <p className="text-white/60 dark:text-white/60 light:text-black/60">roles I've held and what I worked on:</p>

        <div className="mt-10 flex flex-col gap-12">
          {items.map((x, i) => (
            <div key={(x.id || x.title || x.role || 'exp') + i}>
              {x.banner && (
                <div
                  className="w-full max-w-[1000px] aspect-[50/9] bg-gray-800 dark:bg-gray-800 light:bg-gray-200 flex items-center justify-center overflow-hidden rounded-md border border-white/10 dark:border-white/10 light:border-black/10 md:shadow-lg mb-2"
                  style={{ aspectRatio: '50 / 9' }}
                >
                  <img
                    src={x.banner}
                    alt={x.company || x.role || 'company banner'}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              )}

              <div className="flex flex-col md:flex-row justify-between items-start pt-4 gap-4 md:gap-8">
                <div className="flex-1">
                  <h2 className="font-dmsans text-2xl mb-1 text-white dark:text-white light:text-black">
                    {x.role || x.title}
                    {x.company ? (
                      <span className="text-white/60 dark:text-white/60 light:text-black/60"> · {x.company}</span>
                    ) : null}
                  </h2>

                  {(x.period || x.location) && (
                    <p className="text-white/50 dark:text-white/50 light:text-black/50 mb-3">
                      {x.period}
                      {x.period && x.location ? ' • ' : ''}
                      {x.location}
                    </p>
                  )}

                  {x.description && (
                    <p className="text-white/70 dark:text-white/70 light:text-black/70 mb-4">{x.description}</p>
                  )}

                  {Array.isArray(x.highlights) && x.highlights.length > 0 && (
                    <ul className="list-disc ml-5 text-white/80 dark:text-white/80 light:text-black/80 space-y-1">
                      {x.highlights.map((h, idx) => (
                        <li key={idx}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-col gap-3 md:min-w-[180px]">
                  {x.link && (
                    <a
                      href={x.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 light:bg-black/10 light:hover:bg-black/20 text-white dark:text-white light:text-black font-medium transition-colors"
                    >
                      view details
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <p className="text-white/50 dark:text-white/50 light:text-black/50">No experience to show (yet).</p>
          )}
        </div>
      </div>
    </main>
  )
}
