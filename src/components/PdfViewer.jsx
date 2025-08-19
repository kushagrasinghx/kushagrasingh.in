import { useEffect, useRef, useState } from 'react'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf'
// Use Vite's ?url import to resolve worker as an URL
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

GlobalWorkerOptions.workerSrc = workerUrl

export default function PdfViewer({ src }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(1)
  const [scale, setScale] = useState(1.0)
  const [error, setError] = useState(null)
  const pdfRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    const loadPdfAndRender = async () => {
      setError(null)
      try {
        // Helper: try fetching with no-store then retry with cache-busting if 304/204 or not ok
        const tryFetch = async (u) => {
          try {
            return await fetch(u, { cache: 'no-store' })
          } catch (e) {
            console.warn('Fetch failed', e)
            throw e
          }
        }

        let res = await tryFetch(src)
        const statusMsg = `${res.status} ${res.statusText}`
        const contentDisposition = res.headers.get('content-disposition')
        const contentType = res.headers.get('content-type')
        console.debug('PDF fetch result', { status: statusMsg, contentDisposition, contentType })

        if (res.status === 204 || res.status === 304 || !res.ok) {
          // retry with cache-busting query param
          const bustUrl = src + (src.includes('?') ? '&' : '?') + '_=' + Date.now()
          console.debug('Retrying fetch with cache-bust:', bustUrl)
          res = await tryFetch(bustUrl)
          console.debug('Retry result', res.status, res.statusText)
        }

        if (!res.ok || res.status === 204) {
          const msg = `Failed to fetch PDF after retry: ${res.status} ${res.statusText}`
          console.error(msg)
          setError(msg)
          return
        }

        const arrayBuffer = await res.arrayBuffer()
        console.debug('Fetched PDF size (bytes):', arrayBuffer?.byteLength)

        // Quick check: ensure the file starts with '%PDF' (0x25 0x50 0x44 0x46)
        try {
          const header = new Uint8Array(arrayBuffer.slice(0, 4))
          const isPdf = header[0] === 0x25 && header[1] === 0x50 && header[2] === 0x44 && header[3] === 0x46
          if (!isPdf) {
            // Attempt to decode a snippet for debugging (likely HTML/index page or error text)
            let snippet = ''
            try {
              const text = new TextDecoder().decode(arrayBuffer.slice(0, 1000))
              snippet = text.slice(0, 800)
            } catch (decErr) {
              snippet = `Non-PDF response (binary). First bytes: ${Array.from(header).map(b => b.toString(16)).join(' ')}`
            }
            const msg = `Response is not a PDF. Snippet:\n${snippet}`
            console.error(msg)
            setError(msg)
            if (containerRef.current) containerRef.current.innerText = 'Response is not a PDF. See console for snippet.'
            return
          }
        } catch (checkErr) {
          console.warn('Failed to validate PDF header', checkErr)
        }

        try {
          const loadingTask = getDocument({ data: arrayBuffer })
          const pdf = await loadingTask.promise
          if (cancelled) return
          pdfRef.current = pdf
          setPageCount(pdf.numPages || 0)
          renderPage(page, pdf)
        } catch (pdfErr) {
          console.error('PDF.js failed to parse document', pdfErr)
          setError('PDF parsing error: ' + (pdfErr?.message || String(pdfErr)))
          if (containerRef.current) containerRef.current.innerText = 'Failed to parse PDF.'
        }

      } catch (err) {
        console.error('Error fetching/loading PDF', err)
        setError(err?.message || String(err))
        if (containerRef.current) containerRef.current.innerText = 'Failed to load PDF.'
      }
    }

    loadPdfAndRender()

    return () => {
      cancelled = true
      if (pdfRef.current) {
        try { pdfRef.current.destroy() } catch (e) {}
        pdfRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  useEffect(() => {
    if (pdfRef.current) renderPage(page, pdfRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, scale])

  // Auto-fit on load and on container resize unless user manually changed zoom
  useEffect(() => {
    let resizeObserver = null
    let userZoom = false

    // track user interactions that change scale
    const onUserZoom = () => { userZoom = true }

    const setupResize = () => {
      const el = containerRef.current
      if (!el) return
      resizeObserver = new ResizeObserver(() => {
        if (userZoom) return // don't auto-fit if user changed zoom
        // recompute fit scale based on current page's natural size
        if (pdfRef.current) {
          pdfRef.current.getPage(page).then((p) => {
            const viewport = p.getViewport({ scale: 1 })
            const containerW = el.clientWidth - 32 // account for padding
            const fit = Math.max(0.25, Math.min(3, containerW / viewport.width))
            setScale(fit)
          }).catch(() => {})
        }
      })
      resizeObserver.observe(el)
    }

    // listen for manual zoom buttons
    const zoomButtons = document.querySelectorAll('[data-pdf-zoom]')
    zoomButtons.forEach((b) => b.addEventListener('click', onUserZoom))

    setupResize()

    return () => {
      if (resizeObserver) resizeObserver.disconnect()
      zoomButtons.forEach((b) => b.removeEventListener('click', onUserZoom))
    }
  }, [page])

  async function renderPage(p, pdfInstance) {
    try {
      const pdfPage = await pdfInstance.getPage(p)
      const viewport = pdfPage.getViewport({ scale })
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      canvas.width = Math.floor(viewport.width)
      canvas.height = Math.floor(viewport.height)
      const renderContext = { canvasContext: context, viewport }
      await pdfPage.render(renderContext).promise
    } catch (err) {
      console.error('Error rendering page', err)
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-3 p-3 border-b border-white/10 sticky top-0 left-0 z-10 bg-transparent">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded bg-white/5">◀</button>
        <div>Page</div>
        <input className="w-16 text-center rounded bg-white/5 px-2 py-1" value={page} onChange={(e) => {
          const v = Number(e.target.value) || 1; setPage(Math.min(Math.max(1, v), pageCount))
        }} />
        <div>/ {pageCount}</div>
        <div className="ml-auto flex items-center gap-2">
          <button data-pdf-zoom onClick={() => setScale((s) => Math.max(0.25, s - 0.25))} className="px-3 py-1 rounded bg-white/5">-</button>
          <div>{(scale * 100).toFixed(0)}%</div>
          <button data-pdf-zoom onClick={() => setScale((s) => Math.min(3, s + 0.25))} className="px-3 py-1 rounded bg-white/5">+</button>
        </div>
        <button onClick={() => { if (pdfRef.current) pdfRef.current.destroy(); pdfRef.current = null; setPage(1); }} className="px-3 py-1 rounded bg-white/5">Reset</button>
      </div>

      <div ref={containerRef} className="flex-1 overflow-auto p-0">
        {error ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-white/60 gap-3 p-4">
            <div>Failed to load PDF: {error}</div>
            <a href={src} className="underline text-white/80">Open / Download PDF</a>
          </div>
        ) : (
          <div className="w-full h-full p-4 pt-0 flex items-start justify-center">
            <canvas ref={canvasRef} className="shadow-md bg-white/2" style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
      </div>
    </div>
  )
}