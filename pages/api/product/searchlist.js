import axios from 'axios';

export default async function handler(req, res) {
  const { method, headers } = req;
  if (headers.token === `${process.env.NEXT_PUBLIC_API_TOKEN}`) {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/get/popular/product/by/search/rank`,
      {
        headers: {
          token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
        },
      },
    );
    if (response?.status === 200 && response?.statusText === 'OK') {
      return res.status(200).json(response?.data.keywords);
    }
  } else {
    res.status(400).json('data not found');
  }
}
