import React from 'react';
import Header from './Header';
import Layout from './layout';

const ErrorMessage = ({ name, message }) => {
  return (
    <Layout>
      <Header name={name} />
      <div className="flex justify-center">
        <span className="nm-inset-gray-100 text-gray-500 text-sm mx-auto my-20 p-5 rounded-full">
          { message }
        </span>
      </div>
    </Layout>
  )
}

export default ErrorMessage;
