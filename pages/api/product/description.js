import axios from 'axios';

export default async function handler(req, res) {
  const {
    query: { productId },
    headers,
  } = req;
  if (
    productId != undefined &&
    productId != '' &&
    headers.token === `${process.env.NEXT_PUBLIC_API_TOKEN}`
  ) {
    const { status, statusText, data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/product/details/view/description?product_id=${productId}`,
      {
        headers: {
          token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
        },
      },
    );
    if (status === 200 && statusText === 'OK') {
      return res.status(200).json(data);
    } else {
      res.status(400).json('data not found');
    }
  } else {
    res.status(400).json('data not found');
  }
}
