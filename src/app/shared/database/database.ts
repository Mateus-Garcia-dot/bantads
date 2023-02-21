import axios from 'axios';

const db = axios.create({
  baseURL: 'http://localhost:3333',
});

export default db;
