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