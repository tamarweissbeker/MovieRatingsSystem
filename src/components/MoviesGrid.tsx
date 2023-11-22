// MoviesGrid.ts
import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import {FullMovieData} from '../utils/Types';
import {TableHeadCell, TableBodyCell} from './styles';

// Props definition for MoviesGrid component
interface MoviesGridProps {
    movies: FullMovieData[];
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    handleRequestSort: (arg: string) => void,
    handleSelectedMovie: (arg: number) => void
}
/**
 * Component to display movies data in a table grid with sorting capabilities
 * @param {MoviesGridProps} props - movies data, sort options, and callback functions
 * @returns JSX element with a table displaying movies data
 */
const MoviesGrid: React.FC<MoviesGridProps> = (props) => {

    const {movies, sortBy, sortOrder, handleRequestSort, handleSelectedMovie} = props;

    // Function to render status icon based on the provided status string
    const renderUpdateStatusIcon = (status?: string) => {
        switch (status) {
            case 'up':
                return <KeyboardDoubleArrowUpIcon/>;
            case 'down':
                return <KeyboardDoubleArrowDownIcon/>;
            case 'same':
                return <HorizontalRuleIcon/>;
            default:
                return '';
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {/* Table headers with sorting labels and onClick handlers */}
                        <TableHeadCell>
                            <TableSortLabel
                                active={sortBy === 'id'}
                                direction={sortBy === 'id' ? sortOrder : 'asc'}
                                onClick={() => handleRequestSort('id')}
                            >
                                Id
                            </TableSortLabel>
                        </TableHeadCell>
                        <TableHeadCell>
                            <TableSortLabel
                                active={sortBy === 'description'}
                                direction={sortBy === 'description' ? sortOrder : 'asc'}
                                onClick={() => handleRequestSort('description')}
                            >
                                Description
                            </TableSortLabel>
                        </TableHeadCell>
                        <TableHeadCell>
                            <TableSortLabel
                                active={sortBy === 'sumVotes'}
                                direction={sortBy === 'sumVotes' ? sortOrder : 'asc'}
                                onClick={() => handleRequestSort('sumVotes')}
                            >
                                Total votes
                            </TableSortLabel>
                        </TableHeadCell>
                        <TableHeadCell>
                            <TableSortLabel
                                active={sortBy === 'lastUpdatedTime'}
                                direction={sortBy === 'lastUpdatedTime' ? sortOrder : 'asc'}
                                onClick={() => handleRequestSort('lastUpdatedTime')}
                            >
                                Last updated time
                            </TableSortLabel>
                        </TableHeadCell>
                        <TableHeadCell>
                            <TableSortLabel
                                active={sortBy === 'status'}
                                direction={sortBy === 'status' ? sortOrder : 'asc'}
                                onClick={() => handleRequestSort('status')}
                            >
                                Status
                            </TableSortLabel>
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Mapping through movies data to display rows in the table */}
                    {movies?.map((row) => (
                        row && (
                            <TableRow key={row.id} onClick={() => handleSelectedMovie(row.id as number)}>
                                <TableBodyCell>{row.id}</TableBodyCell>
                                <TableBodyCell>{row.description}</TableBodyCell>
                                <TableBodyCell>{row.sumVotes}</TableBodyCell>
                                <TableBodyCell>{row.lastUpdatedTime}</TableBodyCell>
                                <TableBodyCell>{renderUpdateStatusIcon(row.status?.toString())}</TableBodyCell>
                            </TableRow>
                        )
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MoviesGrid;
