import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navbar */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">
              P
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PostMate
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 rounded-lg font-semibold text-slate-200 hover:text-white transition-colors duration-300 border border-indigo-500/30 hover:border-indigo-500"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Main Heading */}
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              Share Your{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Stories
              </span>
              <br />
              Connect with{' '}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                PostMate
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Welcome to <span className="font-bold text-white">PostMate</span> — where your voice matters. 
              Share posts, connect with friends, and build meaningful relationships in a space designed for 
              <span className="text-indigo-400 font-semibold"> you</span>.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started Now
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 rounded-xl font-bold text-lg border-2 border-indigo-400 text-indigo-300 hover:bg-indigo-500/10 hover:text-indigo-200 transition-all duration-300"
            >
              Already a Member?
            </button>
          </div>

          {/* Stats/Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-slate-800/50 backdrop-blur border border-indigo-500/20 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">∞</div>
              <h3 className="text-lg font-bold text-white mb-2">Unlimited Posts</h3>
              <p className="text-slate-400">Share as much as you want, whenever you want</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">🌍</div>
              <h3 className="text-lg font-bold text-white mb-2">Global Community</h3>
              <p className="text-slate-400">Connect with millions of people worldwide</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-pink-500/20 rounded-xl p-6 hover:border-pink-500/50 transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2">⚡</div>
              <h3 className="text-lg font-bold text-white mb-2">Lightning Fast</h3>
              <p className="text-slate-400">Experience smooth and instant interactions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              PostMate
            </span>
            ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Express Yourself', desc: 'Share your thoughts, ideas, and moments freely' },
              { title: 'Connect Instantly', desc: 'Find and connect with like-minded people' },
              { title: 'Stay Updated', desc: 'Never miss updates from people you care about' },
              { title: 'Privacy First', desc: 'Your data is yours, always secure and private' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur border border-indigo-500/20 rounded-xl p-8 hover:border-indigo-500/50 transition-all duration-300 group"
              >
                <div className="text-5xl font-black bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                  {idx === 0 ? '✨' : idx === 1 ? '🔗' : idx === 2 ? '📬' : '🔒'}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Ready to Join <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">PostMate</span>?
          </h2>
          <p className="text-xl text-slate-300 mb-8">Start connecting and sharing today. It only takes a few seconds!</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="px-10 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              Create Account Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur border-t border-slate-700/50 py-8 px-6 text-center text-slate-400">
        <p>&copy; 2024 PostMate. All rights reserved. | Connecting people, sharing stories.</p>
      </footer>
    </div>
  );
}
