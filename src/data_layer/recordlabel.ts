import { db } from "@/lib/db";

// check if artist name exists
export const getLabelByName = async (label_name: string) => {
    try {
        const recordLabel = await db.recordLabel.findFirst({
            where: { name: label_name }
        });

        return recordLabel;
    } catch {
        return null;
    }
}

// create new artist
export const CreateNewRecordLabel = async (userId: string, name: string, contactEmail: string, contactPhone: string, website: string, address: string, city: string, state: string, country: string) => {
    const recordLabel = await db.recordLabel.create({
        data: {
            name,
            contactEmail,
            contactPhone,
            website,
            address,
            city,
            state,
            country
        }
    });

    await db.user.update({
        where: { id: userId },
        data: { recordLabelId: recordLabel.id }
    });
    

    return { success: { recordLabelName: recordLabel.name, recordLabelID: recordLabel.id } };
}
