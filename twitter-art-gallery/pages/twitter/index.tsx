import type { NextPage } from 'next'
import Router from "next/router";
import InputForm from '../../components/InputForm'
import Layout from '../../components/layout'

const TwitterPage: NextPage = () => {
  const handleSubmit = (name: string) => {
    Router.push(`/twitter/${name}`)
  }

  return (
    <Layout>
      <div className="min-h-screen container mx-auto flex justify-center items-center" >
        <div>
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
