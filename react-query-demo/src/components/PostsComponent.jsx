// src/components/PostsComponent.jsx
import React from 'react';
import { useQuery } from 'react-query';

// Function to fetch posts from JSONPlaceholder API
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  // Use useQuery hook with query key and fetch function
  const {
    data: posts,
    isLoading,
    isError,  // Changed from 'error' to 'isError'
    error,    // Keep error for the error message
    refetch,
    isFetching
  } = useQuery('posts', fetchPosts, {
    staleTime: 30000, // 30 seconds
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });

  // Loading state
  if (isLoading) {
    return (
      <div>
        <h2>Posts</h2>
        <p>Loading posts...</p>
      </div>
    );
  }

  // Error state using isError
  if (isError) {
    return (
      <div>
        <h2>Posts</h2>
        <p>Error: {error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Posts {isFetching && '(Updating...)'}</h2>
      
      {/* Refetch button to demonstrate manual data update */}
      <button 
        onClick={() => refetch()} 
        disabled={isFetching}
        style={{ marginBottom: '1rem' }}
      >
        {isFetching ? 'Fetching...' : 'Refetch Posts'}
      </button>

      {/* Display cached/fetched timestamp */}
      <p>
        Data last fetched: {new Date().toLocaleTimeString()}
      </p>

      {/* Posts list */}
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {posts && posts.map(post => (
          <div 
            key={post.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              margin: '0.5rem 0',
              borderRadius: '4px'
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>Post ID: {post.id}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsComponent;
