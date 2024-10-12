import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import DocumentAnalysis from './pages/DocumentAnalysis'
import Search from './pages/Search'
import UserDashboard from './pages/UserDashboard'
import AdminPortal from './pages/AdminPortal'
import LanguageToggle from './components/LanguageToggle'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <div className="container mx-auto px-4 py-2">
            <LanguageToggle />
          </div>
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/document-analysis" element={<DocumentAnalysis />} />
              <Route path="/search" element={<Search />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/admin" element={<AdminPortal />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App