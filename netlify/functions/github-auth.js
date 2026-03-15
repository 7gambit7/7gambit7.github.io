exports.handler = async function (event) {
    const code = event.queryStringParameters.code;
    if (!code) return { statusCode: 400, body: 'No code' };

    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code
        })
    });

    const data = await response.json();
    const token = data.access_token;

    return {
        statusCode: 302,
        headers: {
            Location: `https://roiyaru.github.io?github_token=${token}`
        }
    };
};