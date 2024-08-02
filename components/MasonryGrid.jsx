"use client";

import React from 'react';
import Masonry from 'react-masonry-css';
import Card from '@/components/card';

const MasonryGrid = ({ posts }) => {
  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    900: 3,
    700: 2
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {posts.map((post) => (
        <Card 
          key={post.post_id.toString()}
          post_id={post.post_id.toString()}
          title={post.title}
          description={post.description}
          imageUrl={post.imageUrl}
        />
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
