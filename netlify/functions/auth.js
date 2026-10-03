exports.handler = async () => {
  const CLIENT_ID = 'Ov23liuhqmZe9wTFsEaM';
  return {
    statusCode: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user`,
    },
    body: '',
  };
};
