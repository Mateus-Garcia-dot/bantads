import axios from 'axios';

const db = axios.create({
  baseURL: 'http://gateway:3000'
});

export default db;
