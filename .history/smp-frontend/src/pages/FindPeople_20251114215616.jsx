import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function FindPeople() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const resp = await axios.get('http://localhost:8082/users/all');
        setPeople(resp.data || []);
      } catch (e) {
        console.error('Failed to fetch users', e);
        setPeople([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 👇 Just navigate with userId
  const handleUserClick = (userId) => {
    navigate(`/posts/user/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <h1 className="text-2xl font-bold text-white mb-4">Find People</h1>

        {loading ? (
          <p className="text-slate-400">Loading users...</p>
        ) : people.length === 0 ? (
          <p className="text-slate-400">No users found.</p>
        ) : (
          <div className="space-y-3">
            {people.map((p) => (
              <button
                key={p.userId}
                onClick={() => handleUserClick(p.userId)}
                className="w-full text-left p-4 bg-slate-800/50 rounded-lg hover:bg-indigo-500/5 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-semibold">{p.username}</p>
                    <p className="text-xs text-slate-400">{p.email}</p>
                  </div>
                  <div className="text-slate-400 text-sm">View</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
