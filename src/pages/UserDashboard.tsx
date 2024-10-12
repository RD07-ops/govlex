import React from 'react'
import { Bell, BookOpen, Clock, Star } from 'lucide-react'

const UserDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          icon={<Bell className="w-8 h-8 text-blue-600" />}
          title="Notifications"
          content="You have 3 new notifications"
        />
        <DashboardCard
          icon={<BookOpen className="w-8 h-8 text-green-600" />}
          title="Recent Documents"
          content="5 documents viewed recently"
        />
        <DashboardCard
          icon={<Clock className="w-8 h-8 text-yellow-600" />}
          title="Saved Searches"
          content="2 saved searches"
        />
        <DashboardCard
          icon={<Star className="w-8 h-8 text-purple-600" />}
          title="Bookmarks"
          content="10 bookmarked documents"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Viewed Document: Law on Electronic Commerce</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Bookmarked: Algerian Civil Code</p>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-2 rounded-full">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium">Saved Search: "Data Protection Laws"</p>
                <p className="text-sm text-gray-500">3 days ago</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recommended Documents</h2>
          <ul className="space-y-4">
            <li>
              <a href="#" className="block hover:bg-gray-50 p-3 rounded">
                <h3 className="font-medium">Law on Protection of Personal Data (2020)</h3>
                <p className="text-sm text-gray-500">Relevant to your recent searches</p>
              </a>
            </li>
            <li>
              <a href="#" className="block hover:bg-gray-50 p-3 rounded">
                <h3 className="font-medium">E-Commerce Regulations Update (2023)</h3>
                <p className="text-sm text-gray-500">New update to a document you've viewed</p>
              </a>
            </li>
            <li>
              <a href="#" className="block hover:bg-gray-50 p-3 rounded">
                <h3 className="font-medium">Labor Law Amendments</h3>
                <p className="text-sm text-gray-500">Popular in your industry</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const DashboardCard: React.FC<{ icon: React.ReactNode; title: string; content: string }> = ({ icon, title, content }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-gray-600">{content}</p>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard