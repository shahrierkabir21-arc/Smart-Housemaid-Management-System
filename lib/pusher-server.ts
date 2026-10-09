import Pusher from 'pusher';

export function getPusherServer(): Pusher | null {
  const { PUSHER_APP_ID, NEXT_PUBLIC_PUSHER_KEY, PUSHER_SECRET, NEXT_PUBLIC_PUSHER_CLUSTER } = process.env;
  if (!PUSHER_APP_ID || !NEXT_PUBLIC_PUSHER_KEY || !PUSHER_SECRET) return null;
  return new Pusher({ appId: PUSHER_APP_ID, key: NEXT_PUBLIC_PUSHER_KEY, secret: PUSHER_SECRET, cluster: NEXT_PUBLIC_PUSHER_CLUSTER || 'ap1', useTLS: true });
}
