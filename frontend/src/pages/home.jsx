import { Link } from 'react-router-dom';
import { MapPin, Users, Clock, Award } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Learn Anything in <span className="text-primary-600">15 Minutes</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with mentors within walking distance. Share skills, build community, 
          and create skill chains that ripple through your neighborhood.
        </p>

        <div className="flex justify-center space-x-4 mb-16">
          {user ? (
            <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn-primary text-lg px-8 py-3">
                Get Started
              </Link>
              <Link to="/login" className="btn-secondary text-lg px-8 py-3">
                Login
              </Link>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
          <div className="card text-center hover:shadow-lg transition-shadow">
            <MapPin className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Hyper-Local</h3>
            <p className="text-gray-600">Find mentors within 1km radius</p>
          </div>

          <div className="card text-center hover:shadow-lg transition-shadow">
            <Clock className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quick Sessions</h3>
            <p className="text-gray-600">15-minute micro-learning sessions</p>
          </div>

          <div className="card text-center hover:shadow-lg transition-shadow">
            <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Skill Chains</h3>
            <p className="text-gray-600">Teach what you learn, create ripples</p>
          </div>

          <div className="card text-center hover:shadow-lg transition-shadow">
            <Award className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Rare Skills</h3>
            <p className="text-gray-600">Preserve dying crafts and traditions</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}