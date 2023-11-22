import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { useVotesContext } from '../contexts/VotesContext';
import {
    Chart as ChartJS,
    registerables,
    TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    ...registerables,
    TimeScale,
);

// Props definition for MovieVotesGraph component
interface MovieVotesGraphProps {
    selectedMovieId: number;
}

/**
 * Component to display a line graph representing the votes over time for a selected movie
 * @param {MovieVotesGraphProps} selectedMovieId - ID of the movie for which the votes are displayed
 * @returns JSX element with a line graph representing the votes over time for the selected movie
 */
const MovieVotesGraph: React.FC<MovieVotesGraphProps> = ({ selectedMovieId }) => {
    const { votes } = useVotesContext();
    const votesForMovie = votes.filter((vote) => vote.itemId === selectedMovieId);
    const lastVotes = votesForMovie.slice(-20); // Take the last 20 items

    const data = {
        labels: lastVotes.map((vote) => moment(vote.generatedTime).format('MM/DD/YYYY HH:mm:ss')), // Format generatedTime as needed
        datasets: [
            {
                label: `Votes for Movie ${selectedMovieId}`,
                data: lastVotes.map((vote) => vote.itemCount),
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: '#1d691d',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            }
        },
    };

    return <Line options={options} data={data}/>;
};

export default MovieVotesGraph;
