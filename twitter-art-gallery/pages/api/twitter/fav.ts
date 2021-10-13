import type { NextApiRequest, NextApiResponse } from 'next'
import TwitterApi, { TweetV1 } from "twitter-api-v2";
import { FavoriteImage } from '../../../domain/favarite-image';
import errorHandler from '../../../helpers/api/errorHandler';

const token = process.env.APP_USER_TOKEN ?? "";

const twitterClient = new TwitterApi(token);
const client = twitterClient.readOnly;

const controller = async (request: NextApiRequest, response: NextApiResponse) => {
  const params = { name: request.query.name, max_id: request.query.max_id };

  // TODO: エラーハンドリング
  console.log(params);

  try{
    const favoliteImages = await getFavoliteTweets(params)
    response.json({
        max_id: getMaxId(favoliteImages),
        images: favoliteImages,
    })
  } catch (error) {
    console.log(error)
    errorHandler(error, response);
  }
};

const getFavoliteTweets = async (params: { name: string | string[], max_id: string | string[] }): Promise<FavoriteImage[]> => {
  if (typeof params.name === "string" && params.max_id) {
    const likedTweets = await client.v1.get('favorites/list.json', { screen_name: params.name, max_id: params.max_id, count: 100 });
    return extractImages(likedTweets)
  } else if (typeof params.name === "string") {
    const likedTweets = await client.v1.get('favorites/list.json', { screen_name: params.name, count: 100 });
    return extractImages(likedTweets)
  }
};

const extractImages = (tweets: any): FavoriteImage[] => {

  const images: FavoriteImage[] = tweets.map((tweet) => {
    if (tweet.entities.media) {
      if (tweet.entities.media[0].type == "photo") {
        if (!tweet.entities.media[0].media_url_https.includes("video_thumb")) {
          // console.log(tweet.entities.media[0])
          return new FavoriteImage({
            id: tweet.id,
            url: tweet.entities.media[0].media_url_https,
            source: tweet.entities.media[0].expanded_url,
            height: tweet.entities.media[0].sizes.medium.h,
            width: tweet.entities.media[0].sizes.medium.w,
          })
        }
      }
    }
  });

  return images.filter(Boolean);
};

const getMaxId = (favolitImages: FavoriteImage[]): number => {
  const maxImage = favolitImages.reduce((prev, current) => ((prev.id < current.id) ? prev : current));
  return maxImage.id - 1000
};

export default controller;
