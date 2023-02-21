import axios from 'axios';

const db = axios.create({
  baseURL: 'http://' + process.env['URL']
});

export default db;
