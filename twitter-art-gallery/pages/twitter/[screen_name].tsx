import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'

import MainTable from "../../components/MainTable";
import Layout from '../../components/layout'
import Header from "../../components/Header";
import UserIcon from "../../components/UserIcon";
import PageTransition from "../../components/PageTransition";
import Loading from "../../components/Loading";

interface typeUser {
  id: number
  name: string
  image: string
  favourites_count: number
};

interface typeImages {
  images: ImageItem[];
  max_id: string;
};

export interface ImageListProps {
  imageItems: ImageItem[];
}

export type ImageItem = {
  url: string;
  source: string;
};

const TwitterScreenName = () => {
  const router = useRouter();
  const { screen_name } = router.query;
  const name: string = typeof screen_name === "string" ? screen_name : "";

  const [message, setMessage] = useState("loading...")

  const fetcher = (url) => fetch(url).then((res) => res.json())
  const userPath = (name: string): string => {
    return `/api/twitter/user?name=${name}`
  }
  const favPath = (pageIndex, previousPageData, name) => {
    if (previousPageData && !previousPageData.images) return null
    if (pageIndex === 0) return `/api/twitter/fav?name=${name}`
    // API のエンドポイントにカーソルを追加します
    return `/api/twitter/fav?name=${name}&max_id=${previousPageData.max_id}`
  }

  const user = useSWR(userPath(name), fetcher)
  const fav = useSWRInfinite(
    (...args) => favPath(...args, name),
    fetcher
  )

  if (user.error || fav.error) return <div>Error</div>
  if (!user.data || !fav.data) {
    return (
      <Layout>
        <Header name={name} />
        <Loading />
      </Layout>
    );
  }

  const screenName = user.data.user.name ?? ""
  const icon = user.data.user.image ?? "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
  const images = fav.data.reduce((pre, cur) => pre.concat(cur.images), []) ?? []

  return (
    <Layout>
      <Header name={screenName} />
      <PageTransition key={screenName}>
        <div className="min-h-screen" >
          <div className="container mx-auto" >
            <UserIcon name={screenName} icon={icon} />
              <div className="flex justify-center" >
                <MainTable screen_name={screenName} images={images} />
              </div>
            <div className="flex justify-center" >
              <button onClick={() => fav.setSize(fav.size + 1)} className="nm-flat-gray-100 rounded-xl text-center m-12 p-4">Load</button>
              </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default TwitterScreenName;
