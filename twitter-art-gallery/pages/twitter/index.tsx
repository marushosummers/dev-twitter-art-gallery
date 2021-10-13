import type { NextPage } from 'next'
import Router from "next/router";
import { useState } from 'react';
import InputForm from '../../components/InputForm'
import Layout from '../../components/layout'
import Modal from '../../components/Modal';
import { MdHelpOutline } from 'react-icons/md';

const TwitterPage: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = (name: string) => {
    Router.push(`/twitter/${name}`)
  }

  return (
    <Layout>
      <div className="">
        <button
          className="nm-flat-gray-100 fixed top-8 right-8 rounded-full hover:bg-gray-200"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <div className="text-gray-400 text-xl p-2"><MdHelpOutline /></div>
        </button>
        {showModal ? (
          <Modal onClick={() => setShowModal(false)} />
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
