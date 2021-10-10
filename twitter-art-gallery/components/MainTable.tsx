import React, { useEffect, useState } from "react";
import ImageList from './ImageList'


interface MainTableProps {
  screen_name: string;
  images: ImageListProps;
  message: string;
  max_id: number;
}

export interface ImageListProps {
    imageItems: ImageItem[];
}

export type ImageItem = {
    url: string;
    source: string;
};


const MainTable: React.FC<MainTableProps> = (props) => {

  return (
    <div>
      <ImageList imageItems={props.images} />
      <div className="box h-64 text-center m-5 p-4 ...">
          {props.message}
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
