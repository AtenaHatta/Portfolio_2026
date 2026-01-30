import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'

function App() {
  const { isDarkMode, toggleTheme, colors } = useTheme()

  return (
    <Router>
      <div 
        className="min-h-screen transition-colors duration-200"
        style={{
          backgroundColor: colors.background.bg,
          color: colors.background.text,
        }}
      >
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleTheme} colors={colors} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage colors={colors} />} />
            <Route path="/about" element={<AboutPage colors={colors} />} />
            <Route path="/project" element={<ProjectsPage colors={colors} />} />
            <Route path="/project/:id" element={<ProjectDetailPage colors={colors} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
