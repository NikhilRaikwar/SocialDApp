import React, { useContext, useState, useEffect } from "react";
import { Web3Provider, Web3Context } from "./contexts/Web3Context";
import Header from "./components/Header";
import ConnectWallet from "./components/ConnectWallet";
import InitialUserRegistration from "./components/InitialUserRegistration";
import Feed from "./components/Feed";
import LoadingOverlay from "./components/LoadingOverlay";

function AppContent() {
  const { account, contract } = useContext(Web3Context);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkRegistration = async () => {
      if (contract && account) {
        setIsLoading(true);
        try {
          const registered = await contract.isUserRegistered(account);
          setIsRegistered(registered);
        } catch (error) {
          console.error("Error checking registration:", error);
        }
        setIsLoading(false);
      }
    };

    checkRegistration();
  }, [contract, account]);

  if (!account) {
    return <ConnectWallet />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!isRegistered) {
    return (
      <InitialUserRegistration
        onRegistrationComplete={() => setIsRegistered(true)}
      />
    );
  }

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <Header />
      <main className='container mx-auto px-4 py-8'>
        <Feed />
      </main>
    </div>
  );
}

function App() {
  return (
    <Web3Provider>
      <AppContent />
    </Web3Provider>
  );
}

export default App;
