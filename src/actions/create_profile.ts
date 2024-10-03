"use server"
import * as z from "zod";
import { CreateArtistSchema, CreateRecordLableSchema } from "../schemas";
import { CreateArtistProfile, getArtistProfileByName } from "@/data_layer/artist";
import { CreateNewRecordLabel, getLabelByName } from "@/data_layer/recordlabel";
import { auth } from '@/auth';

export const transformZodErrors = (error: z.ZodError) => {
    return error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
    }));
};
export const registerArtist = async (formData: FormData) => {
    try {

        //validate the FormData
        const validatedFields = CreateArtistSchema.parse({
            name: formData.get("name"),
            biography: formData.get("biography"),
            isIndependent: formData.get("isIndependent") === "true" ? true : false,
            profileImage: formData.get("profileImage"),
            coverImage: formData.get("coverImage"),
            labelId: formData.get("labelId")
        });

        console.log({ validatedFields });

        const { name, biography, isIndependent, profileImage, coverImage, labelId } = validatedFields;
        console.log(name);
        // confirm name is not taken
        const exisitingName = await getArtistProfileByName(name)

        // display text if email is taken
        if (exisitingName) {
            return { error: "Name already taken 😞" }
        }

        try {
            const createArtist = await CreateArtistProfile(name, biography, isIndependent, "profileImage", "coverImage", labelId);

            if (createArtist) {
                return { error: "Success" }
            } else {
                return { error: "FAilure" }

            }

        } catch (error) {
            return {
                error: `Error creating artist profile: ${error}`,
            };
        }




        // send validated data to database here


    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                error: transformZodErrors(error),
            };
        }

        return {
            error: "An unexpected error occurred. Could not create shelf.",
        };
    }
};

export const registerNewRecordLable = async (formData: FormData) => {
    const session = await auth();
    if (!session) {
        return { error: "This Action Requires You to login" }
    }

    try {

        //validate the FormData
        const validatedFields = CreateRecordLableSchema.parse({
            name: formData.get("name"),
            contactEmail: formData.get("contactEmail") || "",
            contactPhone: formData.get("contactPhone") || "",
            website: formData.get("website") || "",
            address: formData.get("address") || "",
            city: formData.get("city") || "",
            state: formData.get("state") || "",
            country: formData.get("country") || ""
        });

        console.log({ validatedFields });

        const { name, contactEmail, contactPhone, website, address, city, state, country } = validatedFields;

        console.log(name);
        // confirm name is not taken
        const exisitingName = await getLabelByName(name)

        // display text if recordlabelname is taken
        if (exisitingName) {
            return { error: "Name already taken 😞" }
        }

        const createRecordLabel = await CreateNewRecordLabel(session?.user.id,name, contactEmail, contactPhone, website, address, city, state, country);
 

        const { recordLabelName, recordLabelID } = createRecordLabel.success

        return {
            success: `Record Label ${recordLabelName} Created Successfully`,
        };


    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                error: transformZodErrors(error),
            };
        }

        return {
            error: "An unexpected error occurred. Could not create shelf.",
        };
    }
};