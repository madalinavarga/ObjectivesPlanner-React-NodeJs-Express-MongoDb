import { z } from "zod";

const sectionSchema = z.object({
    _id: z.string(),
    name: z.string().min(4),
    objectives: z.array(z.string())
});

export type Section = z.infer<typeof sectionSchema>;
