import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Contact from './pages/Contact'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <div className='h-screen w-screen box-border font-dmsans'>
        {/* Side borders */}
        <div className='pointer-events-none fixed inset-y-0 left-0 w-[50px] bg-transparent border-r border-white/15 z-50'></div>
        <div className='pointer-events-none fixed inset-y-0 right-0 w-[50px] bg-transparent border-l border-white/15 z-50'></div>

        {/* Navbar */}
        <Navbar />

        {/* Routed pages */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/experience' element={<Experience />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>

        {/* Footer */}
        <footer className='flex justify-between items-center h-[50px] p-4 border-t border-white/15 fixed left-0 bottom-0 w-full bg-[#141414]'>
        </footer>
      </div>
    </>
  )
}

export default App
