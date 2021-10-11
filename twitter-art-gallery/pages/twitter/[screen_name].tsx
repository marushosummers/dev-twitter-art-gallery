import { useRouter } from "next/router";
import Image from 'next/image'
import MainTable from "../../components/MainTable";
import Layout from '../../components/layout'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";


interface typeUser {
  id: number
  name: string
  image: string
  favourites_count: number
};

interface typeImages {
  images: ImageItem[];
  max_id: string;
};

export interface ImageListProps {
  imageItems: ImageItem[];
}

export type ImageItem = {
  url: string;
  source: string;
};


const TwitterScreenName = () => {
  const router = useRouter();
  const { screen_name } = router.query;

  let name: string;
  if ((typeof screen_name === "string")) {
    name = screen_name;
  } else {
    name = "";
  }

  const [screenName, setScreenName] = useState(name)
  const [images, setImages] = useState([])
  const [icon, setIcon] = useState("")
  const [message, setMessage] = useState("loading...")
  const [loading, setLoading] = useState(true)
  const [maxId, setMaxId] = useState(0)

  useEffect(() => {
    if (!router.isReady) return;
    setScreenName(name)
    getUser(name)
    getiine(name)
  }, [router.isReady, name])

  const getUser = async (name: string): Promise<void> => {
    try {
      const response: any = await userAPI(name)
      setIcon(response.body.user.image)
    } catch {
      setMessage("取得に失敗しました。データが空か、スクリーンネームが間違っているかもしれません。");
    }
  }

  const getiine = async (name: string): Promise<void> => {
    try {
      const response: any = await favAPI(name, maxId)
      setIineImages(response.body)
    } catch {
      setMessage("取得に失敗しました。データが空か、スクリーンネームが間違っているかもしれません。");
    }
  }

  const setIineImages = (results: any) => {
    setMaxId(results.max_id)
    setImages(results.images)

    if (results.images.length === 0) {
      setMessage("いいねした画像がありませんでした");
    }
    setMessage("")
    setLoading(false);
  };

  const userAPI = async (screen_name: string): Promise<typeUser> => {
    let endpoint = `${process.env.ENDPOINT}/api/twitter/user?name=${screen_name}`

    console.log(endpoint)

    try {
      const response: any = await axios.get(endpoint);
      return response.data
    } catch (error) {
      console.log(error)
      throw (Error)
    }
  }

  const favAPI = async (screen_name: string, max_id: number): Promise<typeImages> => {
    let endpoint = `${process.env.ENDPOINT}/api/twitter/fav?name=${screen_name}`
    if (max_id) {
      endpoint += `&max_id=${max_id}`
    }

    console.log(endpoint)

    try {
      const response: any = await axios.get(endpoint);
      return response.data
    } catch (error) {
      console.log(error)
      throw (Error)
    }
  }

  if (loading) {
    return (
      <Layout>
        <Header name={screenName} />
        <div className="min-h-screen" >
          <div className=" flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
          </div>
          </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header name={screenName} />
      <div className="min-h-screen" >
        <div className="container mx-auto" >
          <div className="flex justify-center items-center" >
            <div className="nm-flat-gray-100 flex justify-center items-center p-2 mb-8 rounded-full" >
              <Image
                src={icon}
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="flex justify-center items-center" >
            <div className="nm-inset-gray-100 flex justify-center items-center p-2 mb-8 rounded-full" >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#F91780">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex justify-center" >
              <MainTable screen_name={screenName} images={images} max_id={maxId} message={message} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TwitterScreenName;
