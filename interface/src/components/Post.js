import React, { useContext, useState, useEffect } from "react";
import { Web3Context } from "../contexts/Web3Context";
import LoadingOverlay from "./LoadingOverlay";

function Post({ post, refreshPosts }) {
  const { contract, account } = useContext(Web3Context);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [reloadData, setReloadData] = useState(true);
  const [connectedUsername, setConnectedUsername] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (contract) {
        try {
          const likesCount = post[3];
          const userLiked = await contract.isPostLikedByUser(
            post.postId,
            account
          );
          console.log(account);
          setLikes(Number(likesCount));
          setHasLiked(userLiked);

          const username = await contract.getUsername(account);
          console.log(connectedUsername);
          setConnectedUsername(username);
          const fetchedComments = await contract.getCommentsForPost(
            post.postId
          );
          let commentsArray = fetchedComments.toArray();
          console.log(commentsArray);
          const commentsWithUsernames = await Promise.all(
            commentsArray.map(async (comment) => {
              console.log(comment);

              return { ...comment };
            })
          );
          setComments(commentsWithUsernames);
        } catch (error) {
          console.error("Error fetching post details:", error);
        }
      }
    };

    fetchPostDetails();
  }, [contract, post.postId, account, reloadData]);

  const handleLike = async () => {
    if (contract) {
      setIsLoading(true);
      try {
        let txn;
        if (hasLiked) {
          txn = await contract.unlikePost(post.postId);
        } else {
          txn = await contract.likePost(post.postId);
        }
        await txn.wait(1);
        await refreshPosts();
        setReloadData(!reloadData);
      } catch (error) {
        console.error("Error liking/unliking post:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleComment = async () => {
    if (contract && commentContent.trim()) {
      setIsLoading(true);
      console.log(commentContent);
      try {
        let txn = await contract.commentOnPost(post.postId, commentContent);
        await txn.wait(1);
        setCommentContent("");
        await refreshPosts();
        setReloadData(!reloadData);
      } catch (error) {
        console.error("Error commenting on post:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='bg-background-light rounded-lg shadow-md p-6 mb-6 border border-background-dark'>
      {isLoading && <LoadingOverlay />}
      <div className='flex items-center mb-4'>
        <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background-dark font-bold mr-3'>
          {post.authorUsername[0].toUpperCase()}
        </div>
        <div>
          <p className='font-semibold text-text-dark'>{post.authorUsername}</p>
        </div>
      </div>
      <p className='text-text-light mb-4'>{post[2]}</p>
      <div className='flex items-center mb-4'>
        <button
          onClick={handleLike}
          className={`flex items-center ${
            hasLiked ? "text-accent" : "text-text-default"
          } hover:text-accent transition duration-150 ease-in-out mr-4`}
        >
          <svg
            className='w-5 h-5 mr-1'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z' />
          </svg>
          <span>{likes}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className='text-text-default hover:text-accent transition duration-150 ease-in-out flex items-center'
        >
          <svg
            className='w-5 h-5 mr-1'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
            />
          </svg>
          <span>{comments.length}</span>
        </button>
      </div>
      {showComments && (
        <div className='mt-4'>
          <h3 className='text-text-dark font-semibold mb-2'>Comments:</h3>
          {comments.map((comment, index) => (
            <div key={index} className='bg-background-default rounded p-2 mb-2'>
              <p className='text-text-light text-sm'>
                <span className='font-semibold text-text-dark'>
                  {comment[1]}:
                </span>{" "}
                {comment[3]}
              </p>
            </div>
          ))}
          <textarea
            className='bg-background-default border border-background-dark rounded-md p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-primary text-text-light'
            rows='2'
            placeholder='Write a comment...'
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          ></textarea>
          <button
            onClick={handleComment}
            className='bg-primary text-background-dark font-medium py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-150 ease-in-out mt-2'
          >
            Post Comment
          </button>
        </div>
      )}
    </div>
  );
}

export default Post;
