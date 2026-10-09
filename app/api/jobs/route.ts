import { NextResponse } from 'next/server';
import pool from '@/utils/db';
import { ApiError, requireUser, respondError } from '@/lib/api';
import { jobSchema } from '@/utils/schemas';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await pool.query("SELECT id, employer_id, title, location, salary, description, status FROM jobs WHERE status = 'Approved' ORDER BY id DESC");
    return NextResponse.json(result.rows);
  } catch (error) { return respondError(error); }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser(['employer']);
    const parsed = jobSchema.safeParse(await request.json());
    if (!parsed.success) throw new ApiError(parsed.error.issues[0].message);
    const { title, location, salary, description } = parsed.data;
    const result = await pool.query(
      "INSERT INTO jobs (employer_id, title, location, salary, description, status) VALUES ($1, $2, $3, $4, $5, 'Pending') RETURNING *",
      [user.id, title, location, salary, description]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) { return respondError(error); }
}
