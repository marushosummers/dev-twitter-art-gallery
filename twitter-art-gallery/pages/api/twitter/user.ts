import type { NextApiRequest, NextApiResponse } from 'next'
import TwitterApi from "twitter-api-v2";
import { User } from '../../../domain/user';
import errorHandler from '../../../helpers/api/errorHandler';

const token = process.env.APP_USER_TOKEN ?? "";

const twitterClient = new TwitterApi(token);
const client = twitterClient.readOnly;

const controller = async (request: NextApiRequest, response: NextApiResponse) => {
  const params = { name: request.query.name, max_id: request.query.max_id };
  const name = typeof params.name === "string" ? params.name : params.name[0]

  // TODO: エラーハンドリング
  // console.log(params);
  try {
    const user = await getUser(name)

    response.json({
        user: user,
    })
  } catch (error) {
    console.log("0000000000000000000000")
    console.log(error)
    errorHandler(error, response);
  }
};

const getUser = async (name: string): Promise<User> => {
  const user = await client.v1.get('users/show.json', { screen_name: name });
  // console.log(user)
  return extractUser(user)
};

const extractUser = (user: any): User => {
  return new User({
    id: user.id,
    name: user.screen_name,
    image: user.profile_image_url_https,
    favourites_count: user.favourites_count,
  }) 
};

export default controller;
