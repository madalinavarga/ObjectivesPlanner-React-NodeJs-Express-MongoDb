import { LoginSchema, RegisterSchema } from "../schemas/auth";

export const login = async (data: LoginSchema) => {
    const result = await fetch("http://localhost:3000/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return result;
}

export const registerAccount = async (data: RegisterSchema) => {
    await fetch("http://localhost:3000/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then((res) => res.json());
}