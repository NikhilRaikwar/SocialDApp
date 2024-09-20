import React, { useContext, useState, useEffect } from "react";
import { Web3Context } from "../contexts/Web3Context";

function Header() {
  const { account, disconnectWallet, contract } = useContext(Web3Context);
  const [showProfile, setShowProfile] = useState(false);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (contract && account) {
        try {
          const user = await contract.users(account);
          setUsername(user.username);
          setBio(user.bio);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [contract, account]);

  return (
    <header className='bg-background-dark shadow-md'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <h1 className='text-2xl font-semibold text-primary'>MetaCircle</h1>
        {account && (
          <div className='relative'>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className='flex items-center space-x-2 text-text-light hover:text-primary transition duration-150 ease-in-out'
            >
              <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-background-dark font-bold'>
                {username.charAt(0).toUpperCase()}
              </div>
              <span>{username}</span>
            </button>
            {showProfile && (
              <div className='absolute right-0 mt-2 w-48 bg-background-light rounded-md shadow-lg py-1 border border-background-dark'>
                <div className='px-4 py-2 text-sm text-text-light'>
                  <p className='font-semibold text-text-dark'>{username}</p>
                  <p className='text-xs mt-1'>{bio}</p>
                  <p className='text-xs mt-1 text-text-default'>
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    disconnectWallet();
                    setShowProfile(false);
                  }}
                  className='block w-full text-left px-4 py-2 text-sm text-text-light hover:bg-background-default'
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
