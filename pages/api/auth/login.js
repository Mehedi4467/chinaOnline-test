import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../../actions';
import axios from 'axios';

export default withIronSessionApiRoute(loginRoute, ironOptions);
async function loginRoute(req, res) {
  const { method, body, headers } = req;
  const { phone, otp } = body;
  if (method === 'POST' && phone && otp) {
    // get user from database then:
    const { status, data, statusText } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/verify/otp?phone=${
        +88 + phone
      }&otp=${otp}`,
      {
        headers: {
          token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
          'User-Agent': `${headers['user-agent']}`,
        },
      }
    );
    if (status === 200 && statusText === 'OK') {
      const user = {
        id: data?.client_id,
        token: data?.access_token,
        name: data?.user_name ? data?.user_name : '',
        number: data?.main_number,
      };
      req.session.user = user;
      await req.session.save();
      return res.status(200).json(user);
    } else {
      return res.status(400).json('unauthorized');
    }
  }
  return res.status(400).json('unauthorized');
}
