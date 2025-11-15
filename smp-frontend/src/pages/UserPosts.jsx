import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UserPosts() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user details
        const userResp = await axios.get(`http://localhost:8082/users/${userId}`);
        setUser(userResp.data);

        // Fetch posts
        const postsResp = await axios.get(`http://localhost:8082/posts/user/${userId}`);
        setPosts(postsResp.data || []);

      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Helper to parse comments if stored as a string
  const parseComments = (comments) => {
    try {
      return typeof comments === "string" ? JSON.parse(comments) : comments;
    } catch {
      return [];
    }
  };

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 pt-24">

      {/* User Details */}
      {user && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <p className="text-slate-400">{user.email}</p>
        </div>
      )}

      {/* User Posts */}
      <h2 className="text-xl font-bold mb-4">Posts</h2>

      {posts.length === 0 ? (
        <p className="text-slate-400">No posts yet.</p>
      ) : (
        <div className="space-y-6">

          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-800/50 backdrop-blur border border-indigo-500/20 
              rounded-xl overflow-hidden hover:border-indigo-500/50 
              transition-all duration-300"
            >
              {/* Post Header */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 
                rounded-full flex items-center justify-center text-white font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-bold text-white">{user.username}</p>
                </div>
              </div>

              {/* Post Image */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full object-contain max-h-[60vh] mx-auto"
                />
              )}

              {/* Post Caption */}
              {post.caption && (
                <div className="px-6 py-4 border-b border-slate-700/50">
                  <p className="text-slate-200">{post.caption}</p>
                </div>
              )}

              {/* Post Stats */}
              <div className="px-6 py-3 bg-slate-700/30 flex gap-6 text-sm">
                <span className="text-slate-400">
                  ❤️ <span className="text-indigo-400 font-semibold">{post.likes || 0}</span> Likes
                </span>
                <span className="text-slate-400">
                  💬 <span className="text-purple-400 font-semibold">{post.comments?.length || 0}</span> Comments
                </span>
              </div>

              {/* Comments Section */}
              {post.comments && (
                <div className="px-6 py-4 bg-slate-700/20 border-t border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-3 font-semibold">COMMENTS</p>

                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {parseComments(post.comments).map((c, idx) => (
                      <div key={idx} className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-sm font-semibold text-indigo-400">{c.username}</p>
                        <p className="text-sm text-slate-300 mt-1">{c.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ))}

        </div>
      )}
    </div>
  );
}
