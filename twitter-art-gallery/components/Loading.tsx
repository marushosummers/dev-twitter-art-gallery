import React from 'react';
import Header from './Header';
import Layout from './layout';
import PageTransition from './PageTransition';

export default function Loading({ name }) {
  return (
    <Layout>
      <Header name={name} />
      <PageTransition key={`loading-${name}`}>
        <div className="min-h-screen" >
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-500"></div>
          </div>
        </div>
        </PageTransition>
    </Layout>
  )
}
