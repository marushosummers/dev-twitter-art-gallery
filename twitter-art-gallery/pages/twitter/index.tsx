import type { NextPage } from 'next'
import Router from "next/router";
import { useState } from 'react';
import InputForm from '../../components/InputForm'
import Layout from '../../components/layout'
import InfoModal from '../../components/InfoModal';

const TwitterPage: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = (name: string) => {
    Router.push(`/twitter/${name}`)
  }

  return (
    <Layout>
      <div>
        <button
          className="nm-flat-gray-100 fixed top-8 right-8 rounded-full hover:bg-gray-200"
          type="button"
          onClick={() => setShowModal(!showModal)}
        >
          <div className="text-gray-400 text-xl p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
        </button>
        {showModal ? (
          <InfoModal onClick={() => setShowModal(false)} />
        ) : null}
      </div>
      <div className="min-h-screen container mx-auto flex flex-col justify-center items-center" >
        <div className="container mx-auto flex flex-col justify-center items-center">
          <div className="nm-flat-gray-100 flex justify-center items-center title-font font-medium text-gray-700 text-3xl mx-8 mb-12 px-6 py-6 rounded-full ">
            Garoo
          </div>
          <div className="mb-28">
            <InputForm name={""} onSubmit={(screen_name: string) => handleSubmit(screen_name)} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TwitterPage
