import React from "react";
import Image from 'next/image'
import {ImageItem, ImageList} from "./ImageView"

const ImageCol: React.FC<ImageList> = ({ images }) => {
  return (
    <div className="flex flex-wrap flex-col ">
      {images.map((image: ImageItem, index: number) => {
        return (
          <div key={`i${index}`} className="flex">
            <div className="nm-flat-gray-100 p-2 rounded-md my-2 mx-2">
              <a href={image.source} target="_blank" rel="noopener noreferrer">
                <div>
                  <Image
                    src={image.url}
                    width={150}
                    height={150 * image.height/image.width}
                    className="rounded-md"
                  />
                </div>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageCol;

