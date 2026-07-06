exports.handler = async () => {
  const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
  return {
    statusCode: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user`,
    },
    body: '',
  };
};
