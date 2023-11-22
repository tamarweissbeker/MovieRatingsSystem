import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SvgIcon from "@mui/material/SvgIcon";
import CloseIcon from '@mui/icons-material/Close';
import MovieVotesGraph from "./MovieGraph";

// Props definition for MovieGraphModal component
interface MovieGraphModalProps {
    openModal: boolean; // State indicating whether the modal is open or closed
    setOpenModal: (arg: boolean) => void; // Function to set the state of modal open/close
    selectedMovieId: number; // ID of the selected movie for which the graph is displayed
}

/**
 * Component to display a modal containing a graph representing votes over time for a selected movie
 * @param {MovieGraphModalProps} openModal - State indicating whether the modal is open or closed
 * @param {MovieGraphModalProps} setOpenModal - Function to set the state of modal open/close
 * @param {MovieGraphModalProps} selectedMovieId - ID of the selected movie for which the graph is displayed
 * @returns JSX element containing a modal displaying the graph representing votes over time for the selected movie
 */
const MovieGraphModal: React.FC<MovieGraphModalProps> = ({ openModal, setOpenModal, selectedMovieId }) => {
    return (
        <div>
            <Dialog
                onClose={() => setOpenModal(false)} // Close the modal when clicking outside or pressing Esc key
                aria-labelledby="customized-dialog-title"
                open={openModal} // Control whether the modal is open or closed
                fullWidth
                maxWidth={'md'}
            >
                <>
                    <DialogTitle display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography>Movie Graph Modal</Typography>
                        <IconButton
                            sx={{padding: 0}}
                            aria-label="close"
                            onClick={() => setOpenModal(false)} // Close the modal when the close icon is clicked
                        >
                            <SvgIcon component={CloseIcon} viewBox="0 0 24 24"/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <MovieVotesGraph selectedMovieId={selectedMovieId} /> {/* Render the graph component */}
                    </DialogContent>
                </>
            </Dialog>
        </div>
    );
};

export default MovieGraphModal;
