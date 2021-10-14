import type { NextPage } from 'next'
import React from "react";
import { useRouter } from "next/router";
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import InfiniteScroll from 'react-infinite-scroller';

import { HttpError } from '../../helpers/error';
import ImageView from "../../components/ImageView";
import Layout from '../../components/layout'
import Header from "../../components/Header";
import UserIcon from "../../components/UserIcon";
import PageTransition from "../../components/PageTransition";
import Loading from "../../components/Loading";
import ErrorMessage from '../../components/ErrorMessage';
import LoadingItem from '../../components/LoadingItem';

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

const TwitterScreenName: NextPage  = () => {
  const router = useRouter();
  const { screen_name } = router.query;
  const name: string = typeof screen_name === "string" ? screen_name : "";

  const fetcher = async (url) => {
    const res = await fetch(url)
    if (res && !res.ok) throw new HttpError({ status: res.status, message: "" });
    return res.json()
  }
  const userPath = (name: string): string => {
    return `/api/twitter/user?name=${name}`
  }
  const favPath = (pageIndex, previousPageData, name) => {
    if (pageIndex === 0) return `/api/twitter/fav?name=${name}` // first data
    if (previousPageData && !previousPageData.images) return null // end of data
    if (!previousPageData.max_id) return null // invalid request
    return `/api/twitter/fav?name=${name}&max_id=${previousPageData.max_id}`
  }

  const { data: userData, error: userError } = useSWR(userPath(name), fetcher, { shouldRetryOnError: false })
  const fav = useSWRInfinite(
    (...args) => favPath(...args, name),
    fetcher,
    { shouldRetryOnError: false }
  )

  if (userError && userError.status === 404) { return <ErrorMessage name={name} message={"ユーザーが見つかりませんでした"} /> }
  if (userError) { return <ErrorMessage name={name} message={"ユーザー取得に失敗しました"} /> }
  if (!userData) { return <Loading name={name} /> }
  if (!userData.user) { return <ErrorMessage name={name} message={"ユーザデータが取得できません"} /> }
  if (userData.user.protected) { return <ErrorMessage name={name} message={"非公開ユーザーです"} /> }

  if (fav.error && fav.error.status === 404) { return <ErrorMessage name={name} message={"画像が見つかりませんでした"} /> }
  if (fav.error) { return <ErrorMessage name={name} message={"API制限中です。しばらく待ってからアクセスしてみてください"} /> }
  if (!fav.data) { return <Loading name={name} /> }

  const isLoading = fav.size !== fav.data.length;
  const loadFav = () => {
    if (!isLoading) {
      fav.setSize(fav.size + 1);
    }
  };

  const icon = userData.user?.image ?? "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
  const images = fav.data.reduce((pre, cur) => pre.concat(cur?.images), []) ?? []


  return (
    <Layout>
      <Header name={name} />
      <PageTransition key={name}>
        <div className="min-h-screen">
          <div className="container mx-auto" >
            <UserIcon name={name} icon={icon} />
            <InfiniteScroll
              pageStart={0}
              loadMore={loadFav}
              hasMore={true}
            >
              <div className="flex justify-center" >
                <ImageView screen_name={name} images={images} />
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </PageTransition>
      </Layout>

  );
};

export default TwitterScreenName;
