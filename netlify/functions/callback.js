const https = require('https');

exports.handler = async event => {
  const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
  const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
  const code = event.queryStringParameters && event.queryStringParameters.code;

  const token = await exchangeCode(CLIENT_ID, CLIENT_SECRET, code);
  const message = `authorization:github:success:${JSON.stringify({token, provider: 'github'})}`;

  return {
    statusCode: 200,
    headers: {'Content-Type': 'text/html; charset=utf-8'},
    body: `<!DOCTYPE html><html><body><script>
      (function() {
        function receive(e) {
          window.opener.postMessage(${JSON.stringify(message)}, e.origin);
        }
        window.addEventListener("message", receive, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script></body></html>`,
  };
};

function exchangeCode(clientId, clientSecret, code) {
  return new Promise(resolve => {
    const body = JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    });
    const options = {
      hostname: 'github.com',
      path: '/login/oauth/access_token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data).access_token || '');
        } catch {
          resolve('');
        }
      });
    });
    req.on('error', () => resolve(''));
    req.setTimeout(10000, () => {
      req.destroy();
      resolve('');
    });
    req.write(body);
    req.end();
  });
}
