import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8082/users/login', {
        email: formData.email,
        password: formData.password,
      });

      const user = response.data;

      if (!user) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      // Store full user object (already contains userId)
      localStorage.setItem("user", JSON.stringify(user));

      setFormData({ email: '', password: '' });

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 max-w-md relative z-10">
        <div className="bg-slate-800/80 backdrop-blur border border-indigo-500/20 rounded-2xl p-8 shadow-2xl">

          <div className="mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Sign In</h1>
            <p className="text-slate-400">Welcome back! Let's get you logged in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

          </form>

          <p className="text-center text-slate-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-indigo-400">
              Sign Up
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
