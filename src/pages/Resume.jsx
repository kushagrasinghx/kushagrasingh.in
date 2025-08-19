import { useEffect, useState } from 'react'
import PdfViewer from '../components/PdfViewer'
import resumeUrl from '/resume.pdf?url'

export default function Resume() {

  return (
  <main className={`w-full min-h-[calc(100vh-100px)] flex flex-col box-border px-4 sm:px-6 md:px-[100px] py-[24px] md:py-[40px] overflow-x-hidden items-center text-white`}>
      <div className="w-full max-w-[1000px] mb-10">
        <h1 className="font-ptserif text-4xl mb-6">resume</h1>
        <p className="text-white/60 dark:text-white/60 mb-4">view and download my résumé</p>

        {/* Desktop / tablet viewer */}
        <div className="hidden md:block w-full rounded-2xl border border-white/10 bg-white/5 overflow-hidden" style={{ height: '80vh' }}>
          <PdfViewer src={resumeUrl} />
        </div>

        {/* Mobile message + download link (visible only on small screens) */}
        <div className="block md:hidden mt-4 text-sm text-white/70">
          <p>To view resume, open this link on a desktop or laptop device.</p>
          <a href="/resume.pdf" download className="text-white/80 underline">Download PDF</a>
        </div>
      </div>
    </main>
  )
}
