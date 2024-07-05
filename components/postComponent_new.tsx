'use client';
import { useState, useEffect } from 'react';
import styles from './card.module.css';
import Linkify from 'react-linkify';
import { Post } from '@/utils/types';

const PostPage: React.FC<Post> = ({
  post_id,
  title,
  description,
  imageUrl,
  like_count,
  created_at,
  user_id,
}) => {
  const [likesCount, setLikesCount] = useState(like_count);
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setLikesCount(like_count);
  }, [like_count]);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(likesCount + (liked ? -1 : 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrl.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imageUrl.length) % imageUrl.length,
    );
  };

  const linkDecorator = (href: string, text: string, key: number) => (
    <a
      href={href}
      key={key}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400"
    >
      {text}
    </a>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col lg:flex-row max-w-screen-lg w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative flex-1 lg:max-h-screen flex justify-center items-center">
          <img
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${imageUrl[currentImageIndex]}`}
            alt={title}
            className="object-cover max-h-full w-full h-full"
            style={{ objectFit: 'cover' }}
          />
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-gray-500 bg-black bg-opacity-50 hover:bg-opacity-75 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-gray-500 bg-black bg-opacity-50 hover:bg-opacity-75 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <button
          className="absolute top-5 right-5 bg-gray-600 bg-opacity-50 text-white p-1 rounded-full flex items-center justify-center"
          style={{ width: '30px', height: '30px', lineHeight: '30px' }}
          onClick={() => window.history.back()}
          aria-label="Close Post"
        >
          &#x2715;
        </button>
        <div className="flex-1 lg:max-h-screen p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <div className="text-gray-700 mb-4">
            <Linkify componentDecorator={linkDecorator}>{description}</Linkify>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <button onClick={handleLike}>
              {liked ? (
                <svg
                  fill="red"
                  stroke="red"
                  viewBox="0 0 24 24"
                  className={styles['icon']}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg
                  fill="none"
                  stroke="black"
                  viewBox="0 0 24 24"
                  className={styles['icon']}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              )}
            </button>
            <span>{likesCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
