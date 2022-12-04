import axios from 'axios';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../../actions';

export default withIronSessionApiRoute(async function logoutRoute(
  req,
  res,
  session,
) {
  const { method, body, headers } = req;
  if (method === 'POST') {
    const { id, number, token } = body;
    const { status, data, statusText } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/session/log/out?phone=${number}&client_id=${id}`,
      {
        headers: {
          token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
          'Access-Token': token,
          'User-Agent': `${headers['user-agent']}`,
        },
      },
    );
    if (status === 200 && statusText === 'OK') {
      req.session.destroy();
      return res.status(200).json(data);
    } else {
      return res.status(400).json(statusText);
    }
  }
},
ironOptions);
