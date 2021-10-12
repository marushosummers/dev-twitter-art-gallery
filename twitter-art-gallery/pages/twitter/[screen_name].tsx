import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from 'swr'

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

  const user = useSWR(userPath(name), fetcher)
  const fav = useSWR(`/api/twitter/fav?name=${name}`, fetcher)

  if (user.error || fav.error) return <div>Error</div>
  if (!user.data || !fav.data) {
    return (
      <Layout>
        <Header name={name} />
        <Loading />
      </Layout>
    );
  }

  const screenName = user.data.body.user.name ?? ""
  const icon = user.data.body.user.image ?? "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
  const images = fav.data.body.images ?? []
  const maxId = user.data.body.max_id ?? 0

  const getKey = (pageIndex, previousPageData) => {
    // 最後に到達した
    if (previousPageData && !previousPageData.data) return null

    // 最初のページでは、`previousPageData` がありません
    if (pageIndex === 0) return `/users?limit=10`

    // API のエンドポイントにカーソルを追加します
    return `/users?cursor=${previousPageData.nextCursor}&limit=10`
  }

  return (
    <Layout>
      <Header name={screenName} />
      <PageTransition key={screenName}>
        <div className="min-h-screen" >
          <div className="container mx-auto" >
            <UserIcon name={screenName} icon={icon} />
            <div className="flex justify-center" >
                <MainTable screen_name={screenName} images={images} max_id={maxId} message={message} />
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default TwitterScreenName;
