import axios from 'axios';

const URL = 'http://localhost:3080/api/v1';

export const getData = axios.create({ baseURL: URL, timeout: 10000 });
