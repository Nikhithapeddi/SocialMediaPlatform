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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    try {
      // Correct login API call
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

      // Store the full user object (contains userId, username, email)
  localStorage.setItem("user", JSON.stringify(user));
  // Also store email and id separately for compatibility
  if (user.email) localStorage.setItem('userEmail', user.email);
  if (user.id || user.userId) localStorage.setItem('userId', user.id || user.userId);

      setFormData({ email: '', password: '' });

      // Redirect to dashboard
      navigate('/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 max-w-md relative z-10 order-2 lg:order-1">
        <div className="bg-slate-800/80 backdrop-blur border border-indigo-500/20 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Sign In</h1>
            <p className="text-slate-400">Welcome back to PostMate!</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-200 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-600/50"></div>
            <span className="text-sm text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-600/50"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Sign Up
            </Link>
          </p>

          {/* Back to Home */}
          <Link
            to="/"
            className="block text-center mt-6 text-slate-400 hover:text-slate-300 transition-colors font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Right Side - Info */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-start relative z-10 order-1 lg:order-2 pl-12">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">
            P
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            PostMate
          </span>
        </Link>

        <h2 className="text-5xl font-black mb-6 text-white leading-tight">
          Welcome Back to <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">PostMate</span>
        </h2>
        <p className="text-xl text-slate-300 mb-8 leading-relaxed">
          Log in to your account and continue sharing your stories with the world.
        </p>

        <div className="space-y-6">
          {[
            { icon: '📝', title: 'Share Your Thoughts', desc: 'Express yourself freely' },
            { icon: '🤝', title: 'Connect with Friends', desc: 'Build meaningful relationships' },
            { icon: '🌟', title: 'Trending Now', desc: 'Stay updated with latest posts' },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <h4 className="font-bold text-white text-lg">{item.title}</h4>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
