import TwitterApi from "twitter-api-v2";

const token = process.env.APP_USER_TOKEN ?? "";

const client = new TwitterApi(token);

const image = async () => {
  const params = { screen_name: "marusho_summers", count: 1 };
  await client
    .get("favorites/list", params)
    .then((tweet) => {
      console.log(tweet);
    })
    .catch((error) => {
      throw error;
    });
  return {
    statusCode: 200,
    body: "success!"
  };
};

export default image;
