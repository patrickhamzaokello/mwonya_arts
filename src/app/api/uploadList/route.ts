import { NextResponse } from 'next/server';
import { db } from "@/lib/db";


export async function GET() {
    // get mediauploads and order by desc
  try {
    const uploads = await db.mediaUpload.findMany({
      include: {
        mediaDescriptions: true
      },orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(uploads);
  } catch (error) {
    console.error('Error fetching media uploads:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
