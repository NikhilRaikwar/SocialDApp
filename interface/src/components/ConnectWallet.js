import React, { useContext } from "react";
import { Web3Context } from "../contexts/Web3Context";
import banner from "../images/image.gif";

function ConnectWallet() {
  const { connectWallet } = useContext(Web3Context);

  return (
    <div className='min-h-screen flex flex-col bg-background-default'>
      <header className='bg-background-dark shadow-md'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <h1 className='text-2xl font-semibold text-primary'>MetaCircle</h1>
          <button
            onClick={connectWallet}
            className='bg-primary text-background-dark font-medium py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-150 ease-in-out'
          >
            Connect MetaMask
          </button>
        </div>
      </header>
      <main className='flex-grow container my-[-40px] mx-auto px-4 py-16 flex items-center justify-between'>
        <div className='max-w-xl'>
          <h2 className='text-7xl font-bold text-primary mb-4'>
            Welcome to Metacircle
          </h2>
          <p className='text-xl text-text-light mb-8'>
            Join our community of passionate builders and share your journey in
            the world of Web3.
          </p>
          <button
            onClick={connectWallet}
            className='bg-primary text-background-dark font-medium py-3 px-6 rounded-md hover:bg-opacity-90 transition duration-150 ease-in-out text-lg'
          >
            Get Started
          </button>
        </div>
        <img
          src={banner}
          className=' mr-12 '
          width={600}
          height={300}
          alt='MetaCircle banner'
        />
      </main>
    </div>
  );
}

export default ConnectWallet;
