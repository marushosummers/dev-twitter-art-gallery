import React from 'react';
import PageTransition from './PageTransition';

export default function LoadingItem({ name }) {
  return (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-500"></div>
        </div>

  )
}
