import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Card, CardContent, CardHeader, Button, TextField } from '@mui/material';

function Community() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/posts');
            setPosts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch posts');
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/posts', newPost, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setPosts([response.data, ...posts]);
            setNewPost({ title: '', content: '' });
        } catch (err) {
            setError('Failed to create post');
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Community Posts
                </Typography>

                {/* Post Creation Form */}
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Title"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Content"
                                value={newPost.content}
                                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                margin="normal"
                                multiline
                                rows={4}
                                required
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Create Post
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Posts List */}
                {posts.map((post) => (
                    <Card key={post._id} sx={{ mb: 2 }}>
                        <CardHeader
                            title={post.title}
                            subheader={`Posted by ${post.author?.username || 'Unknown User'} on ${new Date(post.createdAt).toLocaleDateString()}`}
                        />
                        <CardContent>
                            <Typography variant="body1">
                                {post.content}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
}

export default Community; 