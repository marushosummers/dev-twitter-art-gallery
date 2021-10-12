import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'

import ImageView from "../../components/ImageView";
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


  const fetcher = (url) => fetch(url).then((res) => res.json())
  const userPath = (name: string): string => {
    return `/api/twitter/user?name=${name}`
  }
  const favPath = (pageIndex, previousPageData, name) => {
    if (previousPageData && !previousPageData.images) return null // end of data
    if (pageIndex === 0) return `/api/twitter/fav?name=${name}` // first data
    return `/api/twitter/fav?name=${name}&max_id=${previousPageData.max_id}`
  }

  const user = useSWR(userPath(name), fetcher)
  const fav = useSWRInfinite(
    (...args) => favPath(...args, name),
    fetcher
  )

  if (user.error || fav.error) {
    <Layout>
      <Header name={name} />
      <Loading />
    </Layout>
  }
  if (!user.data || !fav.data) {
    return (
      <Layout>
        <Header name={name} />
        <Loading />
      </Layout>
    );
  }

  const icon = user.data.user.image ?? "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
  const images = fav.data.reduce((pre, cur) => pre.concat(cur.images), []) ?? []

  return (
    <Layout>
      <Header name={name} />
      <PageTransition key={name}>
        <div className="min-h-screen" >
          <div className="container mx-auto" >
            <UserIcon name={name} icon={icon} />
            <div className="flex justify-center" >
              <ImageView screen_name={name} images={images} />
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
