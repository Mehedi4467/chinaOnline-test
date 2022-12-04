import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { ironOptions } from './actions';

export async function middleware(request) {
  const res = NextResponse.next();
  const session = await getIronSession(request, res, ironOptions);
  const { user } = session;
  // Getting cookies from the request
  // console.log(user);
  if (!user) {
    return NextResponse.rewrite(new URL('/login', request.url));
  }
  if (user && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.rewrite(new URL('/dashboard', request.url));
  }
  if (
    request.nextUrl.pathname.startsWith('/cart') ||
    request.nextUrl.pathname.startsWith('/payment')
  ) {
    if (user) {
      return NextResponse.rewrite(new URL('/dashboard', request.url));
    } else {
      return NextResponse.rewrite(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: [
    '/cart',
    '/login',
    '/checkout/:path*',
    '/dashboard/:path*',
    '/wishlist',
    '/payment/:path*',
  ],
};
