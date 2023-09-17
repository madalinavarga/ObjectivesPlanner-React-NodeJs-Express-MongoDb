import { CreateSection, Section } from "../schemas/section";

export const getAll = async (filters: { name?: string }) => {
    const queryFilters = new URLSearchParams(filters).toString();
    const result: Section[] = await fetch("http://localhost:3000/v1/sections?" + queryFilters)
        .then((res) => res.json());
    return result;
}

export const create = async (section: CreateSection) => {
    await fetch("http://localhost:3000/v1/sections", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(section),
    }).then((res) => res.json());
}

export const remove = async (id: String) => {
    await fetch(`http://localhost:3000/v1/sections/${id}`, {
        method: "DELETE",
    }).then((res) => res.json());
}

export const update = async (section: CreateSection) => {
    await fetch(`http://localhost:3000/v1/sections/${section._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(section),
    }).then((res) => res.json());
}