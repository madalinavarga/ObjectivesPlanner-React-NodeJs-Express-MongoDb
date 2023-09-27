import { RootContext } from "../providers/rootContext";
import { useContext } from "react";
import { Objective } from "../schemas/objective";

export function useObjectives() {

    const rootContext = useContext(RootContext)
    const headers = {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${rootContext?.token}`
    }


    const getAllBySection = async (id: string) => {
        const result: Objective[] = await fetch("http://localhost:3000/v1/objectives?sectionId=" + id, { headers })
            .then((res) => res.json());
        return result;
    }

    const getById = async (id: string) => {
        const result: Objective = await fetch("http://localhost:3000/v1/objectives/" + id, { headers })
            .then((res) => res.json());
        return result;
    }

    const create = async (objective: Objective) => {
        await fetch("http://localhost:3000/v1/objectives", {
            method: "POST",
            headers,
            body: JSON.stringify(objective),
        }).then((res) => res.json());
    }

    const remove = async (id: String) => {
        await fetch(`http://localhost:3000/v1/objectives/${id}`, {
            method: "DELETE",
            headers
        }).then((res) => res.json());
    }

    return {
        getAllBySection,
        getById,
        create,
        remove
    }

}
