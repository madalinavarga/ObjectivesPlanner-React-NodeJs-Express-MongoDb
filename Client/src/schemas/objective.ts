import { z } from "zod";

const objectiveSchema = z.object({
    _id: z.string(),
    name: z.string().min(4),
    description: z.string().min(10),
    position: z.object({
        x: z.number(),
        y: z.number()
    }),
    status: z.enum([""]),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    links: z.array(z.string())
});

export type Objective = z.infer<typeof objectiveSchema>;
