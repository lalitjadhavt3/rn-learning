import axios from 'axios';
const ENV = process.env.ENV;
const API_BASE_URL =
 ENV == 'PROD' ? 'https://lalitjadhav.in/lms' : 'http://192.168.1.4/nexus'; // Replace with your API base URL

const api = axios.create({
 baseURL: API_BASE_URL,
});

export default api;
