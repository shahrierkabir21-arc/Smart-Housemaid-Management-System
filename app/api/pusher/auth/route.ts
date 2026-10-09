import { NextResponse } from 'next/server';
import { ApiError, requireUser, respondError } from '@/lib/api';
import { getPusherServer } from '@/lib/pusher-server';

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const pusher = getPusherServer();
    if (!pusher) throw new ApiError('Notifications are unavailable', 503);
    const body = await request.formData();
    const socketId = body.get('socket_id');
    const channelName = body.get('channel_name');
    if (typeof socketId !== 'string' || !/^\d+\.\d+$/.test(socketId)) throw new ApiError('Invalid socket ID');
    if (channelName !== `private-user-${user.id}`) throw new ApiError('Not allowed', 403);
    return NextResponse.json(pusher.authorizeChannel(socketId, channelName));
  } catch (error) { return respondError(error); }
}
