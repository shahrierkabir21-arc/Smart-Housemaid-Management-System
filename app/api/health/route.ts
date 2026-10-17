import { NextResponse } from 'next/server';
import pool from '@/utils/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await pool.query('SELECT 1');
    return NextResponse.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('Database health check failed:', error);
    return NextResponse.json(
      { status: 'error', message: 'Database connection unavailable' },
      { status: 503 },
    );
  }
}
