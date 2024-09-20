// src/components/CreatePost.js

import React, { useState, useContext } from "react";
import { Web3Context } from "../contexts/Web3Context";
import LoadingOverlay from "./LoadingOverlay";

function CreatePost({ onClose }) {
  const [content, setContent] = useState("");
  const { contract } = useContext(Web3Context);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract && content.trim()) {
      setIsLoading(true);
      try {
        await contract.createPost(content);
        onClose();
      } catch (error) {
        console.error("Error creating post:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold text-blue-400'>Create Post</h2>
        <button onClick={onClose} className='text-gray-400 hover:text-gray-200'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            ></path>
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 bg-gray-700 text-white border-gray-600'
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          maxLength={280}
          rows={4}
        />
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-blue-600'
          type='submit'
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
