import { Objective } from "../schemas/objective";


export const getAllBySection = async (id: string) => {
    const result: Objective[] = await fetch("http://localhost:3000/v1/objectives?sectionId=" + id)
        .then((res) => res.json());
    console.log(id);
    return result;
}

export const create = async (objective: Objective) => {
    await fetch("http://localhost:3000/v1/objectives", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objective),
    }).then((res) => res.json());
}

export const remove = async (id: String) => {
    await fetch(`http://localhost:3000/v1/objectives/${id}`, {
        method: "DELETE",
    }).then((res) => res.json());
}