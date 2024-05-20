import { UserPostType } from "@/types/userPostType";
import { UserType } from "@/types/userType";

const API_URL = process.env.apiUrl;
const API_TOKEN = process.env.apiToken;

type CreateNewUserOptions = {
    name: UserType['name'];
    email: UserType['email'];
    gender: UserType['gender'];
    status: UserType['status'];
}
export async function createNewUser (user: CreateNewUserOptions) {

    const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json()
}