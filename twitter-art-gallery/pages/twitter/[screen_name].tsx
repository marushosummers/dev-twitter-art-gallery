import { useRouter } from "next/router";
import MainTable from "../../components/MainTable";
import Layout from '../../components/layout'
import React, { useEffect, useState } from "react";
import axios from "axios";
import InputForm from "../../components/InputForm";

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
  const [maxId, setMaxId] = useState(0)

  useEffect(() => {
    if (!router.isReady) return;
    getiine(name)
  }, [router.isReady])

  const handleSubmit = (name: string) => {
    if (name !== screenName) {
      setScreenName(name);
      setMessage("loading...");
      getiine(name)
    }
  }

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
    setImages(images.concat(results.images))

    if (results.images.length === 0) {
      setMessage("いいねした画像がありませんでした");
    }
    setMessage("");
  };

  const twitterAPI = async (screen_name: string, max_id: number): Promise<typeImages> => {
    let endpoint = `http://${process.env.ENDPOINT}/api/twitter?name=${screen_name}`
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

  return (
    <Layout>
      <div className="bg-blue-50 min-h-screen" >
        <div className="container mx-auto" >
          <header className="flex justify-center items-center text-3xl h-32 mx-5" >
            Show your favorite arts in Twitter
          </header>
          <div className="flex justify-center" >
            <div>
              <InputForm onSubmit={(screen_name: string) => handleSubmit(screen_name)} />
              <div className="text-center">
                {screenName}
              </div>
              <MainTable screen_name={screenName} images={images} max_id={maxId} message={message} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TwitterScreenName;
