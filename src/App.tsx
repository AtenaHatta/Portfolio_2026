import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import Header from './components/Header'
import Footer from './components/Footer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'))
const ArticlePage = lazy(() => import('./pages/ArticlePage'))

function App() {
  const { isDarkMode, toggleTheme, colors } = useTheme()

  return (
    <Router>
      <ScrollToTop />
      <div 
        className="min-h-screen transition-colors duration-200"
        style={{
          backgroundColor: colors.background.bg,
          color: colors.background.text,
        }}
      >
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleTheme} colors={colors} />
        <main className="min-h-[60vh]">
          <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center" style={{ color: colors.background.text }}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage colors={colors} />} />
              <Route path="/about" element={<AboutPage colors={colors} />} />
              <Route path="/project" element={<ProjectsPage colors={colors} />} />
              <Route path="/project/:id" element={<ProjectDetailPage colors={colors} />} />
              <Route path="/articles" element={<ArticlePage colors={colors} />} />
            </Routes>
          </Suspense>
        </main>
        <Footer colors={colors} />
      </div>
    </Router>
  )
}

export default App
