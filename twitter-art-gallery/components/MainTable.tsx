import React, { useEffect, useState } from "react";
import ImageList from './ImageList'
import Loading from "./Loading";

interface MainTableProps {
  screen_name: string;
  images: ImageItem[];
}

export interface ImageListProps {
    imageItems: ImageItem[];
}

export type ImageItem = {
  url: string;
  source: string;
  height: number;
  width: number;
};


const MainTable: React.FC<MainTableProps> = (props) => {
  return (
    <div className="">
      <ImageList imageItems={props.images} />
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
