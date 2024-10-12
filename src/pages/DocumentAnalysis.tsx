import React, { useState } from 'react'
import { Upload, FileText, List, AlertCircle, Search, Smartphone, Download, Database, ExternalLink } from 'lucide-react'

interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  wordCount: number;
  topWords: { word: string; count: number }[];
  sentimentScore: number;
  content: string;
}

interface WordVector {
  [word: string]: number[];
}

interface GovDatabaseResult {
  type: string;
  title: string;
  date: string;
  link: string;
}

const DocumentAnalysis: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [govDatabaseResults, setGovDatabaseResults] = useState<GovDatabaseResult[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      if (uploadedFile.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit.")
        return
      }
      setFile(uploadedFile)
      setIsLoading(true)
      setError(null)
      // Simulating file analysis
      setTimeout(() => {
        const dummyAnalysis: AnalysisResult = {
          summary: "This document discusses the recent changes in Algerian business regulations, focusing on e-commerce laws and data protection measures.",
          keyPoints: [
            "New e-commerce regulations introduced in 2023",
            "Enhanced data protection measures for online businesses",
            "Changes in tax reporting for digital transactions",
            "Introduction of digital signatures for business contracts"
          ],
          wordCount: 1500,
          topWords: [
            { word: "e-commerce", count: 25 },
            { word: "regulation", count: 20 },
            { word: "data", count: 18 },
            { word: "business", count: 15 },
            { word: "digital", count: 12 }
          ],
          sentimentScore: 0.6,
          content: "Full content of the document would be here..."
        }
        setAnalysis(dummyAnalysis)
        setIsLoading(false)
        // Simulate fetching related government database results
        fetchGovDatabaseResults()
      }, 2000)
    }
  }

  const handleSearch = () => {
    if (!analysis) return
    // Simple semantic search simulation
    const words = searchQuery.toLowerCase().split(' ')
    const results = analysis.content
      .split('.')
      .filter(sentence => words.some(word => sentence.toLowerCase().includes(word)))
      .map(sentence => sentence.trim())
    setSearchResults(results)
  }

  const fetchGovDatabaseResults = () => {
    // Simulating API call to government databases
    const dummyResults: GovDatabaseResult[] = [
      { type: "Law", title: "E-Commerce Regulation Act of 2023", date: "2023-05-15", link: "#" },
      { type: "Regulation", title: "Data Protection Guidelines for Online Businesses", date: "2023-06-01", link: "#" },
      { type: "Tax Notice", title: "Digital Transaction Reporting Requirements", date: "2023-07-10", link: "#" }
    ]
    setGovDatabaseResults(dummyResults)
  }

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Document Analysis</h1>

      {/* File Upload Section */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 sm:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 sm:w-10 sm:h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 text-center"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">TXT files only (MAX. 10MB)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileUpload} accept=".txt" />
          </label>
        </div>
        {file && <p className="mt-4 text-sm">File uploaded: {file.name}</p>}
        {isLoading && <p className="mt-4 text-sm">Analyzing document...</p>}
        {error && (
          <div className="mt-4 text-red-500 flex items-center text-sm">
            <AlertCircle size={16} className="mr-2 flex-shrink-0" />
            {error}
          </div>
        )}
      </div>

      {/* Analysis Results Section */}
      {analysis && (
        <>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <FileText className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Document Summary</h3>
                <p className="text-sm">{analysis.summary}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <List className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Key Points</h3>
                <ul className="list-disc list-inside text-sm">
                  {analysis.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Document Statistics</h3>
              <p className="text-sm">Word Count: {analysis.wordCount}</p>
              <p className="text-sm">Sentiment Score: {analysis.sentimentScore.toFixed(2)} ({analysis.sentimentScore > 0 ? 'Positive' : analysis.sentimentScore < 0 ? 'Negative' : 'Neutral'})</p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Top 5 Most Frequent Words</h3>
              <ul className="list-none text-sm">
                {analysis.topWords.map(({ word, count }, index) => (
                  <li key={index} className="inline-block mr-4 mb-2">
                    <span className="font-medium">{word}</span>: {count}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Semantic Search Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Semantic Search</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter your search query"
                className="flex-grow p-2 border rounded"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center"
              >
                <Search className="inline-block mr-2" size={20} />
                Search
              </button>
            </div>
            {searchResults.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Search Results</h3>
                <ul className="list-disc list-inside text-sm">
                  {searchResults.map((result, index) => (
                    <li key={index} className="mt-2">{result}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Government Database Integration Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Database className="mr-2" size={24} />
              Government Database Integration
            </h2>
            <p className="mb-4 text-sm">
              Related official documents and regulations found in government databases:
            </p>
            <ul className="space-y-3">
              {govDatabaseResults.map((result, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2 mt-1">
                    {result.type}
                  </div>
                  <div>
                    <a href={result.link} className="text-blue-600 hover:underline font-medium flex items-center">
                      {result.title}
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                    <p className="text-xs text-gray-500">Published: {result.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* E-Services Integration Section */}
          <div className="bg-blue-100 p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ExternalLink className="mr-2" size={24} />
              Related E-Services
            </h2>
            <p className="mb-4 text-sm">
              Based on your document analysis, you might be interested in the following e-services:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="#" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FileText className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">E-Commerce Registration</h3>
                  <p className="text-sm text-gray-600">Register your online business</p>
                </div>
              </a>
              <a href="#" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Database className="text-purple-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Data Protection Compliance</h3>
                  <p className="text-sm text-gray-600">Check your compliance status</p>
                </div>
              </a>
              <a href="#" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 flex items-center">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <FileText className="text-yellow-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Digital Tax Filing</h3>
                  <p className="text-sm text-gray-600">Submit your digital transaction taxes</p>
                </div>
              </a>
              <a href="#" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 flex items-center">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <FileText className="text-red-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Digital Signature Application</h3>
                  <p className="text-sm text-gray-600">Apply for a certified digital signature</p>
                </div>
              </a>
            </div>
          </div>
        </>
      )}

      {/* Mobile App Promotion Section */}
      <div className="bg-blue-100 p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Smartphone className="mr-2" size={24} />
          GovLex Mobile App
        </h2>
        <p className="mb-4 text-sm">
          Experience the power of GovLex on the go with our dedicated mobile application. 
          Enjoy seamless document analysis and access your saved documents anytime, anywhere.
        </p>
        <ul className="list-disc list-inside mb-4 text-sm">
          <li>Offline access to saved documents and summaries</li>
          <li>Responsive design for optimal mobile experience</li>
          <li>Push notifications for important updates</li>
          <li>Secure document storage with encryption</li>
        </ul>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center w-full sm:w-auto">
          <Download className="mr-2" size={20} />
          Download GovLex Mobile App
        </button>
      </div>
    </div>
  )
}

export default DocumentAnalysis