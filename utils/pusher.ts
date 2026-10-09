import Pusher from 'pusher-js';

export function getPusherClient(): Pusher | null {
  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  if (!key) return null;
  return new Pusher(key, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap1',
    channelAuthorization: { endpoint: '/api/pusher/auth', transport: 'ajax' },
  });
}
