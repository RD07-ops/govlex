import React from 'react'
import { Link } from 'react-router-dom'
import { Book, Linkedin, Facebook, Twitter } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Book size={32} />
          <span className="text-2xl font-bold">GovLex</span>
        </Link>
        <nav className="flex items-center">
          <ul className="flex space-x-4 mr-6">
            <li><Link to="/" className="hover:text-blue-200">{t('header.home')}</Link></li>
            <li><Link to="/document-analysis" className="hover:text-blue-200">{t('header.documentAnalysis')}</Link></li>
            <li><Link to="/search" className="hover:text-blue-200">{t('header.search')}</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-200">{t('header.dashboard')}</Link></li>
          </ul>
          <div className="flex space-x-3">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200">
              <Linkedin size={20} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200">
              <Facebook size={20} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200">
              <Twitter size={20} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header