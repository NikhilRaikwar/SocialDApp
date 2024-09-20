import React, { useState, useEffect, useContext } from "react";
import { Web3Context } from "../contexts/Web3Context";
import Post from "./Post";
import LoadingOverlay from "./LoadingOverlay";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { contract } = useContext(Web3Context);

  const fetchPosts = async () => {
    if (contract) {
      try {
        const postCount = Number(await contract.postCount());
        const fetchedPosts = [];
        for (let i = postCount; i > Math.max(0, postCount - 10); i--) {
          const post = await contract.posts(i);
          const authorUsername = await contract.getPostAuthorUsername(i);
          fetchedPosts.push({ ...post, postId: i, authorUsername });
        }
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [contract]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract && content.trim()) {
      setIsLoading(true);
      try {
        let txn = await contract.createPost(content);
        await txn.wait(2);
        setContent("");
        await fetchPosts();
      } catch (error) {
        console.error("Error creating post:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='container mx-auto px-4 py-8 max-w-2xl'>
      {isLoading && <LoadingOverlay />}
      <form
        onSubmit={handleSubmit}
        className='bg-background-light rounded-lg shadow-md p-6 mb-8 border border-background-dark'
      >
        <textarea
          className='bg-background-default border border-background-dark rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary text-text-light'
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows='3'
        />
        <button
          type='submit'
          className='bg-primary text-background-dark font-medium py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-150 ease-in-out'
        >
          Post
        </button>
      </form>
      <div className='space-y-6'>
        {posts.map((post) => (
          <Post
            key={post.postId.toString()}
            post={post}
            refreshPosts={fetchPosts}
          />
        ))}
      </div>
    </div>
  );
}

export default Feed;
