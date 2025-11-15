import { useNavigate, useEffect } from 'react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (!userEmail) {
      navigate('/login');
    }
  }, [userEmail, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  if (!userEmail) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-slate-900/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">
              P
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PostMate
            </span>
          </div>

          <div className="flex gap-4 items-center">
            <span className="text-slate-300">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              Welcome to Your{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              🚀 Dashboard coming soon! We're building an amazing experience for you to share posts, 
              connect with friends, and explore trending content.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-slate-800/50 backdrop-blur border border-indigo-500/20 rounded-xl p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">📝</div>
                <h3 className="text-lg font-bold text-white mb-2">Create Posts</h3>
                <p className="text-slate-400">Share your thoughts and ideas</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-xl p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">👥</div>
                <h3 className="text-lg font-bold text-white mb-2">Find Friends</h3>
                <p className="text-slate-400">Connect with like-minded people</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur border border-pink-500/20 rounded-xl p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2">🔥</div>
                <h3 className="text-lg font-bold text-white mb-2">Explore Trending</h3>
                <p className="text-slate-400">Discover popular posts</p>
              </div>
            </div>

            <p className="text-slate-400 mt-12 text-lg">
              Logged in as: <span className="font-semibold text-indigo-400">{userEmail}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur border-t border-slate-700/50 py-8 px-6 text-center text-slate-400">
        <p>&copy; 2024 PostMate. Dashboard coming soon!</p>
      </footer>
    </div>
  );
}
