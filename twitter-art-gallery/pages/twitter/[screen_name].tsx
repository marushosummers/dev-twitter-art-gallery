import { useRouter } from "next/router";
import MainTable from "../../components/MainTable";
import Layout from '../../components/layout'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";

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
  const [message, setMessage] = useState("loading...")
  const [loading, setLoading] = useState(true)
  const [maxId, setMaxId] = useState(0)

  useEffect(() => {
    if (!router.isReady) return;
    setScreenName(name)
    getiine(name)
  }, [router.isReady, name])

  const getiine = async (name: string): Promise<void> => {
    try {
      const response: any = await twitterAPI(name, maxId)
      console.log(response.body)
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

  const twitterAPI = async (screen_name: string, max_id: number): Promise<typeImages> => {
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
        <Header />
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
      <Header />
      <div className="min-h-screen" >
        <div className="container mx-auto" >
          <div className="flex justify-center items-center text-3xl h-32 mx-5" >
            <div className="nm-flat-gray-100 p-3 rounded-xl" >
              @{screenName}
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
