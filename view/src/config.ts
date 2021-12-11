export var SERVER_URL = 'https://live-poll-app-server.herokuapp.com'
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        SERVER_URL = 'http://localhost:5000'
} else {
    // production code
}
export const Min_Percentage_of_FontSize = 75;
export const primary_color = '#9C19E0';
export const secondary_color = '#670FF7';
