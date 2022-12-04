import axios from 'axios';

export default async (req, res) => {
  const { method, body, headers } = req;
  if (body && body.phone != '') {
    const { status, statusText } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/get/otp`,
      {
        params: body,
        headers: {
          token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
          'User-Agent': `${headers['user-agent']}`,
        },
      },
    );
    if (status === 200 && statusText === 'OK') {
      return res.status(200).json('otp sented successfully');
    } else {
      return res.status(400).json('unauthorized');
    }
  }
  return res.status(400).json('unauthorized');
};
