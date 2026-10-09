import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { ApiError, parseId, requireRecord, requireUser, respondError } from '@/lib/api';
import { reviewStatusSchema } from '@/utils/schemas';
import { getPusherServer } from '@/lib/pusher-server';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireUser(['admin']);
    const parsed = reviewStatusSchema.safeParse(await request.json());
    if (!parsed.success) throw new ApiError('Invalid review status');
    const result = await pool.query('UPDATE applications SET status = $1 WHERE id = $2 RETURNING *', [parsed.data.status, parseId(params.id)]);
    const application = requireRecord(result.rows[0], 'Application');
    const pusher = getPusherServer();
    if (pusher) {
      try {
        await pusher.trigger(`private-user-${application.maid_id}`, 'status-update', {
          message: `Your job application was ${parsed.data.status.toLowerCase()}.`,
        });
      } catch (error) { console.error('Notification delivery failed:', error); }
    }
    return NextResponse.json(application);
  } catch (error) { return respondError(error); }
}
