import React, { useState, useEffect, useContext } from "react";
import { Web3Context } from "../contexts/Web3Context";
import Post from "./Post";

function PostList() {
  const [posts, setPosts] = useState([]);
  const { contract } = useContext(Web3Context);

  useEffect(() => {
    const fetchPosts = async () => {
      if (contract) {
        try {
          const postCount = await contract.postCount();
          const fetchedPosts = [];
          for (let i = 1; i <= postCount; i++) {
            const post = await contract.posts(i);
            fetchedPosts.push(post);
          }
          setPosts(fetchedPosts);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };

    fetchPosts();
  }, [contract]);

  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-bold mb-4 text-primary'>Posts</h2>
      {posts.map((post) => (
        <Post key={post.postId.toString()} post={post} />
      ))}
    </div>
  );
}

export default PostList;
