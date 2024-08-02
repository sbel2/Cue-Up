// Working results
"use client";
import React, { useState, useEffect } from 'react';
import Card from "@/components/card";
import SearchBar from '@/components/searchBar';
import { createClient } from "@/supabase/client";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("posts").select();
    if (error) {
      console.error("Error loading posts:", error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

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
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayPosts = searchResults || posts;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!displayPosts || displayPosts.length === 0) {
    return <p>No posts found</p>;
  }

  return (
    <main className="min-h-screen mx-auto max-w-[100rem] overflow-x-hidden">
      <div className="px-12 pb-20">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex flex-col xl:flex-row xl:gap-40 border-radius:10px">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayPosts.map((post) => (
              <Card 
                key={post.post_id.toString()}
                post_id={post.post_id.toString()}
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}