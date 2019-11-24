import axios from 'axios';

export const client = axios.create({
  // baseURL: 'https://api.imgur.com/3/',
  baseURL: '/api-imgur/3/',
  headers: {
    Authorization: 'Client-ID '.process.env.imgurClientId,
  },
  responseType: 'json',
  maxRedirects: 0,
});

export default client;
