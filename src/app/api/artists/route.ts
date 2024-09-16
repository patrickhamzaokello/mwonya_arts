import { NextResponse } from 'next/server';

type Artist = {
  id: string
  name: string
  image: string;
}

export async function GET() {
    // get mediauploads and order by desc
  try {
    const artists: Artist[] = [
      { id: "1", name: "Taylor Swift", image: "https://assets.mwonya.com/RawFiles/DTR.jpg" },
      { id: "2", name: "Ed Sheeran", image: "https://assets.mwonya.com/RawFiles/DTR.jpg"},
      { id: "3", name: "Beyoncé" ,image: "https://assets.mwonya.com/RawFiles/DTR.jpg"},
      { id: "4", name: "Drillz the Rapper" ,image: "https://assets.mwonya.com/RawFiles/DTR.jpg"},
      { id: "5", name: "Adele" ,image: "https://assets.mwonya.com/RawFiles/DTR.jpg" },
      { id: "6", name: "We are the one Party like Weeknd", image: "https://assets.mwonya.com/RawFiles/DTR.jpg"},
      { id: "7", name: "Ariana Grande", image: "https://assets.mwonya.com/RawFiles/DTR.jpg" },
      { id: "8", name: "Billie Eilish", image: "https://assets.mwonya.com/RawFiles/DTR.jpg" },
      { id: "9", name: "Post Malone" ,image: "https://assets.mwonya.com/RawFiles/DTR.jpg"},
      { id: "10", name: "Dua Lipa" ,image: "https://assets.mwonya.com/RawFiles/DTR.jpg"}
    ]
  
   
    return  NextResponse.json(artists);
  } catch (error) {
    console.error('Error fetching media uploads:', error);
    return error
  }
}
