import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/collections(.*)',
    '/products(.*)',
    '/api/collections(.*)',
    '/api/products(.*)',
    '/customer(.*)',
    '/sign-in(.*)',
    '/sign-up(.*)',
  ],
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 