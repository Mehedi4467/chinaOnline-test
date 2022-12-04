import axios from 'axios';

export default async function handler(req, res) {
  const {
    query: {
      key,
      discount_status,
      direction,
      page,
      max_price,
      min_price,
      sort,
    },
    method,
    headers,
  } = req;
  if (
    key != undefined &&
    key != '' &&
    headers.token === `${process.env.NEXT_PUBLIC_API_TOKEN}`
  ) {
    const { status, statusText, data } = await axios.get(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/get/product/list/search?search=${key}&discount_status=${
        discount_status ? discount_status : ''
      }&direction=${direction ? direction : ''}&sort=${
        sort ? sort : ''
      }&max_price=${max_price ? max_price : ''}&min_price=${
        min_price ? min_price : ''
      }&page=${page ? page : ''}`,
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
