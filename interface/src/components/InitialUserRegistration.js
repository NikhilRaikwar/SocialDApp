import React, { useState, useContext, useEffect } from "react";
import { Web3Context } from "../contexts/Web3Context";
import LoadingOverlay from "./LoadingOverlay";

function InitialUserRegistration({ onRegistrationComplete }) {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const { contract, account } = useContext(Web3Context);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkRegistration = async () => {
      if (contract && account) {
        const user = await contract.users(account);
        if (user.username !== "") {
          onRegistrationComplete();
        }
      }
    };
    checkRegistration();
  }, [contract, account, onRegistrationComplete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract) {
      setIsLoading(true);
      try {
        let txn = await contract.createUser(username, bio);
        await txn.wait(1);
        onRegistrationComplete();
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Error registering user. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='fixed inset-0 bg-background-dark bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
      {isLoading && <LoadingOverlay />}
      <div className='sleek-card w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-primary'>
          Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='block text-text-dark text-sm font-medium mb-2'
              htmlFor='username'
            >
              Username
            </label>
            <input
              className='sleek-input w-full'
              id='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder='Choose a username'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-text-dark text-sm font-medium mb-2'
              htmlFor='bio'
            >
              Bio
            </label>
            <textarea
              className='sleek-input w-full'
              id='bio'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
              placeholder='Tell us about yourself'
              rows='4'
            />
          </div>
          <button className='sleek-button w-full' type='submit'>
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
}

export default InitialUserRegistration;
