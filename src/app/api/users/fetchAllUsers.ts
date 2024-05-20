import { UserType } from "@/types/userType";

const API_URL = process.env.apiUrl;
const API_TOKEN = process.env.apiToken;

type FetchAllUsersOptions = {
    current_page?: number;
    page_size?: number;
    search_param?: string;
    search_status?: string;
    search_gender?: string;
}

const searchParameters = ['name', 'email'];
export async function fetchAllUsers ({ 
    current_page = 1, 
    page_size = 25, 
    search_param,
    search_status = 'all',
    search_gender = 'all'
}: FetchAllUsersOptions): Promise<UserType[]> {

    let url = `${API_URL}/users?page=${current_page}&per_page=${page_size}`;

    if(!!search_param && search_param.length > 0) {
        searchParameters.forEach((value, key) => {
            url += `&${value}=${search_param}`
        });
    }
    if(!!search_status && search_status !== 'all') {
        url += `&status=${search_status}`;
    }
    if(!!search_gender && search_gender !== 'all') {
        url += `&gender=${search_gender}`;
    }
    console.log(url);
    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`
        }
    });

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json()

}