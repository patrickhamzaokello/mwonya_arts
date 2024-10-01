import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
type Artist = {
  id: string
  name: string
  image: string;
}

export async function GET() {
    // get mediauploads and order by desc
  try {
    const artists = await db.artist.findMany({
      select: {
        id: true,
        name: true,
        profileImage: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

   
    return  NextResponse.json(artists);
  } catch (error) {
    return error
  }
}
