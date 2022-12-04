import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../../actions';
export default withIronSessionApiRoute(function userRoute(req, res) {
  const { session, headers } = req;
  const user = session.user;
  if (
    user &&
    user != '' &&
    headers.token === `${process.env.NEXT_PUBLIC_API_TOKEN}`
  ) {
    return res.status(200).json(user);
  } else {
    return res.status(200).json(false);
  }
}, ironOptions);
