import axios from 'axios';

export default async function handler(req, res) {
  const {
    query: { name },
    method,
    headers,
  } = req;
  if (
    name != undefined &&
    name != '' &&
    headers.token === `${process.env.NEXT_PUBLIC_API_TOKEN}`
  ) {
    const searchName = encodeURI(name);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/get/front/page/product/list?search=${searchName}`,
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
