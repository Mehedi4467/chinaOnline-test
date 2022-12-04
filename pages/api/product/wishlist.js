import axios from 'axios';

export default async function handler(req, res) {
  const {
    headers,
    query: { number, id, page, accessToken },
  } = req;
  if (headers.token === `${process.env.NEXT_PUBLIC_API_TOKEN}`) {
    const { status, data, statusText } = await axios.get(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/user/dashboard/get/product/wishlist?phone=${number}&client_id=${id}&page=${
        page ? page : 1
      }`,
      {
        headers: {
          token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
          'Access-Token': accessToken,
          'User-Agent': `${headers['user-agent']}`,
        },
      },
    );
    if (status === 200 && statusText === 'OK') {
      return res.status(200).json(data);
    } else {
      return res.status(400).json('data not found');
    }
  } else {
    return res.status(400).json('data not found');
  }
}
