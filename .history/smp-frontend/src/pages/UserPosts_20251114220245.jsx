import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UserPosts() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        setLoading(true);

        // Fetch user info
        const userResp = await axios.get(`http://localhost:8082/users/by-id/${userId}`);
        setUser(userResp.data);

        // Fetch user posts
        const postsResp = await axios.get(`http://localhost:8082/posts/user/${userId}`);
        setPosts(postsResp.data || []);
      } catch (error) {
        console.error("Error fetching user or posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [userId]);

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 pt-24">
      {user && (
        <>
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <p className="text-slate-400">{user.email}</p>
        </>
      )}

      <h2 className="text-xl font-bold mt-6 mb-3">Posts</h2>

      {posts.length === 0 ? (
        <p className="text-slate-400">No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((p) => (
  <div key={p.postId} className="p-4 bg-slate-800 rounded-lg space-y-3">

    {/* Show caption / description */}
    {p.caption && (
      <p className="text-white">{p.caption}</p>
    )}

    {/* Show Base64 Image */}
    {p.image && (
      <img
        src={`data:image/jpeg;base64,${p.image}`}
        alt="Post"
        className="w-full rounded-lg"
      />
    )}

  </div>
))}

        </div>
      )}
    </div>
  );
}
