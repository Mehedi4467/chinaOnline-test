import axios from 'axios';

export default async function handler(req, res) {
  const {
    query: { limit },
    headers,
  } = req;
  if (limit != '' && headers.token === `${process.env.NEXT_PUBLIC_API_TOKEN}`) {
    const { status, data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/more/to/love?limit=${limit}`,
      {
        headers: {
          token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
        },
      },
    );
    if (status === 200) {
      return res.status(200).json(data);
    }
  } else {
    res.status(400).json('data not found');
  }
}
