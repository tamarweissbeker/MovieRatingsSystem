// api.tsx
import axios, { AxiosResponse } from 'axios';
import { Credentials } from '../utils/Types';
import MockData from '../utils/moviesMockRes.json';

// Base URL for API endpoints
const ip = '62.90.222.249:10001'
const BASE_URL = `http://${ip}/api/admin`;
const isMock = false;

/**
 * Function to perform user login
 * @param credentials - User login credentials
 * @returns A Promise resolving to a string representing the authentication token
 */
export async function login(credentials: Credentials): Promise<{ token: string }> {
    const loginPath = `${BASE_URL}/login`;

    try {
        if (isMock) {
            return { token: 'token' } ; // Return a mock token for testing
        }

        const response: AxiosResponse<{ token: string }> = await axios.post(loginPath, { ...credentials });
        return response.data; // Return the received authentication token
    } catch (error: any) {
        throw new Error(`Login failed: ${error.message}`);
    }
}

/**
 * Function to fetch movies data using an authentication token
 * @param token - Authentication token for authorization
 * @returns A Promise resolving to an array of movie data
 */
export async function getMovies(token: string): Promise<any[]> {
    const getMoviesPath = `${BASE_URL}/getMovies`;

    try {
        if (isMock) {
            return MockData; // Return mock movie data for testing
        }

        const response: AxiosResponse<any[]> = await axios.get(getMoviesPath, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        return response.data; // Return the received movies data
    } catch (error: any) {
        throw new Error(`Failed to get movies: ${error.message}`);
    }
}
