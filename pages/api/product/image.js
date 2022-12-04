import axios from 'axios';

export default async function handler(req, res) {
  const {
    query: { key, page },
    method,
    headers,
  } = req;
  if (
    key != undefined &&
    key != '' &&
    headers.token === `${process.env.NEXT_PUBLIC_API_TOKEN}`
  ) {
    const response = await axios.get(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/get/product/by/image/search/history?image_url=${key}&page=${
        page ? page : ''
      }`,
      {
        headers: {
          token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
        },
      },
    );
    if (response?.status === 200 && response?.statusText === 'OK') {
      return res.status(200).json(response?.data);
    }
  } else {
    res.status(400).json('data not found');
  }
}
