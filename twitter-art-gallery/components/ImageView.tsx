import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "../hooks/getWidth";
import ImageCol from './ImageCol'

interface ImageViewProps {
  screen_name: string;
  images: ImageItem[];
}

interface ImageColumns {
  images: ImageList[][];
  minRatios: number[];
}

export interface ImageList {
    images: ImageItem[];
}

export type ImageItem = {
  url: string;
  source: string;
  height: number;
  width: number;
};


const ImageView: React.FC<ImageViewProps> = (props) => {

  const { width } = useWindowDimensions();
  const colNum = width > 600 ? Math.floor(width / 250) : 2;

  const divideToCol = (colNum, images) => {
    const initialImageColmns: ImageColumns = {
      images: Array(colNum).fill(null).map(e => []),
      minRatios: Array(colNum).fill(0)
    }
    
    const imageColmns = images.reduce((imageColumns, cur) => {
      const index = getMinIndex(imageColumns.minRatios);
      imageColumns.minRatios[index] += cur.height / cur.width;
      imageColumns.images[index].push(cur);

      return imageColumns
    }, initialImageColmns);
  
    return imageColmns;
  }

  function getMinIndex(numbers: number[]) {
    return numbers.indexOf(Math.min(...numbers))
  }

  const imageColList = divideToCol(colNum, props.images)

  return (
    <div className="flex flex-wrap justify-center w-full">
      <div className="flex">
        {imageColList.images.map((images, index) => {
          return (
            <div key={`icol${index}`}>
              <ImageCol images={images} />
            </div>
          )
        })}
      </div>
    </div>
  );
}
export default ImageView;

