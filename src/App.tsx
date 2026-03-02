import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { useTheme } from './hooks/useTheme';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));

function MainLayout() {
  const { colors } = useTheme();
  return (
    <>
      <HeaderWithTheme />
      <main className="min-h-[60vh] flex-1">
        <Suspense
          fallback={
            <div
              className="min-h-[60vh] flex items-center justify-center"
              style={{ color: colors.background.text }}
            >
              Loading...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer colors={colors} />
    </>
  );
}

function HeaderWithTheme() {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  return <Header isDarkMode={isDarkMode} toggleDarkMode={toggleTheme} colors={colors} />;
}

function App() {
  const { colors } = useTheme();

  return (
    <Router>
      <ScrollToTop />
      <div
        className="min-h-screen flex flex-col transition-colors duration-200"
        style={{
          backgroundColor: colors.background.bg,
          color: colors.background.text,
        }}
      >
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage colors={colors} />} />
            <Route path="about" element={<AboutPage colors={colors} />} />
            <Route path="project" element={<ProjectsPage colors={colors} />} />
            <Route path="project/:id" element={<ProjectDetailPage colors={colors} />} />
            <Route path="articles" element={<ArticlePage colors={colors} />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
