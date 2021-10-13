import React from 'react';

export default function Layout({ children }) {
  return (
    <>
      <main>
        <div className="min-h-screen nm-flat-gray-100">
          {children}
        </div>
      </main>
    </>
  )
}
