"use client";
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const SearchPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .ilike('title', `%${query}%`);

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Search Posts Here</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.post_id}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              {post.imageURL && <img src={post.imageURL} alt={post.title} />}
              <p>Likes: {post.like_count}</p>
              <p>Created at: {post.created_at}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
