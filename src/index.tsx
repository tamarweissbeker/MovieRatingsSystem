// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {StyledEngineProvider} from '@mui/material/styles';

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {VotesProvider} from './contexts/VotesContext';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <VotesProvider>
        <React.StrictMode>
            <StyledEngineProvider>
                <App/>
            </StyledEngineProvider>
        </React.StrictMode>
    </VotesProvider>
);

reportWebVitals();