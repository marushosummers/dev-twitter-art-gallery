import React from "react";
import ImageBlock from "./ImageBlock"
import {ImageItem, ImageList} from "./ImageView"

const ImageCol: React.FC<ImageList> = ({ images }) => {
  return (
    <div className="flex flex-wrap flex-col ">
      {images.map((image: ImageItem, index: number) => {
        return (
          <div key={`i${index}`} className="flex">
            <ImageBlock image={image} />
          </div>
        );
      })}
    </div>
  );
};

export default ImageCol;

