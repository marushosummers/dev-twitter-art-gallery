import React from "react";
import Image from 'next/image'

type ImageItem = {
  url: string;
  source: string;
};

interface ImageListProps {
  imageItems: ImageItem[];
}

const ImageList: React.FC<ImageListProps> = ({ imageItems }) => {
  return (
    <div className="flex flex-col">
      {imageItems.map((image: ImageItem, index: number) => {
        return (
          <div key={index}>
            <div className="m-1 max-w-xs">
              <a href={image.source} target="_blank" rel="noopener noreferrer">
                <Image src={image.url} height={600} width={300} />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageList;

