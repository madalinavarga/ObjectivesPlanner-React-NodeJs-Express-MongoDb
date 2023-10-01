import { LoginSchema, RegisterSchema } from "../schemas/auth";

export const login = async (data: LoginSchema) => {
    try {
        const result = await fetch("http://localhost:3000/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
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

export const refreshToken = async (token: string) => {
    const headers = {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`
    }
    return await fetch("http://localhost:3000/v1/auth/refresh", {
        method: "POST",
        headers,
        credentials: 'include',
    }).then((res) => res.json());
}