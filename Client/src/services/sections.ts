import { RootContext } from "../providers/rootContext";
import { CreateSection, Section } from "../schemas/section";

import { useContext } from "react";

function useSections() {
    const rootContext = useContext(RootContext)
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rootContext?.token}`
    }

    const getAll = async (filters: { name?: string, page?: string }) => {
        const queryFilters = new URLSearchParams(filters).toString();
        const result: Section[] = await fetch("http://localhost:3000/v1/sections?" + queryFilters, { headers })
            .then((res) => res.json());
        return result;
    }

    const create = async (section: CreateSection) => {
        await fetch("http://localhost:3000/v1/sections", {
            method: "POST",
            headers,
            body: JSON.stringify(section),
        }).then((res) => res.json());
    }

    const remove = async (id: String) => {
        await fetch(`http://localhost:3000/v1/sections/${id}`, {
            method: "DELETE",
            headers
        }).then((res) => res.json());
    }

    const update = async (section: CreateSection) => {
        await fetch(`http://localhost:3000/v1/sections/${section._id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(section),
        }).then((res) => res.json());
    }

    return {
        getAll,
        update,
        create,
        remove
    }

}

export default useSections;