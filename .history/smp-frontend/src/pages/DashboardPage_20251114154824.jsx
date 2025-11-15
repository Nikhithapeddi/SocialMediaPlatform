import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DashboardPage() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [username, setUsername] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [creating, setCreating] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentPost, setCommentPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!userEmail) {
      navigate('/login');
      return;
    }
    fetchPosts();
    fetchUsername();
  }, [userEmail, navigate]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8082/posts/all');
      setPosts(response.data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsername = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/users/${userEmail}`);
      setUsername(response.data.username || userEmail);
    } catch (error) {
      console.error('Error fetching username:', error);
      setUsername(userEmail.split('@')[0]);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async () => {
    if (!imageBase64) {
      alert('Please select an image');
      return;
    }

    try {
      setCreating(true);
      await axios.post('http://localhost:8082/posts/create', {
        image: imageBase64,
        caption: caption || '',
        username: username,
      });

      setCaption('');
      setSelectedImage(null);
      setImageBase64('');
      setShowCreateModal(false);
      fetchPosts();
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } finally {
      setCreating(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:8082/posts/${postId}/like`);
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      alert('Please enter a comment');
      return;
    }

    try {
      await axios.post(`http://localhost:8082/posts/${commentPost.id}/comment`, {
        username: username,
        comment: commentText,
      });

      setCommentText('');
      setShowCommentModal(false);
      fetchPosts();
      alert('Comment added!');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment');
    }
  };

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
      <nav className="fixed w-full top-0 z-50 bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-indigo-500/20">
        <div className="max-w-full mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">
              P
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PostMate
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <span className="text-slate-300 text-sm">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors duration-300"
            >
              Logout
            </button>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-indigo-400 hover:text-indigo-300"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-20 h-screen w-64 bg-slate-900/95 backdrop-blur border-r border-indigo-500/20 transform transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-8">
          {/* Profile Section */}
          <div className="bg-slate-800/50 backdrop-blur border border-indigo-500/20 rounded-lg p-4">
            <h3 className="text-sm font-bold text-indigo-400 mb-4">PROFILE</h3>
            <div className="space-y-3">
              <div className="bg-indigo-500/10 rounded-lg p-3">
                <p className="text-xs text-slate-400">Username</p>
                <p className="text-white font-semibold">{username}</p>
              </div>
              <div className="bg-purple-500/10 rounded-lg p-3">
                <p className="text-xs text-slate-400">Email</p>
                <p className="text-white font-semibold text-sm truncate">{userEmail}</p>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-lg p-4">
            <h3 className="text-sm font-bold text-purple-400 mb-4">SETTINGS</h3>
            <button className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
              ⚙️ Preferences
            </button>
            <button className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
              🔒 Privacy
            </button>
            <button className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
              🔔 Notifications
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 md:hidden"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-0 md:ml-64 pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          {/* Create Post Button */}
          <div className="mb-8">
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full flex items-center justify-center gap-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-3xl">+</div>
              <span>Create New Post</span>
            </button>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-slate-400">Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-8 text-center">
                <p className="text-slate-400 text-lg">No posts yet. Be the first to post!</p>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-slate-800/50 backdrop-blur border border-indigo-500/20 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
                >
                  {/* Post Header */}
                  <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {post.username?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-white">{post.username}</p>
                      <p className="text-xs text-slate-400">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full max-h-96 object-cover"
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

                  {/* Post Actions */}
                  <div className="px-6 py-4 flex gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 font-semibold transition-all duration-300"
                    >
                      ❤️ Like
                    </button>
                    <button
                      onClick={() => {
                        setCommentPost(post);
                        setShowCommentModal(true);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 font-semibold transition-all duration-300"
                    >
                      💬 Comment
                    </button>
                  </div>

                  {/* Comments Section */}
                  {post.comments && post.comments.length > 0 && (
                    <div className="px-6 py-4 bg-slate-700/20 border-t border-slate-700/50">
                      <p className="text-xs text-slate-400 mb-3 font-semibold">COMMENTS</p>
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {post.comments.map((comment, idx) => (
                          <div key={idx} className="bg-slate-800/50 rounded-lg p-3">
                            <p className="text-sm font-semibold text-indigo-400">{comment.username}</p>
                            <p className="text-sm text-slate-300 mt-1">{comment.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800/95 backdrop-blur border border-indigo-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-6">
              Create a <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Post</span>
            </h2>

            {/* Image Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-200 mb-3">Select Image *</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="image-input"
                />
                <label
                  htmlFor="image-input"
                  className="block w-full px-4 py-4 rounded-lg border-2 border-dashed border-indigo-500/50 hover:border-indigo-500 text-center cursor-pointer bg-indigo-500/5 hover:bg-indigo-500/10 transition-all duration-300"
                >
                  {selectedImage ? (
                    <div className="text-indigo-400 font-semibold">✓ {selectedImage.name}</div>
                  ) : (
                    <div>
                      <p className="text-indigo-400 font-semibold">📷 Click to select image</p>
                      <p className="text-xs text-slate-400 mt-1">PNG, JPG, GIF</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Image Preview */}
            {imageBase64 && (
              <div className="mb-6">
                <img
                  src={imageBase64}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-indigo-500/30"
                />
              </div>
            )}

            {/* Caption */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-200 mb-2">Caption (Optional)</label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 resize-none"
                rows="3"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setCaption('');
                  setSelectedImage(null);
                  setImageBase64('');
                }}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-600 text-slate-300 hover:bg-slate-700/50 font-semibold transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                disabled={creating || !imageBase64}
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-all duration-300"
              >
                {creating ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800/95 backdrop-blur border border-purple-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-4">
              Add a <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Comment</span>
            </h2>
            <p className="text-slate-400 text-sm mb-6">on {commentPost?.username}'s post</p>

            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none mb-6"
              rows="3"
            />

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setCommentText('');
                }}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-600 text-slate-300 hover:bg-slate-700/50 font-semibold transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCommentSubmit}
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold transition-all duration-300"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
