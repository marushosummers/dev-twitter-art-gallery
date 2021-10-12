import React from 'react';
import { motion } from "framer-motion";

export default function PageTransition({ key, children }) {
  return (
    <motion.div
      key={key}
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
    >
      {children}
    </motion.div>
  )
}
