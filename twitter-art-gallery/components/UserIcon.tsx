import React from 'react';
import Image from 'next/image'

export default function UserIcon({ screenName, icon }) {
  if (icon) {
    return (
      <div>
        <div className="flex justify-center items-center" >
          <a href={`https://twitter.com/${screenName}`}>
            <div className="nm-flat-gray-100 flex justify-center items-center p-2 mb-8 rounded-full" >
              <Image
                src={icon}
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
          </a>
        </div>
        <div className="flex justify-center items-center" >
          <div className="nm-inset-gray-100 flex justify-center items-center p-2 mb-8 rounded-full" >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#F91780">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

    )
  } else {
    return <div></div>
  }
}
