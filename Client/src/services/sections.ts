import { Section } from "../schemas/section";

export const getAll = async () => {
    const result: Section[] = await fetch("http://localhost:3000/v1/sections")
                         .then((res) => res.json());
    return result;
}