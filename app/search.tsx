import React, { useEffect, useState } from 'react';
import SearchBar from "@/components/SearchBar";
import { createClient } from "@/supabase/client";
import Card from "@/components/card";

const SearchPage: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("posts").select();
      if (data) {
        setPosts(data);
        setFilteredPosts(data); // Initialize filtered posts
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = (query: string) => {
    const results = posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) || 
      post.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(results);
  };

  return (
    <div className="search-page">
      <h1>Search</h1>
      <SearchBar onSearch={handleSearch} />
      <div>
        {filteredPosts.map(post => (
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
  );
};

export default SearchPage;