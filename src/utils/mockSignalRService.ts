// mockSignalRService.ts

// Array to hold data received listeners
const listeners: ((data: any) => void)[] = [];

// Mock SignalR Connection object
const mockSignalRConnection = {
    // Simulate starting the connection
    start: () => {
        // Simulate connection updates at regular intervals
        setInterval(() => {
            // Simulated data for movie votes with generated time, movie ID, and count
            const simulatedData = [
                { generatedTime: new Date().toISOString(), movieId: 1, count: Math.floor(Math.random() * 100) },
                { generatedTime: new Date().toISOString(), movieId: 2, count: Math.floor(Math.random() * 100) },
                { generatedTime: new Date().toISOString(), movieId: 3, count: Math.floor(Math.random() * 100) },
                { generatedTime: new Date().toISOString(), movieId: 4, count: Math.floor(Math.random() * 100) },
            ];
            // Notify all data listeners with simulated data
            listeners.forEach(listener => listener(simulatedData));
        }, 60000); // Simulate updates every 1 minute
    },

    // Simulate invoking an event
    invoke: (eventName: string, data: any) => {
        // For simplicity, ignoring the event name in this example
        // Notify all data listeners with provided data
        listeners.forEach(listener => listener(data));
    },

    // Simulate adding a data received listener
    on: (eventName: string, callback: (data: any) => void) => {
        // Add the provided callback to the listeners array
        listeners.push(callback);
    },

    // Simulate stopping the connection
    stop: () => {
        console.log('SignalR connection stopped');
    },
};

export default mockSignalRConnection;
