import React from "react";
import Image from 'next/image'
import {ImageItem, ImageListProps} from "./MainTable"

const ImageList: React.FC<ImageListProps> = ({ imageItems }) => {
  return (
    <div className="flex flex-col">
      {imageItems.map((image: ImageItem, index: number) => {
        return (
          <div key={index}>
            <div className="nm-flat-gray-100 p-4 rounded-md my-1 mx-5">
              <a href={image.source} target="_blank" rel="noopener noreferrer">
                <div>
                  <Image
                    src={image.url}
                    width={600}
                    height={600 * image.height/image.width}
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

export default ImageList;

