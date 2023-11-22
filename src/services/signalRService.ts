// signalRService.ts
import * as signalR from '@microsoft/signalr';
import mockSignalRConnection from '../utils/mockSignalRService';

// URL for the SignalR hub
const ip = '62.90.222.249:10001';
const hubUrl = `http://${ip}/ClientHub`;

let connection: any; // Variable to hold the SignalR connection instance

// Types for callback functions when connection succeeds or closes
type OnConnectionSuccess = () => void;
type OnConnectionClosed = () => void;

// Function to start the SignalR connection
const startConnection = (
    token: string,
    onConnectionSuccess: OnConnectionSuccess,
    onConnectionClosed: OnConnectionClosed
): void => {

    const isMock = false;
    if (isMock) {
        connection = mockSignalRConnection; // Use the mock SignalR connection
    } else {
        connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
                accessTokenFactory: () => token // Provide the access token
            })
            .withAutomaticReconnect() // Enable automatic reconnection
            .build();
    }
    // connection.start({ transport: ['webSockets','longPolling'] });



    connection.start()
        .then(() => {
            console.log('SignalR connection established');
        })
        .catch((error: any) => {
            console.error('Error starting SignalR connection:', error);
        });

    // Handling the closure of the connection
    connection.onclose = () => {
        console.log('SignalR connection closed');
        onConnectionClosed(); // Notify that the connection is closed
    };

    onConnectionSuccess(); // Notify that the connection is successful
};

// Function to add a listener for receiving data
const addDataReceivedListener = (callback: (data: any) => void): void => {
    connection?.on('DataReceived', (data: any) => {
        try {
            callback(data); // Pass received data to the provided callback
        } catch (error) {
            console.error('Error processing received data:', error);
        }
    });

};


export { startConnection, addDataReceivedListener, connection };
