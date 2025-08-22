import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'idle', msg: '' })

    // basic required checks (client-side)
    const fd = new FormData(formRef.current)
    const from_name = fd.get('from_name')?.toString().trim()
    const reply_to = fd.get('reply_to')?.toString().trim()
    const message = fd.get('message')?.toString().trim()
    const emailOk = /\S+@\S+\.\S+/.test(reply_to || '')

    if (!from_name || !reply_to || !message) {
      return setStatus({ state: 'error', msg: 'Please fill name, email, and message.' })
    }
    if (!emailOk) {
      return setStatus({ state: 'error', msg: 'Please enter a valid email.' })
    }

    try {
      setStatus({ state: 'loading', msg: 'Sending\u2026' })
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      setStatus({ state: 'success', msg: 'Message sent. I\u2019ll get back to you soon!' })
      formRef.current.reset()
    } catch (err) {
      console.error(err)
      setStatus({ state: 'error', msg: 'Could not send right now. Please try again later.' })
    }
  }

  return (
  <main className={`w-full min-h-[calc(100vh-100px)] flex flex-col box-border px-4 sm:px-6 md:px-[100px] py-[24px] md:py-[40px] overflow-x-hidden items-center text-white`}> 
      <div className='w-full max-w-[1000px] mb-12'>
        <h1 className='font-ptserif text-4xl mb-6'>contact kushagra</h1>

        {/* EmailJS Form */}
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className='w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[2px] md:shadow-lg'
        >
          <div className='p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            <div className='flex flex-col'>
              <label htmlFor='from_name' className='text-white/70 mb-2'>name</label>
              <input
                id='from_name'
                name='from_name'
                placeholder='Your full name'
                className='rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-white/20'
                required
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='reply_to' className='text-white/70 mb-2'>email</label>
              <input
                id='reply_to'
                type='email'
                name='reply_to'
                placeholder='you@example.com'
                className='rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-white/20'
                required
              />
            </div>

            <div className='md:col-span-2 flex flex-col'>
              <label htmlFor='subject' className='text-white/70 mb-2'>subject</label>
              <input
                id='subject'
                name='subject'
                placeholder='What’s this about?'
                className='rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-white/20'
              />
            </div>

            <div className='md:col-span-2 flex flex-col'>
              <label htmlFor='message' className='text-white/70 mb-2'>message</label>
              <textarea
                id='message'
                name='message'
                placeholder='Tell me a bit more…'
                rows={6}
                className='rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-white/20 resize-y'
                required
              />
            </div>
          </div>

          <div className='px-4 sm:px-6 md:px-8 pb-5 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between'>
            <div className='text-sm'>
              {status.state === 'error' && <span className='text-red-400'>{status.msg}</span>}
              {status.state === 'success' && <span className='text-green-400'>{status.msg}</span>}
              {status.state === 'loading' && <span className='text-white/70'>{status.msg}</span>}
            </div>
            <button
              type='submit'
              className='inline-flex justify-center items-center px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors disabled:opacity-60'
              disabled={status.state === 'loading'}
            >
              {status.state === 'loading' ? 'Sending…' : 'Send message'}
            </button>
          </div>
        </form>

        {/* Links below the form (unchanged) */}
        <div className='w-full flex flex-col gap-4 md:gap-6'>
          <div className='w-full flex flex-col sm:flex-row gap-3 sm:gap-10'>
            <div className='font-ptserif text-2xl sm:text-3xl md:text-5xl mt-6 md:mt-10 text-white/50'>
              <a href='mailto:hello@kushagrasingh.in' className='hover:text-white transition-colors'>
                hello@kushagrasingh.in
              </a>
            </div>
            <div className='font-ptserif text-2xl sm:text-3xl md:text-5xl mt-0 md:mt-10 text-white/50'>
              <a
                href='https://linkedin.com/in/kushagra-singh-varanasi'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-white transition-colors'
              >
                connect on linkedin
              </a>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}
