import axios from 'axios';

const KEY = 'AIzaSyCYqxjmsajCxP58gDFZfnL6rVLKuBB-p2E';
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        type: 'video',
        maxResults: 50,
        key: KEY
    }
});