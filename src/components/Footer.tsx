import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.about')}</h3>
            <p>{t('footer.aboutText')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300">{t('footer.termsOfService')}</a></li>
              <li><a href="#" className="hover:text-blue-300">{t('footer.privacyPolicy')}</a></li>
              <li><a href="#" className="hover:text-blue-300">{t('footer.contactUs')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.connectWithUs')}</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-300">LinkedIn</a>
              <a href="#" className="hover:text-blue-300">Twitter</a>
              <a href="#" className="hover:text-blue-300">Facebook</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 GovLex. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer