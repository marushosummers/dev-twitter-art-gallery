import React from "react";
import Image from 'next/image'
import { ImageItem } from "./ImageView"
import { motion, useAnimation } from "framer-motion";

interface ImageBlockProps {
  image: ImageItem;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ image }) => {
  const animationVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }
  const animationControls = useAnimation();

  return (
    <motion.div
      initial={"hidden"}
      animate={animationControls}
      variants={animationVariants}
      transition={{ ease: "easeOut", duration: 1 }}
    >
      <a href={image.source} target="_blank" rel="noopener noreferrer">
        <div className="nm-flat-gray-100  flex justify-center items-center p-0 rounded-md my-2 mx-2">
          <Image
            src={image.url}
            width={150}
            height={150 * image.height / image.width}
            className="rounded-md"
            onLoadingComplete={() => animationControls.start("visible")}
            unoptimized={true}
          />
        </div>
      </a>
    </motion.div>
  );
}

export default ImageBlock;
