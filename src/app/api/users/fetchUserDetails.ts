import { UserType } from "@/types/userType";

const API_URL = process.env.apiUrl;
const API_TOKEN = process.env.apiToken;

type FetchUserDetailsOptions = {
    userId: UserType["id"];
}
export async function fetchUserDetails ({ userId }: FetchUserDetailsOptions): Promise<UserType | undefined> {

    const res = await fetch(`${API_URL}/users/${userId}`, {
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`
        }
    });
    if (!res.ok) {
        return undefined;
    }
    return res.json()

}