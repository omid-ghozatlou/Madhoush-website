const http = require('http');
const https = require('https');
const url = require('url');

const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);

  if (parsed.pathname === '/api/auth') {
    res.writeHead(302, {
      Location: `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user`,
    });
    res.end();
  } else if (parsed.pathname === '/api/callback') {
    const code = parsed.query.code;
    const body = JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
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

    const ghReq = https.request(options, ghRes => {
      let data = '';
      ghRes.on('data', chunk => (data += chunk));
      ghRes.on('end', () => {
        const result = JSON.parse(data);
        const token = result.access_token || '';
        const message = `authorization:github:success:${JSON.stringify({token, provider: 'github'})}`;

        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(`<!DOCTYPE html><html><body><script>
          (function() {
            function receive(e) {
              window.opener.postMessage(${JSON.stringify(message)}, e.origin);
            }
            window.addEventListener("message", receive, false);
            window.opener.postMessage("authorizing:github", "*");
          })();
        </script></body></html>`);
      });
    });

    ghReq.on('error', err => {
      res.writeHead(500);
      res.end('OAuth error: ' + err.message);
    });

    ghReq.write(body);
    ghReq.end();
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('OAuth proxy running on port 3000');
});
