import React, { useState } from 'react'
import { Upload, File, AlertCircle } from 'lucide-react'

const AdminPortal: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this should be a secure authentication process
    if (password === 'admin123') {
      setIsAdmin(true)
      setError('')
    } else {
      setError('Invalid password')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
      // In a real application, you would send the file to your server here
      console.log('Uploading file:', file.name)
      alert(`File ${file.name} uploaded successfully!`)
      setFile(null)
    }
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 flex items-center">
              <AlertCircle size={16} className="mr-2" />
              {error}
            </div>
          )}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Admin File Upload Portal</h1>
      <form onSubmit={handleFileUpload} className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
            <Upload size={48} className="text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {file && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <File size={16} />
            <span>{file.name}</span>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={!file}
        >
          Upload File
        </button>
      </form>
    </div>
  )
}

export default AdminPortal