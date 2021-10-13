import React from 'react';
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <main>
        <div className="nm-flat-gray-100">
          {children}
        </div>
      </main>
    </>
  )
}
