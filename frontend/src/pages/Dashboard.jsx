import { useAuth } from '../hooks/useAuth';
import Layout from '../components/layout/Layout';
import { User, MapPin, Award, TrendingUp, BookOpen, Clock } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.username}! 👋
          </h1>
          <p className="text-gray-600 mt-2">Here's your Micro-Mentor overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Profile Status</p>
                <p className="text-2xl font-bold text-gray-900">Active</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="text-2xl font-bold text-gray-900">Enabled</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sessions</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Reputation</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-primary-600" />
              Quick Actions
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                Find nearby mentors
              </li>
              <li className="flex items-center text-gray-700">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                Browse available skills
              </li>
              <li className="flex items-center text-gray-700">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                Book a 15-min session
              </li>
              <li className="flex items-center text-gray-700">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                Track your skill chains
              </li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Clock className="h-6 w-6 mr-2 text-primary-600" />
              Coming Soon
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900">Real-time Mentor Map</p>
                <p className="text-sm text-gray-600">See available mentors in your area</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900">Skill Management</p>
                <p className="text-sm text-gray-600">Add skills you can teach or want to learn</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900">Session Booking</p>
                <p className="text-sm text-gray-600">Schedule sessions with mentors</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 card bg-gradient-to-r from-primary-50 to-blue-50 border-2 border-primary-200">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Award className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Your Account Details
              </h3>
              <div className="mt-2 space-y-1 text-sm text-gray-700">
                <p><span className="font-medium">Email:</span> {user?.email}</p>
                <p><span className="font-medium">Username:</span> {user?.username}</p>
                <p><span className="font-medium">User ID:</span> {user?.userId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}