import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth';
import { useAuth } from '../hooks/useAuth';
import LocationPicker from '../components/map/LocationPicker';
import Layout from '../components/layout/Layout';

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
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authService.register(registerData);
      
      login(response.token, {
        email: response.email,
        username: response.username,
        userId: response.userId,
      });
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10">
        <div className="card">
          <h2 className="text-3xl font-bold text-center mb-6">Join Micro-Mentor</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="input-field"
                required
                minLength={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="input-field"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="input-field"
                required
              />
            </div>

            <LocationPicker
              onLocationSelect={handleLocationSelect}
              initialPosition={{ lat: formData.latitude, lng: formData.longitude }}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:bg-gray-400"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}