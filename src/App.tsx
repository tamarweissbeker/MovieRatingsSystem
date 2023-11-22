import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import Header from './components/Header';
import Movies from "./components/Movies";
import { login as apiLogin, getMovies as apiGetMovies } from './services/Api';
import { startConnection, addDataReceivedListener } from './services/signalRService';
import { useVotesContext } from './contexts/VotesContext';
import SvgIcon from "@mui/material/SvgIcon";
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const App: React.FC = () => {
  // Get the setVotes function from context
  const {setVotes} = useVotesContext();

  // State variables for movies, token, server connection status, and last received votes time
  const [movies, setMovies] = useState<any[]>([]);
  const [token, setToken] = useState<string>('');
  const [isServerConnected, setIsServerConnected] = useState<boolean>(false);
  const [lastReceivedVotesTime, setLastReceivedVotesTime] = useState<string>('');

  // Callback to handle received data and update votes
  const handleDataReceived = useCallback((data: any) => {
    console.log('Received data from SignalR:', data);
    // Update the last received votes time and add new votes to the existing votes
    const receivedTime = moment(new Date()).format('MM/DD/YYYY HH:mm:ss');
    setLastReceivedVotesTime(receivedTime);
    setVotes(prevVotes => [...prevVotes, ...data]);
  }, []);

  // Effect to perform login on component mount
  useEffect(() => {
    const login = async () => {
      try {
        const credentials = { username: 'test', password: 'test123' };
        const res = await apiLogin(credentials);
        setToken(res.token);

        startConnection(
            res.token,
            () => setIsServerConnected(true),
            () => setIsServerConnected(false)
        );
      } catch (error) {
        console.error('Login failed', (error as Error).message);
      }
    };

    login();
  }, []);

  // Effect to fetch movie data after obtaining the token
  useEffect(() => {
    const getMovieData = async () => {
      try {
        if (token) {
          const movieData: any[] = await apiGetMovies(token);
          setMovies(movieData);
        }
      } catch (error: any) {
        console.error('Failed to get movies', error.message);
      }
    };

    if (token) {
      getMovieData();
    }
  }, [token]);

  // Effect to add data received listener and clean up on component unmount
  useEffect(() => {
    addDataReceivedListener(handleDataReceived);
  }, [handleDataReceived, token]);

  // Return the components and a link to source code on GitHub
  return (
      <div>
        <Header isServerConnected={isServerConnected} lastReceivedVotesTime={lastReceivedVotesTime}/>
        <Movies movies={movies}/>
        {/* Link to the source code on GitHub */}
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Link
              href="https://github.com/tamarweissbeker/MoviesRatingSystem"
              underline="hover"
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              color={'#000000'}
          >
            <Typography pr={'4px'}>Source Code</Typography>
            <SvgIcon component={GitHubIcon}/>
          </Link>
        </Box>
      </div>
  );
};

export default App;
