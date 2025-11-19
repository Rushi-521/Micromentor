import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth';
import { useAuth } from '../hooks/useAuth';
import LocationPicker from '../components/map/LocationPicker';
import Layout from '../components/layout/Layout';
import { User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    latitude: 18.5204,
    longitude: 73.8567,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLocationSelect = (position) => {
    setFormData(prev => ({
      ...prev,
      latitude: position.lat,
      longitude: position.lng,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    setLoading(true);

    try {
const { confirmPassword: _confirmPassword, ...registerData } = formData;
      const response = await authService.register(registerData);
      
      login(response.token, {
        email: response.email,
        username: response.username,
        userId: response.userId,
      });
      
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 
                       err.response?.data?.message || 
                       'Registration failed. Please try again.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10">
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Join Micro-Mentor</h2>
            <p className="text-gray-600 mt-2">Create your account and start learning</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  <User className="inline h-4 w-4 mr-1" />
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="input-field"
                  placeholder="johndoe"
                  required
                  minLength={3}
                  maxLength={50}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input-field"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  <Lock className="inline h-4 w-4 mr-1" />
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="input-field"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  <Lock className="inline h-4 w-4 mr-1" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
                {formData.password && formData.confirmPassword && (
                  <p className={`text-xs mt-1 flex items-center ${
                    formData.password === formData.confirmPassword ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formData.password === formData.confirmPassword ? (
                      <><CheckCircle className="h-3 w-3 mr-1" /> Passwords match</>
                    ) : (
                      <><AlertCircle className="h-3 w-3 mr-1" /> Passwords don't match</>
                    )}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t pt-6">
              <LocationPicker
                onLocationSelect={handleLocationSelect}
                initialPosition={{ lat: formData.latitude, lng: formData.longitude }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}