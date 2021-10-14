import React from 'react';
import Header from './Header';
import Layout from './layout';
import LoadingItem from './LoadingItem';
import PageTransition from './PageTransition';

export default function Loading({ name }) {
  return (
    <Layout>
      <Header name={name} />
        <div className="min-h-screen" >
          <LoadingItem name={name} />
        </div>
    </Layout>
  )
}
