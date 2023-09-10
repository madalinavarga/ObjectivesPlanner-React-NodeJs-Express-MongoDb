import { z } from "zod";

const sectionSchema = z.object({
    _id: z.string(),
    name: z.string().min(4)
});

const createSectionSchema = z.object({
    _id: z.string().optional(),
    name: z.string().min(4)
});


export type Section = z.infer<typeof sectionSchema>;
export type CreateSection = z.infer<typeof createSectionSchema>;
