import React, { useState } from 'react'
import { Search as SearchIcon, Filter, Share2 } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Search: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [selectedFilters, setSelectedFilters] = useState({
    laws: false,
    regulations: false,
    courtDecisions: false,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulating search results (in a real app, you'd fetch this from a backend)
    const results = [
      t('search.laws'),
      t('search.regulations'),
      t('search.courtDecisions'),
      "Labor Law of Algeria"
    ]
    // Filter results based on selected filters
    const filteredResults = results.filter(result => {
      if (selectedFilters.laws && result.includes(t('search.laws'))) return true
      if (selectedFilters.regulations && result.includes(t('search.regulations'))) return true
      if (selectedFilters.courtDecisions && result.includes(t('search.courtDecisions'))) return true
      return !selectedFilters.laws && !selectedFilters.regulations && !selectedFilters.courtDecisions
    })
    setSearchResults(filteredResults)
  }

  const handleFilterChange = (filter: keyof typeof selectedFilters) => {
    setSelectedFilters(prev => ({ ...prev, [filter]: !prev[filter] }))
  }

  const highlightSearchTerm = (text: string) => {
    if (!searchQuery) return text
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'))
    return parts.map((part, index) => 
      part.toLowerCase() === searchQuery.toLowerCase() 
        ? <mark key={index} className="bg-yellow-200">{part}</mark>
        : part
    )
  }

  const handleShare = (result: string) => {
    // Implement sharing functionality (e.g., copy to clipboard or open share dialog)
    alert(`Sharing: ${result}`)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">{t('search.title')}</h1>

      <form onSubmit={handleSearch} className="flex space-x-4">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder={t('search.placeholder')}
            className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className="absolute right-3 top-3 text-gray-400" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <SearchIcon className="mr-2" size={20} />
          {t('search.searchButton')}
        </button>
      </form>

      <div className="flex space-x-8">
        <div className="w-1/4">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Filter className="mr-2" size={20} />
            {t('search.filters')}
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">{t('search.documentType')}</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={selectedFilters.laws}
                    onChange={() => handleFilterChange('laws')}
                  /> {t('search.laws')}
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={selectedFilters.regulations}
                    onChange={() => handleFilterChange('regulations')}
                  /> {t('search.regulations')}
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={selectedFilters.courtDecisions}
                    onChange={() => handleFilterChange('courtDecisions')}
                  /> {t('search.courtDecisions')}
                </label>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">{t('search.dateRange')}</h3>
              <input type="date" className="w-full p-2 rounded border border-gray-300" />
              <input type="date" className="w-full p-2 rounded border border-gray-300 mt-2" />
            </div>
          </div>
        </div>
        <div className="w-3/4">
          <h2 className="text-xl font-semibold mb-4">{t('search.searchResults')}</h2>
          {searchResults.length > 0 ? (
            <ul className="space-y-4">
              {searchResults.map((result, index) => (
                <li key={index} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{highlightSearchTerm(result)}</h3>
                      <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <a href="#" className="text-blue-600 hover:underline mt-2 inline-block">{t('search.viewDocument')}</a>
                    </div>
                    <button 
                      onClick={() => handleShare(result)}
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <Share2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">{t('search.noResults')}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search