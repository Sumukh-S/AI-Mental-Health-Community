import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import '../styles/community.css';

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const [selectedPost, setSelectedPost] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await api.get('/posts');
            setPosts(response.data);
        } catch (err) {
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/posts', newPost);
            setPosts([response.data, ...posts]);
            setNewPost({ title: '', content: '' });
        } catch (err) {
            setError('Failed to create post');
        }
    };

    const handleCommentSubmit = async (postId) => {
        try {
            const response = await api.post(`/posts/${postId}/comments`, {
                content: comment
            });
            setPosts(posts.map(post =>
                post._id === postId ? response.data : post
            ));
            setComment('');
            setSelectedPost(null);
        } catch (err) {
            setError('Failed to add comment');
        }
    };

    return (
        <div className="community-container p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-4xl mx-auto"
            >
                {/* Create Post Section */}
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="create-post-card"
                >
                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        Share Your Thoughts
                    </h2>
                    <form onSubmit={handlePostSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            placeholder="Title"
                            className="post-input"
                            required
                        />
                        <textarea
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            placeholder="Share your thoughts..."
                            className="post-input"
                            rows="4"
                            required
                        />
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="action-button"
                        >
                            Post
                        </motion.button>
                    </form>
                </motion.div>

                {/* Posts List */}
                <AnimatePresence>
                    {posts.map((post, index) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.1 }}
                            className="post-card mb-6"
                        >
                            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                            <p className="text-gray-600 mb-4">{post.content}</p>
                            <div className="text-sm text-gray-500 mb-4">
                                Posted by {post.user.username} • {new Date(post.createdAt).toLocaleDateString()}
                            </div>

                            {/* Comments Section */}
                            <div className="comment-section">
                                {post.comments.map((comment, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="comment-card"
                                    >
                                        <p className="text-gray-800">{comment.content}</p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            {comment.username} • {new Date(comment.createdAt).toLocaleDateString()}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Add Comment Section */}
                            {selectedPost === post._id ? (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-4"
                                >
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="post-input"
                                        placeholder="Write a comment..."
                                        rows="2"
                                    />
                                    <div className="mt-2 space-x-2">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleCommentSubmit(post._id)}
                                            className="action-button"
                                        >
                                            Submit
                                        </motion.button>
                                        <button
                                            onClick={() => setSelectedPost(null)}
                                            className="text-gray-600 hover:text-gray-800"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setSelectedPost(post._id)}
                                    className="text-purple-600 hover:text-purple-700 font-medium"
                                >
                                    Add Comment
                                </motion.button>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {loading && (
                    <div className="text-center py-8">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"
                        />
                    </div>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-50 text-red-500 p-4 rounded-lg mt-4 text-center"
                    >
                        {error}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default Community; 