import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { Toaster } from 'sonner'
import Layout from '@/components/Layout'
import AuthCallback from '@/components/AuthCallback'
import Home from '@/pages/Home'
import Tutor from '@/pages/Tutor'
import Focus from '@/pages/Focus'
import Ratings from '@/pages/Ratings'
import About from '@/pages/About'
import './App.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tutor" element={<Tutor />} />
            <Route path="/focus" element={<Focus />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
        <Toaster position="top-center" />
      </AuthProvider>
    </Router>
  )
}

export default App