import React from "react";

function LoadingOverlay({ message = "Loading..." }) {
  return (
    <div className='fixed inset-0 bg-background-dark bg-opacity-50 flex items-center justify-center z-50'>
      <div className=' bg-slate-950 rounded-lg p-6 flex flex-col items-center'>
        <div className='loader mb-4'></div>
        <p className='text-text-default'>{message}</p>
      </div>
    </div>
  );
}

export default LoadingOverlay;
