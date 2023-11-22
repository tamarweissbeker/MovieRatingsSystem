// Movies.ts
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';

import SearchField from './SearchField';
import MovieGraphModal from './MovieGraphModal';
import MoviesGrid from './MoviesGrid';
import {useVotesContext} from '../contexts/VotesContext';
import {FullMovieData} from '../utils/Types';

interface MoviesProps {
    movies: { id: number; description: string }[];
}

/**
 * Component to display movies data, filter, sort, and render movie information in a grid
 * @param {MoviesProps} movies - Array of movie objects with id and description
 * @returns JSX element containing search field, movies grid, and movie graph modal
 */
const Movies: React.FC<MoviesProps> = ({movies}) => {
    const {votes} = useVotesContext();
    const [fullData, setFullData] = useState<FullMovieData[] | []>([]);
    const [searchedData, setSearchedData] = useState<FullMovieData[] | []>();
    const [sortBy, setSortBy] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sumVotes, setSumVotes] = useState<{ [key: string]: number }>({});
    const [lastGeneratedTimes, setLastGeneratedTimes] = useState<{ [key: string]: Date }>({});
    const [prevPositions, setPrevPositions] = useState<{ [key: string]: number }>({});
    const [statuses, setStatuses] = useState<{ [key: string]: 'up' | 'down' | 'same' }>({});
    const [openGraphModal, setOpenGraphModal] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

    // Effect to compute and update movie data based on votes and other state changes
    useEffect(() => {
        const sumByMovieId: { [key: string]: number } = {};
        const updatedLastGeneratedTimes: { [key: string]: Date } = {};
        const currentCounts: { [key: string]: number } = {};
        const moviePosition: { [key: string]: number } = {};
        const status: { [key: string]: 'up' | 'down' | 'same' } = {};

        votes.forEach((item) => {
            const movieId = item.itemId?.toString();
            sumByMovieId[movieId] = (sumByMovieId[movieId] || 0) + item.itemCount;
            currentCounts[movieId] = (currentCounts[movieId] || 0) + item.itemCount;
            if (!updatedLastGeneratedTimes[movieId] || item.generatedTime > updatedLastGeneratedTimes[movieId]) {
                updatedLastGeneratedTimes[movieId] = item.generatedTime;
            }
        });

        const sortedMovies = Object.keys(currentCounts)?.sort((a, b) => currentCounts[b] - currentCounts[a]);

        sortedMovies.forEach((movieId, index) => {
            moviePosition[movieId] = index + 1; // Position starts from 1
        });

        Object.keys(currentCounts).forEach((movieId) => {
            const prevPosition = prevPositions[movieId] || 0;
            const currentPosition = moviePosition[movieId];

            if (currentPosition < prevPosition) {
                status[movieId] = 'up';
            } else if (currentPosition > prevPosition) {
                status[movieId] = 'down';
            } else {
                status[movieId] = 'same';
            }
        });

        setSumVotes(sumByMovieId);
        setLastGeneratedTimes(updatedLastGeneratedTimes);
        setPrevPositions(moviePosition);
        setStatuses(status);
    }, [votes]);

    // Function to update searched data based on movies and votes changes
    const updateSearchedData = () => {
        const finalData = movies.map((movie) => {
            const movieId = movie.id?.toString();
            const lastUpdatedTime = lastGeneratedTimes[movieId];
            const formattingLastUpdatedTime = moment(lastUpdatedTime).format('MM/DD/YYYY HH:mm:ss');
            return {
                id: movie.id,
                description: movie.description,
                sumVotes: sumVotes[movieId] ? sumVotes[movieId] : 0,
                lastUpdatedTime: formattingLastUpdatedTime,
                status: statuses[movieId],
            };
        });
        setFullData(finalData);
        setSearchedData(finalData);
    };

    // Effect to update searched data when movies or votes change
    useEffect(updateSearchedData, [movies, votes]);

    const handleRequestSort = (property: string) => {
        const isAsc = sortBy === property && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortBy(property);
    };

    // Sorting of searched data based on sort order and property
    const sortedData = (searchedData as FullMovieData[])?.sort((a, b) => {
        const isAsc = sortOrder === 'asc';
        if (isAsc) {
            return (a[sortBy as keyof FullMovieData] as string) < (b[sortBy as keyof FullMovieData] as string) ? -1 : 1;
        } else {
            return (b[sortBy as keyof FullMovieData] as string) < (a[sortBy as keyof FullMovieData] as string) ? -1 : 1;
        }
    });

    // Function to handle selection of a movie to open graph modal
    const handleSelectedMovie = (selectedMovieId: number) => {
        setOpenGraphModal(true);
        setSelectedMovieId(selectedMovieId);
    };

    return (
        <Box p={3}>
            <Box display={'flex'} justifyContent={'flex-end'} pb={'8px'}>
                <SearchField setSearchedData={setSearchedData} data={fullData}/>
            </Box>
            <MoviesGrid
                movies={sortedData}
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleSelectedMovie={handleSelectedMovie}
                handleRequestSort={handleRequestSort}
            />
            <MovieGraphModal
                openModal={openGraphModal}
                setOpenModal={setOpenGraphModal}
                selectedMovieId={selectedMovieId || 0}
            />
        </Box>
    );
};

export default Movies;

