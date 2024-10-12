import React from 'react'
import { Search, FileText, Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to GovLex</h1>
        <p className="text-xl">Your comprehensive platform for Algerian legal research and document analysis</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Search size={48} />}
          title="Advanced Search"
          description="Powerful search capabilities with AI-driven semantic understanding"
          link="/search"
        />
        <FeatureCard
          icon={<FileText size={48} />}
          title="Document Analysis"
          description="In-depth analysis of legal documents with interactive summaries"
          link="/document-analysis"
        />
        <FeatureCard
          icon={<Users size={48} />}
          title="Collaboration Tools"
          description="Work together with shared workspaces and document sharing"
          link="/dashboard"
        />
      </section>

      <section className="bg-blue-100 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="mb-4">Experience the power of GovLex today. Sign up for a free account or explore our features.</p>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Sign Up</button>
          <Link to="/search" className="bg-white text-blue-600 px-6 py-2 rounded border border-blue-600 hover:bg-blue-50 inline-flex items-center">
            Learn More
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; link: string }> = ({ icon, title, description, link }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="text-blue-600 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <Link to={link} className="text-blue-600 hover:underline inline-flex items-center">
        Explore
        <ArrowRight className="ml-1" size={16} />
      </Link>
    </div>
  )
}

export default Home