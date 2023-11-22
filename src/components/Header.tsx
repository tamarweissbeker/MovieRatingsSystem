import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledHeaderWrapper, StyledHeaderTypography } from './styles';

// Props definition for Header component
interface HeaderProps {
    isServerConnected: boolean;
    lastReceivedVotesTime: string;
}

/**
 * Component to display header information including server connection status and last update time
 * @param {HeaderProps} props - server connection status and last received votes time
 * @returns JSX element with header information
 */
const Header: React.FC<HeaderProps> = ({ isServerConnected, lastReceivedVotesTime }) => {
    return (
        <StyledHeaderWrapper>
            {/* Displaying the title of the Movies Rating System */}
            <Typography variant="h4" color={'#1d691d'}>
                Movies Rating System
            </Typography>
            <Box>
                <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                    {/* Displaying server connection status */}
                    <StyledHeaderTypography connected={isServerConnected} />
                    <Typography>
                        Server {isServerConnected ? `is`: `isn't` } connected
                    </Typography>
                </Box>
                {/* Displaying the last updated time for received votes */}
                <Typography>
                    Last Updated Time: {lastReceivedVotesTime}
                </Typography>
            </Box>
        </StyledHeaderWrapper>
    );
};

export default Header;
