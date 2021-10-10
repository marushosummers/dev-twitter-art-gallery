import React, { useState } from "react";
import axios from "axios";
import InputForm from "./InputForm";
import ImageList from './ImageList'

interface typeImages {
    images: ImageItem[];
    max_id: string;
};

interface MainTableProps {
  screen_name?: string;
  images: ImageListProps;
  message?: string;
  max_id?: number;
}

export interface ImageListProps {
    imageItems: ImageItem[];
}

export type ImageItem = {
    url: string;
    source: string;
};


const MainTable: React.FC<MainTableProps> = (props) => {

  const [images, setImages] = useState([])
  const [screenName, setScreenName] = useState("")
  const [message, setMessage] = useState("")
  const [maxId, setMaxId] = useState("")

    const handleSubmit = (name: string) => {
        if (name !== screenName) {
            setScreenName(name);
        }
        setMessage("loading...");
        getiine(name)
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

  const twitterAPI = async (screen_name: string, max_id: string): Promise<typeImages> => {
    let endpoint = `http://${process.env.ENDPOINT}/api/twitter?name=${screen_name}&max_id=${max_id}`
    console.log(endpoint)

    try {
      console.log('hello')
      const response: any = await axios.get(endpoint);
      return response.data
    } catch (error) {
      console.log(error)
      throw (Error)
    }
  }

    return (
        <div>
            <InputForm onSubmit={(screen_name: string) => handleSubmit(screen_name)} />
            <ImageList imageItems={images} />
            <div className="box h-64 text-center m-5 p-4 ...">
                {message}
            </div>
        </div>
    );
}
export default MainTable;

// 無限スクロール
// componentDidMount() {
//         let queue: NodeJS.Timeout;
//         window.addEventListener("scroll", () => {
//             clearTimeout(queue);
//             queue = setTimeout(() => {
//                 const scroll_Y = document.documentElement.scrollTop + window.innerHeight;
//                 const offsetHeight = document.documentElement.offsetHeight;
//                 if (
//                     offsetHeight - scroll_Y <= 1000 &&
//                     this.state.message !== "loading..." &&
//                     offsetHeight > 1500
//                 ) {
//                     this.setState({ message: "loading..." });
//                     this.getiine(this.state.screen_name);
//                 }
//             }, 500);
//         });
// }
