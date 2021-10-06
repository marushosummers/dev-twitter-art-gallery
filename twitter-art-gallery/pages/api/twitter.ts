import type { NextApiRequest, NextApiResponse } from 'next'
import TwitterApi, { TweetV1 } from "twitter-api-v2";

const token = process.env.APP_USER_TOKEN ?? "";

const twitterClient = new TwitterApi(token);
const client = twitterClient.readOnly;

const getFavolite = async (request: NextApiRequest, response: NextApiResponse) => {
  const params = { name: request.query.name };
  const result = await getFavoliteTweets(params)
  console.log(result)

  response.json({
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,GET",
    },
    body: JSON.stringify(result),
  })
};

const getFavoliteTweets = async (params: { name: string | string[], }) => {
  if (typeof params.name === "string") {
    const likedTweets = await client.v1.get('favorites/list.json', { screen_name: params.name })
    return extractImages(likedTweets)
  }
};

const extractImages = function (tweets: any) {
  var images = { url: [], source: [], height: [], max_id: 0 };
  tweets.forEach((tweet) => {
    if (tweet.entities.media) {
      if (tweet.entities.media[0].type == "photo") {
        if (!tweet.entities.media[0].media_url_https.includes("video_thumb")) {
          images.url.push(tweet.entities.media[0].media_url_https);
          images.source.push(tweet.entities.media[0].expanded_url);
          const w = tweet.entities.media[0].sizes.medium.w;
          const h = tweet.entities.media[0].sizes.medium.h;
          images.height.push(h / w);
        }
      }
    }
  });
  const max_id = tweets[tweets.length - 1].id - 10000;
  images.max_id = max_id;
  return images;
};

export default getFavolite;
