import '../styles/globals.css'
import { motion } from "framer-motion";
import Head from 'next/head';

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <title>Garoo</title>
      </Head>
      <motion.div
        key={router.route}
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
        <Component {...pageProps} />
      </motion.div>
    </>
  );
}

export default MyApp
