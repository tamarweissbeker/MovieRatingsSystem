// types.tsx

export interface Credentials {
    username: string,
    password: string
}

export interface MovieData {
    id: number,
    description: string
}

export interface VoteData {
    generatedTime: Date,
    itemId: number,
    itemCount: number
}

export interface FullMovieData {
    id: number;
    description: string;
    sumVotes: number;
    lastUpdatedTime: string;
    status?: 'up' | 'down' | 'same'
}