import React, { useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { FullMovieData } from "../utils/Types";

// Props definition for SearchField component
interface SearchProps {
    setSearchedData: (arg: FullMovieData[]) => void;
    data: FullMovieData[];
}

/**
 * Component to handle search functionality in a TextField
 * @param {SearchProps} props - setSearchedData function and data array to search
 * @returns JSX element with TextField containing search functionality
 */
const SearchField: React.FC<SearchProps> = (props) => {
    const { setSearchedData, data } = props;
    const [searchText, setSearchText] = useState<string>('');

    const handleSearch = (text: string) => {
        setSearchText(text);
        const lowerCaseText = text.toLowerCase();

        const newData = data.filter((item: { [key: string]: any }) =>
            Object.values(item).some(value => {
                return value?.toString().toLowerCase().includes(text);
            })
        );
        setSearchedData(newData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value);
    };

    const handleClear = () => {
        handleSearch('');
    };

    const renderEndAdornment = () => {
        return searchText !== '' ? (
            <IconButton data-testid="cancel-icon" onClick={handleClear}>
                <HighlightOffRoundedIcon />
            </IconButton>
        ) : null;
    };

    return (
        <TextField
            variant="outlined"
            placeholder="Search for..."
            value={searchText}
            onChange={handleInputChange}
            InputProps={{
                startAdornment: (
                    <IconButton>
                        <SearchRoundedIcon />
                    </IconButton>
                ),
                endAdornment: renderEndAdornment(),
            }}
        />
    );
};

export default SearchField;
