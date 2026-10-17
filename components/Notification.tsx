'use client';

import { useEffect, useState } from 'react';
import { getPusherClient } from '@/utils/pusher';
import { Icon } from '@/components/ui/Icon';

export default function Notification({ userId }: { userId: number }) {
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (!userId) return;
    const pusher = getPusherClient();
    if (!pusher) return;
    const name = `private-user-${userId}`;
    const channel = pusher.subscribe(name);
    channel.bind('status-update', (data: { message?: string }) => setMessage(data.message || 'Your application status changed'));
    return () => { pusher.unsubscribe(name); pusher.disconnect(); };
  }, [userId]);
  if (!message) return null;
  return <div className="form-message form-message-success" role="status"><Icon name="bell" size={20}/><span>{message}</span><button className="icon-button ml-auto" aria-label="Dismiss notification" onClick={() => setMessage('')}><Icon name="x" size={17}/></button></div>;
}
