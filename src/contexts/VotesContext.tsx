import React, { ReactNode, createContext, useContext, useState } from 'react';
import { VoteData } from '../utils/Types';

// Type definition for the VotesContext properties
interface VotesContextProps {
    votes: VoteData[] | [];
    setVotes: React.Dispatch<React.SetStateAction<VoteData[] | []>>;
}

// Context initialization with default values
export const VotesContext = createContext<VotesContextProps>({
    votes: [],
    setVotes: () => {},
});

/**
 * Custom hook to access the VotesContext values
 * @returns The context values for votes and setVotes
 */
export const useVotesContext = () => useContext(VotesContext);

/**
 * Component to provide the VotesContext values to its children
 * @param children - ReactNode children components
 * @returns A JSX element wrapping the children with the VotesContext.Provider
 */
export const VotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // State to manage the votes data
    const [votes, setVotes] = useState<VoteData[] | []>([]);

    return (
        <VotesContext.Provider value={{ votes, setVotes }}>
            {children}
        </VotesContext.Provider>
    );
};
