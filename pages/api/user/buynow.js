import axios from 'axios';
export default async function handler(req, res) {
  const {
    query: { order_id },
    body: { id, number, token },
    headers,
  } = req;
  if (
    number != '' &&
    token != '' &&
    headers.token === `${process.env.NEXT_PUBLIC_API_TOKEN}`
  ) {
    const { status, statusText, data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/product/buy/now/old/listed/product?order_id=${order_id}&phone=${number}&client_id=${id}`,
      {
        headers: {
          token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
          'User-Agent': `${headers['user-agent']}`,
          'Access-Token': token,
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
