import { db } from "@/lib/db";

// get artist for the label
export const getArtistsForaLabelbyLabelID = async (recordlableID: string) => {
    try {
        const artists = await db.artist.findMany({
            where: { labelId: recordlableID } 
        });

        return artists;
    } catch {
        return null;
    }
}

// return artist profile where userId is matching
export const getArtistProfileByUserId = async (userId: string) => {
    try {
        const artistProfile = await db.artist.findUnique({
            where: { userId: userId }
        });

        return artistProfile;
    } catch {
        return null;
    }
}



