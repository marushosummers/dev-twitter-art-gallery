import React from 'react';
import PageTransition from './PageTransition';

export default function Loading({ key }) {
  return (
    <PageTransition key={key}>
      <div className="min-h-screen" >
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      </div>
    </PageTransition>
  )
}
