import { Objective } from "../schemas/objective";


export const getAllBySection = async (id: string) => {
    const result: Objective[] = await fetch("http://localhost:3000/v1/objectives?sectionId=" + id)
        .then((res) => res.json());
    console.log(id);
    return result;
}