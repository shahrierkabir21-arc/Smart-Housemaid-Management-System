import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { ApiError, requireUser, respondError } from '@/lib/api';

export async function POST(request: Request) {
  try {
    const user = await requireUser(['housemaid']);
    const { jobId } = await request.json();
    const id = Number(jobId);
    if (!Number.isSafeInteger(id) || id <= 0) throw new ApiError('Invalid job ID');
    const job = await pool.query("SELECT id FROM jobs WHERE id = $1 AND status = 'Approved'", [id]);
    if (!job.rowCount) throw new ApiError('Job is not available', 404);
    const result = await pool.query(
      "INSERT INTO applications (job_id, maid_id, status) SELECT $1, $2, 'Pending' WHERE NOT EXISTS (SELECT 1 FROM applications WHERE job_id = $1 AND maid_id = $2) RETURNING *",
      [id, user.id]
    );
    if (!result.rows[0]) throw new ApiError('You have already applied to this job', 409);
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    if ((error as { code?: string }).code === '23505') return NextResponse.json({ message: 'You already applied' }, { status: 409 });
    return respondError(error);
  }
}
