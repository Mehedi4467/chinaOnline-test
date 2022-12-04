import axios from 'axios';
export default async function handler(req, res) {
  const { body, headers } = req;
  if (headers.token === `${process.env.NEXT_PUBLIC_API_TOKEN}`) {
    const { status, statusText, data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/product/user/shipping/address/checkout`,
      body,
      {
        headers: {
          token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
          'User-Agent': `${headers['user-agent']}`,
          'Access-Token': `${headers['access-token']}`,
        },
      },
    );
    if (status === 200 && statusText === 'OK') {
      return res.status(200).json(data);
    } else {
      res.status(400).json(data);
    }
  } else {
    res.status(400).json('data not found');
  }
}
