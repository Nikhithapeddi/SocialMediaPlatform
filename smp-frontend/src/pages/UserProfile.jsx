import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        // Try canonical endpoints; fall back if needed
        let userResp;
        try {
          userResp = await axios.get(`http://localhost:8082/users/${id}`);
        } catch (e) {
          userResp = await axios.get(`http://localhost:8082/users/by-id/${id}`);
        }

        const postsResp = await axios.get(`http://localhost:8082/posts/user/${id}`);
        setUser(userResp.data || null);
        setPosts(postsResp.data || []);
      } catch (e) {
        console.error('Failed to load user profile', e);
        setUser(null);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const currentUserRaw = localStorage.getItem('user');
  let currentId = null;
  try {
    const cu = currentUserRaw ? JSON.parse(currentUserRaw) : null;
    currentId = cu?.id || cu?.userId || localStorage.getItem('userId');
  } catch (e) {
    currentId = localStorage.getItem('userId');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{user?.username || user?.name || 'User'}</h1>
            <p className="text-sm text-slate-400">{user?.email}</p>
          </div>
          <div className="flex gap-3">
            {String(currentId) === String(id) && (
              <button onClick={() => window.scrollTo({ top: 9999, behavior: 'smooth' })} className="px-4 py-2 rounded-lg bg-indigo-500 text-white">Add Post</button>
            )}
            <button onClick={() => navigate(-1)} className="px-3 py-2 rounded-lg border border-slate-600 text-slate-300">Back</button>
          </div>
        </div>

        {loading ? (
          <p className="text-slate-400">Loading profile...</p>
        ) : (
          <div className="space-y-6">
            {posts.length === 0 ? (
              <p className="text-slate-400">No posts yet.</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-slate-800/50 rounded-lg overflow-hidden">
                  {post.image && <img src={post.image} alt="post" className="w-full object-contain max-h-[60vh]" />}
                  {post.caption && <div className="p-4"><p className="text-slate-200">{post.caption}</p></div>}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
